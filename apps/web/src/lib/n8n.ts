const N8N_HOST = process.env.N8N_HOST ?? "http://localhost:5678";

export interface ContentBrief {
  topic: string;
  angle: string;
  keyInsight: string;
  cta?: string;
  tone?: string;
  length?: "short" | "medium" | "long";
  context?: string;
}

export interface TweetPayload {
  type: "tweet" | "thread" | "brief";
  text?: string;
  tweets?: string[];
  brief?: Partial<ContentBrief>;
}

export async function triggerContentWorkflow(brief: ContentBrief) {
  const res = await fetch(`${N8N_HOST}/webhook/forge-linkedin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic: brief.topic,
      angle: brief.angle,
      key_insight: brief.keyInsight,
      cta: brief.cta,
      tone: brief.tone ?? "direct",
      length: brief.length ?? "medium",
      context: brief.context,
    }),
  });
  if (!res.ok) throw new Error(`n8n webhook error: ${res.status}`);
  return res.json();
}

export async function triggerTwitterWorkflow(payload: TweetPayload) {
  const res = await fetch(`${N8N_HOST}/webhook/forge-twitter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`n8n twitter webhook error: ${res.status}`);
  return res.json();
}

export async function triggerLaunchSequence(params: {
  launchName: string;
  githubUrl: string;
  keyFeature: string;
  honestLimitation: string;
  questionForHn: string;
}) {
  const res = await fetch(`${N8N_HOST}/webhook/forge-launch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      launch_name: params.launchName,
      github_url: params.githubUrl,
      key_feature: params.keyFeature,
      honest_limitation: params.honestLimitation,
      question_for_hn: params.questionForHn,
    }),
  });
  if (!res.ok) throw new Error(`Launch sequence error: ${res.status}`);
  return res.json();
}
