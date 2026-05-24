import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface ContentBrief {
  topic: string;
  angle: string;
  audience?: string;
  keyInsight: string;
  cta?: string;
  tone?: string;
  length?: "short" | "medium" | "long";
  context?: string;
}

export interface ForgeMessage {
  role: "user" | "assistant";
  content: string;
}

export async function generateContent(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const block = message.content[0];
  if (block.type !== "text") throw new Error("Unexpected response type");
  return block.text;
}

export async function generateLinkedInPost(
  voiceSystemPrompt: string,
  brief: ContentBrief
): Promise<string> {
  const userPrompt = `Write a LinkedIn post using this brief:

Topic: ${brief.topic}
Angle: ${brief.angle}
Audience: ${brief.audience ?? "B2B founders"}
Key insight: ${brief.keyInsight}
CTA: ${brief.cta ?? "none"}
Tone: ${brief.tone ?? "direct and confident"}
Length: ${brief.length ?? "medium"} (~250 words)
Context: ${brief.context ?? "none"}`;

  return generateContent(voiceSystemPrompt, userPrompt);
}

export async function generateNewsletter(
  voiceSystemPrompt: string,
  brief: ContentBrief
): Promise<string> {
  const userPrompt = `Write a newsletter issue using this brief:

Subject: ${brief.topic}
Core insight: ${brief.keyInsight}
Angle: ${brief.angle}
Tone: ${brief.tone ?? "conversational"}
Context / supporting points: ${brief.context ?? "none"}`;

  return generateContent(voiceSystemPrompt, userPrompt);
}

export async function analyzeCompetitorContent(
  content: string
): Promise<string> {
  const systemPrompt =
    "You are a market intelligence analyst for B2B founders.";
  const userPrompt = `Analyze this competitor content:

1. POSITIONING SUMMARY (2-3 sentences)
2. CONTENT GAPS they're not covering
3. ONE CONTENT OPPORTUNITY to act on today
4. THREAT LEVEL: Low / Medium / High

Content:
${content}`;

  return generateContent(systemPrompt, userPrompt);
}
