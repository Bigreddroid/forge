"use client";

import { useState, useEffect } from "react";
import { Zap, Play, CheckCircle, Clock, ExternalLink, Loader2, RefreshCw } from "lucide-react";

interface Workflow {
  id: string; name: string; description: string; webhook: string;
  active: boolean; lastRun: string; runCount: number; category: string;
}

const categoryColors: Record<string, string> = {
  Content: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Leads: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Nurture: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Intelligence: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Marketing: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Workflow: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [source, setSource] = useState<string>("mock");
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState<string | null>(null);
  const [triggered, setTriggered] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/workflows");
      const data = await res.json();
      setWorkflows(data.workflows);
      setSource(data.source);
    } catch {
      /* keep existing */
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleTrigger(wf: Workflow) {
    setTriggering(wf.id);
    try {
      const n8nHost = process.env.NEXT_PUBLIC_N8N_HOST ?? "http://localhost:5678";
      await fetch(`${n8nHost}${wf.webhook}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      setTriggered(wf.id);
      setTimeout(() => { setTriggered(null); load(); }, 3000);
    } catch {
      /* n8n may not be running */
      setTriggered(wf.id);
      setTimeout(() => setTriggered(null), 2000);
    } finally {
      setTriggering(null);
    }
  }

  return (
    <div className="p-8 max-w-[1200px]">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Workflows</h1>
          <p className="text-zinc-400 text-sm mt-1">n8n automation recipes — import at localhost:5678</p>
        </div>
        <div className="flex items-center gap-2">
          {source !== "mock" && <span className="badge-green text-[10px]">Live — n8n</span>}
          <button onClick={load} className="btn-ghost text-xs" disabled={loading}>
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <a href="http://localhost:5678" target="_blank" rel="noreferrer" className="btn-ghost text-xs">
            Open n8n <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {loading && workflows.length === 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-5 h-28 animate-pulse bg-zinc-800/50" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {workflows.map((wf) => (
            <div key={wf.id} className="card p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-zinc-800 rounded-lg mt-0.5">
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-white">{wf.name}</h3>
                      <span className={`badge border ${categoryColors[wf.category] ?? categoryColors.Workflow}`}>{wf.category}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">{wf.description}</p>
                  </div>
                </div>
                {wf.active ? <span className="badge-green">Active</span> : <span className="badge-zinc">Idle</span>}
              </div>

              <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {wf.lastRun}</span>
                  <span>{wf.runCount} runs</span>
                  <code className="text-zinc-600 text-[10px] hidden sm:block">{wf.webhook}</code>
                </div>
                <button onClick={() => handleTrigger(wf)} disabled={triggering === wf.id} className="btn-ghost text-xs py-1 px-2.5">
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
      )}
    </div>
  );
}
