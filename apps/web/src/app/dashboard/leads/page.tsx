import { Users, TrendingUp, Target, DollarSign } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

interface Lead {
  name: string; title: string; company: string;
  score: number; source: string; status: string; addedDays: number;
}

const statusConfig: Record<string, { class: string }> = {
  SQL: { class: "badge-green" },
  MQL: { class: "badge-orange" },
  Lead: { class: "badge-zinc" },
};

function ScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? "bg-emerald-500" : score >= 50 ? "bg-orange-500" : "bg-zinc-600";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs text-zinc-400 w-6">{score}</span>
    </div>
  );
}

async function getLeads(): Promise<{ leads: Lead[]; source: string }> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/leads`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error("leads failed");
    return res.json();
  } catch {
    return { leads: [], source: "error" };
  }
}

export default async function LeadsPage() {
  const { leads, source } = await getLeads();
  const sqlCount = leads.filter((l) => l.status === "SQL").length;
  const mqlCount = leads.filter((l) => l.status === "MQL").length;
  const estPipeline = sqlCount * 15000 + mqlCount * 5000;

  return (
    <div className="p-8 max-w-[1200px]">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-zinc-400 text-sm mt-1">ICP-scored prospects from Apollo, LinkedIn, and content</p>
        </div>
        {source !== "mock" && (
          <span className="badge-green text-[10px]">Live — HubSpot</span>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Leads" value={leads.length.toString()} delta="+12" deltaPositive icon={Users} />
        <StatCard label="SQL (Ready)" value={sqlCount.toString()} icon={Target} iconColor="text-emerald-400" />
        <StatCard label="MQL (Nurture)" value={mqlCount.toString()} icon={TrendingUp} iconColor="text-orange-400" />
        <StatCard
          label="Est. Pipeline"
          value={estPipeline >= 1000 ? `$${Math.round(estPipeline / 1000)}K` : `$${estPipeline}`}
          delta="+$12K" deltaPositive
          icon={DollarSign} iconColor="text-yellow-400"
        />
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-300">Pipeline</h2>
          <span className="text-xs text-zinc-500">{leads.length} leads</span>
        </div>
        {leads.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-zinc-500 text-sm">No leads yet.</p>
            <p className="text-zinc-600 text-xs mt-1">
              Add <code className="text-zinc-500">HUBSPOT_API_KEY</code> to .env or run the Prospect Finder workflow.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  {["Name", "Company", "Score", "Source", "Status", "Added"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {leads.map((lead, i) => (
                  <tr key={i} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-white">{lead.name}</p>
                      <p className="text-xs text-zinc-500">{lead.title}</p>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-zinc-300">{lead.company}</td>
                    <td className="px-5 py-3.5"><ScoreBar score={lead.score} /></td>
                    <td className="px-5 py-3.5"><span className="badge-zinc">{lead.source}</span></td>
                    <td className="px-5 py-3.5">
                      <span className={(statusConfig[lead.status] ?? statusConfig.Lead).class}>{lead.status}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-zinc-500">
                      {lead.addedDays === 0 ? "Today" : lead.addedDays === 1 ? "Yesterday" : `${lead.addedDays}d ago`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
