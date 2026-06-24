import { NextResponse } from "next/server";
import { studios } from "@/data/artists";

export async function GET() {
  return NextResponse.json({ studios });
}
