import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  // Mock: always return success (don't reveal if email exists)
  return NextResponse.json({
    success: true,
    message: "If an account with that email exists, we've sent a password reset link.",
  });
}
