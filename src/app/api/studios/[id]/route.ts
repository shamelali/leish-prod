import { NextResponse } from "next/server";
import { studios, artists } from "@/data/artists";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const studio = studios.find((s) => s.id === id);

  if (!studio) {
    return NextResponse.json({ error: "Studio not found" }, { status: 404 });
  }

  const studioArtists = artists.slice(0, studio.artists);
  return NextResponse.json({ studio, artists: studioArtists });
}
