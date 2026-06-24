import { NextResponse } from "next/server";
import { artists } from "@/data/artists";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const artist = artists.find((a) => a.id === id);

  if (!artist) {
    return NextResponse.json({ error: "Artist not found" }, { status: 404 });
  }

  const relatedArtists = artists
    .filter((a) => a.id !== id && a.categories.some((c) => artist.categories.includes(c)))
    .slice(0, 3);

  return NextResponse.json({ artist, relatedArtists });
}
