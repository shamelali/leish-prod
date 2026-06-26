import { neon } from '@neondatabase/serverless';
import { sendEmail } from '../email/brevo';
import { notificationEmailTemplate } from '../email/templates';

export interface Notification {
  id: number;
  userId: string;
  type: 'booking' | 'payment' | 'review' | 'message' | 'system';
  title: string;
  body: string;
  data: Record<string, unknown> | null;
  readAt: string | null;
  createdAt: string;
}

export const notificationService = {
  getSql() {
    return neon(process.env.DATABASE_URL!) as any;
  },

  async list(userId: string, limit = 20, offset = 0): Promise<Notification[]> {
    const sql = this.getSql();
    const data = await sql.query(
      `SELECT * FROM notifications
       WHERE "userId" = $1
       ORDER BY "createdAt" DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );
    return data || [];
  },

  async getUnreadCount(userId: string): Promise<number> {
    const sql = this.getSql();
    const [row] = await sql.query(
      `SELECT COUNT(*) as count FROM notifications
       WHERE "userId" = $1 AND "readAt" IS NULL`,
      [userId]
    );
    return Number(row?.count) || 0;
  },

  async markAsRead(id: number, userId: string): Promise<void> {
    const sql = this.getSql();
    await sql.query(
      `UPDATE notifications SET "readAt" = NOW()
       WHERE id = $1 AND "userId" = $2`,
      [id, userId]
    );
  },

  async markAllAsRead(userId: string): Promise<void> {
    const sql = this.getSql();
    await sql.query(
      `UPDATE notifications SET "readAt" = NOW()
       WHERE "userId" = $1 AND "readAt" IS NULL`,
      [userId]
    );
  },

  async create(input: Omit<Notification, 'id' | 'readAt' | 'createdAt'>): Promise<Notification> {
    const sql = this.getSql();
    const [notification] = await sql.query(
      `INSERT INTO notifications ("userId", type, title, body, data)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [input.userId, input.type, input.title, input.body, input.data ? JSON.stringify(input.data) : null]
    );

    // Fire-and-forget email notification via Brevo
    (async () => {
      try {
        const [profile] = await sql.query(
          `SELECT email, name FROM "user" WHERE id = $1`,
          [input.userId]
        );
        if (profile?.email) {
          const template = notificationEmailTemplate({
            name: profile.name || 'Valued Customer',
            title: notification.title,
            body: notification.body || '',
            type: notification.type,
          });
          await sendEmail({
            to: profile.email,
            subject: template.subject,
            html: template.html,
            text: template.text,
          });
        }
      } catch {
        // Silently ignore email failures
      }
    })();

    return notification;
  },

  async delete(id: number, userId: string): Promise<void> {
    const sql = this.getSql();
    await sql.query(
      `DELETE FROM notifications WHERE id = $1 AND "userId" = $2`,
      [id, userId]
    );
  },
};
