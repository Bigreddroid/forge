import { NextResponse } from "next/server";
import { getWorkflows, getExecutions } from "@/lib/clients/n8n";

const MOCK_WORKFLOWS = [
  { id: "1", name: "LinkedIn Autopilot", description: "Generates and schedules LinkedIn posts from content briefs", webhook: "/webhook/forge-linkedin", active: true, lastRun: "2h ago", runCount: 47, category: "Content" },
  { id: "2", name: "Prospect Finder", description: "Daily Apollo ICP search — scores leads and adds to HubSpot", webhook: "/webhook/forge-prospects", active: true, lastRun: "8h ago", runCount: 23, category: "Leads" },
  { id: "3", name: "Email Nurture", description: "5-email welcome sequence triggered on lead magnet download", webhook: "/webhook/forge-nurture", active: true, lastRun: "1d ago", runCount: 12, category: "Nurture" },
  { id: "4", name: "Competitor Monitor", description: "Daily Claude analysis of competitor content — digest to inbox", webhook: "/webhook/forge-intel", active: true, lastRun: "7h ago", runCount: 18, category: "Intelligence" },
  { id: "5", name: "Twitter Autopilot", description: "Posts tweets and threads via webhook", webhook: "/webhook/forge-twitter", active: true, lastRun: "3h ago", runCount: 9, category: "Content" },
  { id: "6", name: "Launch Sequence", description: "Multi-channel launch: generates HN + Twitter + Reddit + newsletter", webhook: "/webhook/forge-launch", active: false, lastRun: "Never", runCount: 0, category: "Marketing" },
];

function relativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function categoryFromName(name: string) {
  const n = name.toLowerCase();
  if (n.includes("linkedin") || n.includes("content") || n.includes("twitter")) return "Content";
  if (n.includes("prospect") || n.includes("lead")) return "Leads";
  if (n.includes("nurture") || n.includes("email")) return "Nurture";
  if (n.includes("competitor") || n.includes("intel")) return "Intelligence";
  if (n.includes("launch")) return "Marketing";
  return "Workflow";
}

export async function GET() {
  if (!process.env.N8N_API_KEY) {
    return NextResponse.json({ workflows: MOCK_WORKFLOWS, source: "mock" });
  }

  try {
    const [workflows, executions] = await Promise.all([getWorkflows(), getExecutions(50)]);

    const countByWorkflow = executions.reduce<Record<string, number>>((acc, e) => {
      acc[e.workflowId] = (acc[e.workflowId] ?? 0) + 1;
      return acc;
    }, {});

    const lastRunByWorkflow = executions.reduce<Record<string, string>>((acc, e) => {
      if (!acc[e.workflowId] || e.startedAt > acc[e.workflowId]) {
        acc[e.workflowId] = e.startedAt;
      }
      return acc;
    }, {});

    const result = workflows.map((wf) => ({
      id: wf.id,
      name: wf.name,
      description: wf.tags.map((t) => t.name).join(", ") || wf.name,
      webhook: `/webhook/${wf.name.toLowerCase().replace(/\s+/g, "-")}`,
      active: wf.active,
      lastRun: lastRunByWorkflow[wf.id] ? relativeTime(lastRunByWorkflow[wf.id]) : "Never",
      runCount: countByWorkflow[wf.id] ?? 0,
      category: categoryFromName(wf.name),
    }));

    return NextResponse.json({ workflows: result, source: "n8n" });
  } catch (e) {
    console.error("n8n error:", e);
    return NextResponse.json({ workflows: MOCK_WORKFLOWS, source: "mock" });
  }
}
