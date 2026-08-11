import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  color: string;
  trend?: string;
  trendPositive?: boolean;
}

export default function StatCard({ title, value, subtitle, icon: Icon, color, trend, trendPositive }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
          {trend && (
            <p className={cn("mt-1 text-xs font-medium", trendPositive ? "text-emerald-600" : "text-red-500")}>
              {trend}
            </p>
          )}
        </div>
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", color)}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
}
