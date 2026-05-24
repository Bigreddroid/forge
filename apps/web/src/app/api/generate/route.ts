import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const lengthWords = { short: "~150 words", medium: "~250 words", long: "~400 words" };

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 400 });
  }

  const body = await req.json();
  const { topic, angle, keyInsight, cta, tone = "direct", length = "medium", context, platform = "linkedin" } = body;

  if (!topic || !angle || !keyInsight) {
    return NextResponse.json({ error: "topic, angle, and keyInsight are required" }, { status: 400 });
  }

  const wordCount = lengthWords[length as keyof typeof lengthWords] ?? "~250 words";

  const systemPrompt = platform === "linkedin"
    ? `You are a ghostwriter for an ambitious founder. Write LinkedIn posts that are direct, peer-to-peer, and insight-led.

RULES:
- Lead with the insight or a provocative one-liner. Never start with "I".
- Short paragraphs. 1-2 sentences max each. Use line breaks generously.
- No bullet points, no headers, no hashtags in the body.
- End with 3-5 relevant hashtags on a new line.
- Tone: ${tone}. Never corporate. Never "leverage" or "synergy".
- Length: ${wordCount}.
- If a CTA is provided, close with it naturally. Don't force it.

Return ONLY the post text. No preamble, no explanation.`
    : `You are writing a tweet for an ambitious founder. Be punchy and direct. Max 280 characters. Return ONLY the tweet text.`;

  const userPrompt = `Topic: ${topic}
Angle: ${angle}
Key insight: ${keyInsight}${cta ? `\nCTA: ${cta}` : ""}${context ? `\nContext/stories/stats: ${context}` : ""}`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: userPrompt }],
      system: systemPrompt,
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ post: text });
  } catch (e) {
    console.error("Claude generate error:", e);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
