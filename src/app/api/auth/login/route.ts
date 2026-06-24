import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  // Mock: accept any valid-looking email + password >= 6 chars
  if (!email.includes("@") || password.length < 6) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: `user-${Date.now()}`,
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()),
      email,
      phone: "+60 12-345 6789",
      avatar: null,
      createdAt: new Date().toISOString(),
    },
    token: `mock-jwt-${Date.now()}`,
  });
}
