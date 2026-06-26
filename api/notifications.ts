import { notificationService } from '../src/lib/services/notifications';
import { enforceRateLimit } from '../src/lib/rate-limit';
import { z } from 'zod';
import { validateBody, validateSearchParams } from '../src/lib/validate';

const listSchema = z.object({
  userId: z.string().min(1),
  limit: z.string().optional(),
  offset: z.string().optional(),
});

const markReadSchema = z.object({
  id: z.number(),
  userId: z.string().min(1),
});

const createSchema = z.object({
  userId: z.string().min(1),
  type: z.enum(['booking', 'payment', 'review', 'message', 'system']),
  title: z.string().min(1),
  body: z.string().optional(),
  data: z.record(z.unknown()).optional(),
});

export default async function handler(req: Request) {
  const url = new URL(req.url);

  try {
    if (req.method === 'GET') {
      const rateCheck = enforceRateLimit(req, 'notifications:list', 60, 60_000);
      if (!rateCheck.ok) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
          status: 429,
          headers: { 'Retry-After': String(rateCheck.retryAfterSec), 'Content-Type': 'application/json' },
        });
      }

      const { data, error } = validateSearchParams(listSchema)(req);
      if (error) return error;

      const notifications = await notificationService.list(
        data!.userId,
        Number(data!.limit) || 20,
        Number(data!.offset) || 0
      );
      const unread = await notificationService.getUnreadCount(data!.userId);

      return new Response(JSON.stringify({ notifications, unread }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'PATCH') {
      const rateCheck = enforceRateLimit(req, 'notifications:update', 30, 60_000);
      if (!rateCheck.ok) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
          status: 429,
          headers: { 'Retry-After': String(rateCheck.retryAfterSec), 'Content-Type': 'application/json' },
        });
      }

      const body = await req.json();
      if (body.markAllAsRead) {
        await notificationService.markAllAsRead(body.userId);
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const { data, error } = await validateBody(markReadSchema)(req);
      if (error) return error;

      await notificationService.markAsRead(data!.id, data!.userId);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'POST') {
      const rateCheck = enforceRateLimit(req, 'notifications:create', 20, 60_000);
      if (!rateCheck.ok) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
          status: 429,
          headers: { 'Retry-After': String(rateCheck.retryAfterSec), 'Content-Type': 'application/json' },
        });
      }

      const { data, error } = await validateBody(createSchema)(req);
      if (error) return error;

      const notification = await notificationService.create({
        userId: data!.userId,
        type: data!.type,
        title: data!.title,
        body: data!.body ?? null,
        data: data!.data ?? null,
      });
      return new Response(JSON.stringify({ notification }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'DELETE') {
      const body = await req.json();
      const { id, userId } = body;
      if (!id || !userId) {
        return new Response(JSON.stringify({ error: 'id and userId required' }), { status: 400 });
      }
      await notificationService.delete(Number(id), userId);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  } catch (err) {
    console.error('Notifications API error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


