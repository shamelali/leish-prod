import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, type } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
  }
  if (!email.includes("@")) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  return NextResponse.json({
    user: {
      id: `${type || "client"}-${Date.now()}`,
      name,
      email,
      type: type || "client",
      createdAt: new Date().toISOString(),
    },
    token: `mock-jwt-${Date.now()}`,
  }, { status: 201 });
}
