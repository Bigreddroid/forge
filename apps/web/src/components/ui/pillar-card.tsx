import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type PillarStatus = "active" | "partial" | "pending";

interface PillarCardProps {
  title: string;
  description: string;
  status: PillarStatus;
  metric?: string;
  metricLabel?: string;
  icon: LucideIcon;
  href?: string;
}

const statusConfig: Record<PillarStatus, { label: string; class: string; dot: string }> = {
  active: { label: "Active", class: "badge-green", dot: "bg-emerald-400" },
  partial: { label: "Partial", class: "badge-orange", dot: "bg-orange-400" },
  pending: { label: "Not set up", class: "badge-zinc", dot: "bg-zinc-600" },
};

export function PillarCard({
  title,
  description,
  status,
  metric,
  metricLabel,
  icon: Icon,
}: PillarCardProps) {
  const s = statusConfig[status];
  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-800 rounded-lg">
            <Icon className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
          </div>
        </div>
        <span className={s.class}>{s.label}</span>
      </div>

      {metric && (
        <div className="border-t border-zinc-800 pt-3">
          <p className="text-xl font-bold text-white">{metric}</p>
          <p className="text-xs text-zinc-500 mt-0.5">{metricLabel}</p>
        </div>
      )}

      <div className="flex items-center gap-1.5">
        <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse-slow", s.dot)} />
        <span className="text-xs text-zinc-500">{s.label}</span>
      </div>
    </div>
  );
}
