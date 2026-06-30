import { config } from "dotenv";
import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";
import { createServer, IncomingMessage, ServerResponse } from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));

config({ path: join(__dirname, "..", ".env") });
if (existsSync(join(__dirname, "..", ".env.local"))) {
  config({ path: join(__dirname, "..", ".env.local") });
}
const API_DIR = join(__dirname, "..", "api");
const DIST_DIR = join(__dirname, "..", "dist");
const PORT = parseInt(process.env.PORT || "4173");

const MIME: Record<string, string> = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

// --- API routing ---

interface Route {
  pattern: RegExp;
  paramNames: string[];
  filePath: string;
}

function walkRoutes(dir: string, basePath: string = ""): Route[] {
  const routes: Route[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      routes.push(...walkRoutes(fullPath, `${basePath}/${entry.name}`));
    } else if (entry.name.endsWith(".ts")) {
      const segment = entry.name.replace(".ts", "");
      const paramNames: string[] = [];
      const regexStr = segment.replace(/\[(\w+)\]/g, (_, name: string) => {
        paramNames.push(name);
        return "([^/]+)";
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

const routes = walkRoutes(API_DIR, "/api");

async function toWebRequest(req: IncomingMessage): Promise<Request> {
  const url = new URL(
    req.url || "/",
    `http://${req.headers.host || "localhost"}`,
  );
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value)
      headers.set(key, Array.isArray(value) ? value.join(", ") : value);
  }
  const body =
    req.method !== "GET" && req.method !== "HEAD"
      ? await new Promise<Buffer>((resolve) => {
          const chunks: Buffer[] = [];
          req.on("data", (chunk: Buffer) => chunks.push(chunk));
          req.on("end", () => resolve(Buffer.concat(chunks)));
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

// --- Static file serving ---

function serveStatic(res: ServerResponse, pathname: string): boolean {
  const filePath = join(DIST_DIR, pathname === "/" ? "index.html" : pathname);

  if (!statSync(filePath, { throwIfNoEntry: false })?.isFile()) return false;

  const ext = extname(filePath);
  const contentType = MIME[ext] || "application/octet-stream";
  const content = readFileSync(filePath);
  res.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control":
      ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
  });
  res.end(content);
  return true;
}

// --- Server ---

const server = createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    const url = new URL(
      req.url || "/",
      `http://${req.headers.host || "localhost"}`,
    );

    // API routes
    if (url.pathname.startsWith("/api/")) {
      for (const route of routes) {
        const match = url.pathname.match(route.pattern);
        if (match) {
          const mod = await import(route.filePath);
          const handler = mod.default || mod.handler;
          if (typeof handler !== "function") {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Handler not found" }));
            return;
          }
          const request = await toWebRequest(req);
          const response = await handler(request);
          writeResponse(res, response);
          return;
        }
      }
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ error: "API route not found", path: url.pathname }),
      );
      return;
    }

    // Static files (with SPA fallback)
    const served = serveStatic(res, url.pathname);
    if (served) return;

    // SPA fallback — serve index.html for all non-file routes
    if (!extname(url.pathname)) {
      const served = serveStatic(res, "/");
      if (served) return;
    }

    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Not Found</h1>");
  } catch (err) {
    console.error(`Error handling ${req.url}:`, err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
});

server.listen(PORT, () => {
  console.log(`  Preview server → http://localhost:${PORT}`);
  console.log(`  Static files    → ${DIST_DIR}`);
  console.log(`  API routes (${routes.length})`);
  routes.forEach((r) => console.log(`    ${r.pattern}`));
});
