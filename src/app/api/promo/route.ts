import { NextResponse } from "next/server";

const VALID_CODES: Record<string, { discount: number; label: string; type: "percent" | "fixed" }> = {
  "LEISH10": { discount: 10, label: "10% off your first booking", type: "percent" },
  "WELCOME50": { discount: 50, label: "RM 50 off", type: "fixed" },
  "BEAUTY20": { discount: 20, label: "20% off all bookings", type: "percent" },
  "NEWYEAR": { discount: 15, label: "15% New Year discount", type: "percent" },
  "FIRSTBOOK": { discount: 30, label: "RM 30 off first booking", type: "fixed" },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code")?.toUpperCase();
  if (!code) return NextResponse.json({ error: "Code is required" }, { status: 400 });
  const promo = VALID_CODES[code];
  if (!promo) return NextResponse.json({ valid: false, error: "Invalid promo code" }, { status: 404 });
  return NextResponse.json({ valid: true, ...promo });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { code } = body;
  const promo = VALID_CODES[code?.toUpperCase()];
  if (!promo) return NextResponse.json({ valid: false }, { status: 404 });
  return NextResponse.json({ valid: true, ...promo });
}
