import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({
  label,
  value,
  delta,
  deltaPositive = true,
  icon: Icon,
  iconColor = "text-orange-400",
}: StatCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-zinc-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {delta && (
            <p
              className={cn(
                "text-xs mt-1",
                deltaPositive ? "text-emerald-400" : "text-red-400"
              )}
            >
              {deltaPositive ? "+" : ""}{delta} vs last week
            </p>
          )}
        </div>
        <div className="p-2 bg-zinc-800 rounded-lg">
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
      </div>
    </div>
  );
}
