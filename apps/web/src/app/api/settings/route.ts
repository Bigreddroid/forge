import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE = "forge_settings";

export async function GET() {
  const store = await cookies();
  const raw = store.get(COOKIE)?.value;
  try {
    return NextResponse.json(raw ? JSON.parse(raw) : {});
  } catch {
    return NextResponse.json({});
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const store = await cookies();
  store.set(COOKIE, JSON.stringify(body), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
  return NextResponse.json({ ok: true });
}
