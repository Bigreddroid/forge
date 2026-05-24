import { StatCard } from "@/components/ui/stat-card";
import { PillarCard } from "@/components/ui/pillar-card";
import {
  Eye, Users, FileText, Zap, DollarSign,
  Flame, Target, BarChart3, Brain, Megaphone, ArrowRight,
} from "lucide-react";
import Link from "next/link";

const pillars = [
  { title: "Authority Engine", description: "Category positioning and thought leadership", status: "partial" as const, metric: "3 pillars", metricLabel: "Content pillars defined", icon: Flame },
  { title: "Content Machine", description: "AI-generated content at scale", status: "active" as const, metric: "Daily", metricLabel: "LinkedIn autopilot running", icon: FileText },
  { title: "Distribution", description: "Omnichannel amplification", status: "partial" as const, metric: "LinkedIn", metricLabel: "1 of 4 channels live", icon: Megaphone },
  { title: "Lead Intelligence", description: "Intent-based prospect pipeline", status: "active" as const, metric: "500/wk", metricLabel: "Prospects being scored", icon: Target },
  { title: "Revenue Acceleration", description: "Pipeline to close automation", status: "pending" as const, icon: DollarSign },
  { title: "Market Intelligence", description: "Competitor monitoring and trends", status: "active" as const, metric: "Daily", metricLabel: "Competitor digest running", icon: Brain },
];

const typeColors: Record<string, string> = {
  content: "bg-blue-500", leads: "bg-emerald-500",
  intel: "bg-purple-500", nurture: "bg-orange-500",
};

async function getStats() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/stats`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("stats failed");
    return res.json();
  } catch {
    return {
      linkedinImpressions: { value: "12.4K", delta: "+34%" },
      leadsInPipeline: { value: "87", delta: "+12" },
      contentPieces: { value: "34", delta: "+8" },
      workflowsRunning: { value: "4" },
    };
  }
}

async function getActivity() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/activity`, { next: { revalidate: 30 } });
    if (!res.ok) throw new Error("activity failed");
    const data = await res.json();
    return data.activity;
  } catch {
    return [
      { text: "LinkedIn post scheduled for tomorrow 9am", time: "2m ago", type: "content" },
      { text: "14 new leads scored and added to HubSpot", time: "1h ago", type: "leads" },
      { text: "Competitor digest sent to inbox", time: "7h ago", type: "intel" },
      { text: "Email sequence triggered for 3 new signups", time: "9h ago", type: "nurture" },
      { text: "Prospect finder ran — 25 ICP matches found", time: "1d ago", type: "leads" },
    ];
  }
}

export default async function DashboardPage() {
  const [stats, activity] = await Promise.all([getStats(), getActivity()]);

  return (
    <div className="p-8 max-w-[1400px]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="text-zinc-400 text-sm mt-1">Your FORGE system — 3 of 6 pillars active</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="LinkedIn Impressions" value={stats.linkedinImpressions.value} delta={stats.linkedinImpressions.delta} deltaPositive icon={Eye} iconColor="text-blue-400" />
        <StatCard label="Leads in Pipeline" value={stats.leadsInPipeline.value} delta={stats.leadsInPipeline.delta} deltaPositive icon={Users} iconColor="text-emerald-400" />
        <StatCard label="Content Pieces" value={stats.contentPieces.value} delta={stats.contentPieces.delta} deltaPositive icon={FileText} iconColor="text-orange-400" />
        <StatCard label="Workflows Running" value={stats.workflowsRunning.value} icon={Zap} iconColor="text-yellow-400" />
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">System Pillars</h2>
          <Link href="/dashboard/workflows" className="text-xs text-zinc-500 hover:text-orange-400 flex items-center gap-1 transition-colors">
            Manage workflows <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {pillars.map((p) => <PillarCard key={p.title} {...p} />)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card p-5">
          <h2 className="text-sm font-semibold text-zinc-300 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {activity.map((a: { text: string; time: string; type: string }, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${typeColors[a.type] ?? "bg-zinc-500"}`} />
                <p className="flex-1 text-sm text-zinc-300 truncate">{a.text}</p>
                <span className="text-xs text-zinc-600 shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-semibold text-zinc-300 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/dashboard/content" className="btn-ghost w-full justify-start text-xs"><FileText className="w-4 h-4" /> New content brief</Link>
            <Link href="/dashboard/leads" className="btn-ghost w-full justify-start text-xs"><Users className="w-4 h-4" /> View pipeline</Link>
            <Link href="/dashboard/workflows" className="btn-ghost w-full justify-start text-xs"><Zap className="w-4 h-4" /> Trigger workflow</Link>
            <Link href="/dashboard/settings" className="btn-ghost w-full justify-start text-xs"><BarChart3 className="w-4 h-4" /> Configure system</Link>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800">
            <p className="text-xs text-zinc-500 mb-1">GitHub Stars</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full w-1/5 bg-orange-500 rounded-full" />
              </div>
              <span className="text-xs text-zinc-400 font-medium">—</span>
            </div>
            <a href="https://github.com/Bigreddroid/forge" target="_blank" rel="noreferrer"
              className="mt-2 text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1">
              Star on GitHub <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
