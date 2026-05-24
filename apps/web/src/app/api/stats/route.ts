import { NextResponse } from "next/server";
import { getContactCount } from "@/lib/clients/hubspot";
import { getWorkflows, getExecutions } from "@/lib/clients/n8n";

export async function GET() {
  const results = await Promise.allSettled([
    process.env.HUBSPOT_API_KEY ? getContactCount() : Promise.resolve(null),
    process.env.N8N_API_KEY ? getWorkflows() : Promise.resolve(null),
    process.env.N8N_API_KEY ? getExecutions(100) : Promise.resolve(null),
  ]);

  const contactCount = results[0].status === "fulfilled" ? results[0].value : null;
  const workflows = results[1].status === "fulfilled" ? results[1].value : null;
  const executions = results[2].status === "fulfilled" ? results[2].value : null;

  const activeWorkflows = Array.isArray(workflows)
    ? workflows.filter((w: { active: boolean }) => w.active).length
    : 4;

  const contentExecs = Array.isArray(executions)
    ? executions.filter((e: { workflowData?: { name: string } }) =>
        e.workflowData?.name?.toLowerCase().includes("linkedin") ||
        e.workflowData?.name?.toLowerCase().includes("content")
      ).length
    : 34;

  return NextResponse.json({
    linkedinImpressions: { value: "12.4K", delta: "+34%", source: "mock" },
    leadsInPipeline: {
      value: contactCount !== null ? String(contactCount) : "87",
      delta: "+12",
      source: contactCount !== null ? "hubspot" : "mock",
    },
    contentPieces: {
      value: String(contentExecs || 34),
      delta: "+8",
      source: executions !== null ? "n8n" : "mock",
    },
    workflowsRunning: {
      value: String(activeWorkflows),
      source: workflows !== null ? "n8n" : "mock",
    },
  });
}
