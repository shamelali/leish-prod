import { NextResponse } from "next/server";

interface Review {
  id: string;
  artistId: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  service?: string;
  userId?: string;
}

// In-memory reviews store (mock)
const reviews: Review[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artistId = searchParams.get("artistId");
  const filtered = artistId ? reviews.filter((r) => r.artistId === artistId) : reviews;
  return NextResponse.json({ reviews: filtered });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { artistId, author, rating, text, service, userId } = body;
  if (!artistId || !author || !rating || !text) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const review: Review = {
    id: `review-${Date.now()}`,
    artistId,
    author,
    rating,
    text,
    date: new Date().toISOString(),
    service,
    userId,
  };
  reviews.push(review);
  return NextResponse.json({ success: true, review }, { status: 201 });
}
