"use client";

import { useState } from "react";
import { Zap, Play, CheckCircle, Clock, ExternalLink, Loader2 } from "lucide-react";

const workflows = [
  {
    id: "linkedin-autopilot",
    name: "LinkedIn Autopilot",
    description: "Generates and schedules LinkedIn posts from content briefs",
    webhook: "/webhook/forge-linkedin",
    status: "active",
    lastRun: "2h ago",
    runCount: 47,
    category: "Content",
  },
  {
    id: "prospect-finder",
    name: "Prospect Finder",
    description: "Daily Apollo ICP search — scores leads and adds to HubSpot",
    webhook: "/webhook/forge-prospects",
    status: "active",
    lastRun: "8h ago",
    runCount: 23,
    category: "Leads",
  },
  {
    id: "email-sequence",
    name: "Email Nurture",
    description: "5-email welcome sequence triggered on lead magnet download",
    webhook: "/webhook/forge-nurture",
    status: "active",
    lastRun: "1d ago",
    runCount: 12,
    category: "Nurture",
  },
  {
    id: "competitor-monitor",
    name: "Competitor Monitor",
    description: "Daily Claude analysis of competitor content — digest to inbox",
    webhook: "/webhook/forge-intel",
    status: "active",
    lastRun: "7h ago",
    runCount: 18,
    category: "Intelligence",
  },
  {
    id: "twitter-autopilot",
    name: "Twitter Autopilot",
    description: "Posts tweets and threads via webhook",
    webhook: "/webhook/forge-twitter",
    status: "active",
    lastRun: "3h ago",
    runCount: 9,
    category: "Content",
  },
  {
    id: "launch-sequence",
    name: "Launch Sequence",
    description: "Multi-channel launch: generates HN + Twitter + Reddit + newsletter",
    webhook: "/webhook/forge-launch",
    status: "idle",
    lastRun: "Never",
    runCount: 0,
    category: "Marketing",
  },
];

const categoryColors: Record<string, string> = {
  Content: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Leads: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Nurture: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Intelligence: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Marketing: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

export default function WorkflowsPage() {
  const [triggering, setTriggering] = useState<string | null>(null);
  const [triggered, setTriggered] = useState<string | null>(null);

  async function handleTrigger(workflow: (typeof workflows)[0]) {
    setTriggering(workflow.id);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_N8N_HOST ?? "http://localhost:5678"}${workflow.webhook}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }
      );
      setTriggered(workflow.id);
      setTimeout(() => setTriggered(null), 3000);
    } catch {
      // n8n may not be running locally — silently fail in demo
    } finally {
      setTriggering(null);
    }
  }

  return (
    <div className="p-8 max-w-[1200px]">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Workflows</h1>
          <p className="text-zinc-400 text-sm mt-1">
            n8n automation recipes — import at localhost:5678
          </p>
        </div>
        <a
          href="http://localhost:5678"
          target="_blank"
          rel="noreferrer"
          className="btn-ghost text-xs"
        >
          Open n8n <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {workflows.map((wf) => (
          <div key={wf.id} className="card p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-zinc-800 rounded-lg mt-0.5">
                  <Zap className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{wf.name}</h3>
                    <span className={`badge border ${categoryColors[wf.category]}`}>
                      {wf.category}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">{wf.description}</p>
                </div>
              </div>
              {wf.status === "active" ? (
                <span className="badge-green">Active</span>
              ) : (
                <span className="badge-zinc">Idle</span>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {wf.lastRun}
                </span>
                <span>{wf.runCount} runs</span>
                <code className="text-zinc-600 text-[10px]">{wf.webhook}</code>
              </div>
              <button
                onClick={() => handleTrigger(wf)}
                disabled={triggering === wf.id}
                className="btn-ghost text-xs py-1 px-2.5"
              >
                {triggering === wf.id ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : triggered === wf.id ? (
                  <><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Triggered</>
                ) : (
                  <><Play className="w-3.5 h-3.5" /> Run</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
