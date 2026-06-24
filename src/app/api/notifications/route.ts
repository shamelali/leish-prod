import { NextResponse } from "next/server";

interface Notification {
  id: string;
  userId: string;
  type: "booking_confirmed" | "booking_cancelled" | "booking_reminder" | "review_request" | "new_artist" | "welcome";
  title: string;
  message: string;
  read: boolean;
  date: string;
  link?: string;
}

// In-memory notifications store (mock)
const notifications: Notification[] = [
  {
    id: "notif-1",
    userId: "demo",
    type: "welcome",
    title: "Welcome to Leish! 🎉",
    message: "Discover amazing makeup artists and book your first appointment today.",
    read: false,
    date: new Date().toISOString(),
    link: "/artists",
  },
  {
    id: "notif-2",
    userId: "demo",
    type: "new_artist",
    title: "New artist near you!",
    message: "Aiko Nakamura just joined Leish! Check out her stunning portfolio.",
    read: false,
    date: new Date(Date.now() - 86400000).toISOString(),
    link: "/artists/aiko-nakamura",
  },
  {
    id: "notif-3",
    userId: "demo",
    type: "booking_reminder",
    title: "Upcoming booking tomorrow",
    message: "Your appointment with Mei Lin is tomorrow at 10:00 AM. Don't forget!",
    read: true,
    date: new Date(Date.now() - 172800000).toISOString(),
    link: "/profile",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "demo";
  const userNotifs = notifications.filter((n) => n.userId === userId);
  const unread = userNotifs.filter((n) => !n.read).length;
  return NextResponse.json({ notifications: userNotifs, unread });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { notificationId } = body;
  const notif = notifications.find((n) => n.id === notificationId);
  if (notif) notif.read = true;
  return NextResponse.json({ success: true });
}

export async function POST(request: Request) {
  const body = await request.json();
  const notif: Notification = {
    id: `notif-${Date.now()}`,
    userId: body.userId || "demo",
    type: body.type,
    title: body.title,
    message: body.message,
    read: false,
    date: new Date().toISOString(),
    link: body.link,
  };
  notifications.unshift(notif);
  return NextResponse.json({ success: true, notification: notif }, { status: 201 });
}
