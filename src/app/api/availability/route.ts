import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/availability";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artistId = searchParams.get("artistId");
  const days = parseInt(searchParams.get("days") || "7");

  if (!artistId) {
    return NextResponse.json({ error: "artistId is required" }, { status: 400 });
  }

  const availability = getAvailability(artistId, new Date(), days);
  return NextResponse.json({ availability });
}
