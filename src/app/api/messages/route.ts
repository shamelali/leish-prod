import { NextResponse } from "next/server";

// In-memory messages store
const messages: Record<string, { id: string; senderId: string; text: string; time: string; read: boolean }[]> = {
  "aiko-nakamura": [
    { id: "m1", senderId: "aiko-nakamura", text: "Hi! Thank you for booking with me 🎉", time: "10:00", read: true },
    { id: "m2", senderId: "client", text: "Hi Aiko! I'm so excited for my appointment.", time: "10:02", read: true },
  ],
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artistId = searchParams.get("artistId");
  if (!artistId) return NextResponse.json({ messages: [] });
  return NextResponse.json({ messages: messages[artistId] || [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { artistId, senderId, text } = body;
  if (!artistId || !text) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  if (!messages[artistId]) messages[artistId] = [];
  const msg = { id: `msg-${Date.now()}`, senderId: senderId || "client", text, time: new Date().toLocaleTimeString("en-MY", { hour: "2-digit", minute: "2-digit" }), read: false };
  messages[artistId].push(msg);
  return NextResponse.json({ success: true, message: msg }, { status: 201 });
}
