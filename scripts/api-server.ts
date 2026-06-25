import { config } from 'dotenv';
import { existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer, IncomingMessage, ServerResponse } from 'http';

const _dirname = dirname(fileURLToPath(import.meta.url));

config({ path: join(_dirname, '..', '.env') });
if (existsSync(join(_dirname, '..', '.env.local'))) {
  config({ path: join(_dirname, '..', '.env.local') });
}

const API_DIR = join(_dirname, '..', 'api');
const PORT = parseInt(process.env.API_PORT || '3001');

interface Route {
  pattern: RegExp;
  paramNames: string[];
  filePath: string;
}

function walkRoutes(dir: string, basePath: string = ''): Route[] {
  const routes: Route[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      routes.push(...walkRoutes(fullPath, `${basePath}/${entry.name}`));
    } else if (entry.name.endsWith('.ts')) {
      let segment = entry.name.replace('.ts', '');
      const paramNames: string[] = [];
      const regexStr = segment.replace(/\[(\w+)\]/g, (_, name: string) => {
        paramNames.push(name);
        return '([^/]+)';
      });
      routes.push({
        pattern: new RegExp(`^${basePath}/${regexStr}$`),
        paramNames,
        filePath: fullPath,
      });
    }
  }

  return routes;
}

const routes = walkRoutes(API_DIR, '/api');

async function toWebRequest(req: IncomingMessage): Promise<Request> {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) {
      headers.set(key, Array.isArray(value) ? value.join(', ') : value);
    }
  }
  const body = req.method !== 'GET' && req.method !== 'HEAD'
    ? await new Promise<Buffer>((resolve) => {
        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
      })
    : undefined;
  return new Request(url.toString(), {
    method: req.method,
    headers,
    body: body || undefined,
  });
}

function writeResponse(res: ServerResponse, webResp: Response): void {
  res.writeHead(webResp.status, Object.fromEntries(webResp.headers));
  webResp.text().then((body) => res.end(body));
}

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

    for (const route of routes) {
      const match = url.pathname.match(route.pattern);
      if (match) {
        const mod = await import(route.filePath);
        const handler = mod.default || mod.handler;
        if (typeof handler !== 'function') {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Handler not found' }));
          return;
        }
        const request = await toWebRequest(req);
        const response = await handler(request);
        writeResponse(res, response);
        return;
      }
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'API route not found', path: url.pathname }));
  } catch (err) {
    console.error(`Error handling ${req.url}:`, err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
});

server.listen(PORT, () => {
  console.log(`  API server → http://localhost:${PORT}`);
  console.log(`  Routes (${routes.length}):`);
  routes.forEach((r) => {
    const label = r.paramNames.length
      ? `${r.pattern} → :${r.paramNames.join('/:')}`
      : r.pattern;
    console.log(`    ${label}`);
  });
});
