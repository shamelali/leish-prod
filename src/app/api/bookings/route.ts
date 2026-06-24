import { NextResponse } from "next/server";

// In-memory bookings store (mock)
const bookings: Record<string, unknown[]> = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ bookings: [] });
  return NextResponse.json({ bookings: bookings[userId] || [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, booking } = body;
  if (!userId || !booking) {
    return NextResponse.json({ error: "Missing userId or booking" }, { status: 400 });
  }
  if (!bookings[userId]) bookings[userId] = [];
  bookings[userId].push(booking);
  return NextResponse.json({ success: true, booking }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const bookingId = searchParams.get("bookingId");
  if (!userId || !bookingId) {
    return NextResponse.json({ error: "Missing userId or bookingId" }, { status: 400 });
  }
  if (bookings[userId]) {
    bookings[userId] = bookings[userId].filter((b) => (b as Record<string, unknown>).id !== bookingId);
  }
  return NextResponse.json({ success: true });
}
