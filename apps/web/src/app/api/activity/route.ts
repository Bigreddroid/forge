import { NextResponse } from "next/server";
import { getExecutions } from "@/lib/clients/n8n";

const MOCK_ACTIVITY = [
  { text: "LinkedIn post scheduled for tomorrow 9am", time: "2m ago", type: "content" },
  { text: "14 new leads scored and added to HubSpot", time: "1h ago", type: "leads" },
  { text: "Competitor digest sent to inbox", time: "7h ago", type: "intel" },
  { text: "Email sequence triggered for 3 new signups", time: "9h ago", type: "nurture" },
  { text: "Prospect finder ran — 25 ICP matches found", time: "1d ago", type: "leads" },
  { text: "Newsletter draft generated from brief", time: "1d ago", type: "content" },
];

function relativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function typeFromName(name = "") {
  const n = name.toLowerCase();
  if (n.includes("linkedin") || n.includes("content") || n.includes("twitter")) return "content";
  if (n.includes("prospect") || n.includes("lead")) return "leads";
  if (n.includes("competitor") || n.includes("intel")) return "intel";
  if (n.includes("nurture") || n.includes("email")) return "nurture";
  return "content";
}

function labelFromExecution(name = "", status: string) {
  const n = name.toLowerCase();
  if (n.includes("linkedin")) return status === "success" ? "LinkedIn post generated and scheduled" : "LinkedIn workflow ran";
  if (n.includes("prospect")) return "Prospect finder ran — new leads scored";
  if (n.includes("competitor")) return "Competitor digest sent to inbox";
  if (n.includes("nurture")) return "Email nurture sequence triggered";
  if (n.includes("twitter")) return "Tweet posted via Twitter autopilot";
  if (n.includes("launch")) return "Launch sequence executed";
  return `${name} ran`;
}

export async function GET() {
  if (!process.env.N8N_API_KEY) {
    return NextResponse.json({ activity: MOCK_ACTIVITY, source: "mock" });
  }

  try {
    const executions = await getExecutions(20);
    const activity = executions
      .filter((e) => e.status === "success")
      .slice(0, 10)
      .map((e) => ({
        text: labelFromExecution(e.workflowData?.name, e.status),
        time: relativeTime(e.startedAt),
        type: typeFromName(e.workflowData?.name),
      }));

    return NextResponse.json({
      activity: activity.length > 0 ? activity : MOCK_ACTIVITY,
      source: "n8n",
    });
  } catch (e) {
    console.error("n8n activity error:", e);
    return NextResponse.json({ activity: MOCK_ACTIVITY, source: "mock" });
  }
}
