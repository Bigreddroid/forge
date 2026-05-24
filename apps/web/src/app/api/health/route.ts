import { NextResponse } from "next/server";

export async function GET() {
  const n8nHost = process.env.N8N_HOST ?? "http://localhost:5678";
  try {
    const res = await fetch(`${n8nHost}/healthz`, { signal: AbortSignal.timeout(3000) });
    return NextResponse.json({ n8n: res.ok, host: n8nHost });
  } catch {
    return NextResponse.json({ n8n: false, host: n8nHost });
  }
}
