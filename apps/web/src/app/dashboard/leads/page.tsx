import { Users, TrendingUp, Target, DollarSign } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

const leads = [
  { name: "Alex Chen", title: "Founder", company: "DataStack", score: 92, source: "LinkedIn", status: "SQL", addedDays: 1 },
  { name: "Sarah Mills", title: "CEO", company: "Pulse AI", score: 78, source: "Content", status: "MQL", addedDays: 2 },
  { name: "James Park", title: "Co-Founder", company: "Flowbase", score: 85, source: "Outreach", status: "SQL", addedDays: 3 },
  { name: "Priya Nair", title: "Founder", company: "Kira Health", score: 61, source: "LinkedIn", status: "MQL", addedDays: 4 },
  { name: "Tom Walsh", title: "CEO", company: "Clearops", score: 45, source: "Organic", status: "Lead", addedDays: 5 },
  { name: "Anika Soto", title: "Founder", company: "Vantir", score: 88, source: "Outreach", status: "SQL", addedDays: 6 },
  { name: "Marcus Liu", title: "Co-Founder", company: "Drafter", score: 33, source: "Content", status: "Lead", addedDays: 8 },
  { name: "Elena Novak", title: "CEO", company: "Rove Labs", score: 71, source: "LinkedIn", status: "MQL", addedDays: 9 },
];

const statusConfig: Record<string, { label: string; class: string }> = {
  SQL: { label: "SQL", class: "badge-green" },
  MQL: { label: "MQL", class: "badge-orange" },
  Lead: { label: "Lead", class: "badge-zinc" },
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

export default function LeadsPage() {
  const sqlCount = leads.filter((l) => l.status === "SQL").length;
  const mqlCount = leads.filter((l) => l.status === "MQL").length;

  return (
    <div className="p-8 max-w-[1200px]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Leads</h1>
        <p className="text-zinc-400 text-sm mt-1">
          ICP-scored prospects from Apollo, LinkedIn, and content
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Leads" value={leads.length.toString()} delta="12" deltaPositive icon={Users} />
        <StatCard label="SQL (Ready)" value={sqlCount.toString()} icon={Target} iconColor="text-emerald-400" />
        <StatCard label="MQL (Nurture)" value={mqlCount.toString()} icon={TrendingUp} iconColor="text-orange-400" />
        <StatCard label="Est. Pipeline" value="$87K" delta="$12K" deltaPositive icon={DollarSign} iconColor="text-yellow-400" />
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-300">Pipeline</h2>
          <span className="text-xs text-zinc-500">{leads.length} leads</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                {["Name", "Company", "Score", "Source", "Status", "Added"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {leads.map((lead, i) => (
                <tr key={i} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="text-sm font-medium text-white">{lead.name}</p>
                      <p className="text-xs text-zinc-500">{lead.title}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-zinc-300">{lead.company}</td>
                  <td className="px-5 py-3.5">
                    <ScoreBar score={lead.score} />
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="badge-zinc">{lead.source}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={statusConfig[lead.status].class}>
                      {statusConfig[lead.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-zinc-500">
                    {lead.addedDays === 1 ? "Yesterday" : `${lead.addedDays}d ago`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
