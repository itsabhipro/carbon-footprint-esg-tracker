"use client";

import { countries, globalTotals, totalEmissions, esgScore, monthLabels } from "@/lib/data";
import StatCard from "./StatCard";
import { Leaf, Factory, Zap, Globe2, TrendingDown } from "lucide-react";
import { formatTons, formatNumber, cn } from "@/lib/utils";

export default function Dashboard() {
  const t = globalTotals();
  const globalMonthly = monthLabels.map((_, i) =>
    countries.reduce((s, c) => s + c.monthly[i], 0)
  );
  const maxGlobal = Math.max(...globalMonthly);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Multi-country carbon footprint & ESG overview · FY 2025–26
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Emissions"
          value={`${formatTons(t.total)} tCO₂e`}
          subtitle="Scope 1 + 2 + 3"
          icon={Leaf}
          color="bg-eco-600"
          trend={`${t.avgYoy.toFixed(1)}% YoY avg`}
          trendPositive={t.avgYoy < 0}
        />
        <StatCard title="Scope 1" value={`${formatTons(t.scope1)} tCO₂e`} subtitle="Direct emissions" icon={Factory} color="bg-orange-500" />
        <StatCard title="Scope 2" value={`${formatTons(t.scope2)} tCO₂e`} subtitle="Purchased energy" icon={Zap} color="bg-amber-500" />
        <StatCard title="Avg ESG Score" value={formatNumber(t.avgEsg, 0)} subtitle="Across 6 countries" icon={Globe2} color="bg-blue-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Emissions trend (12 months)</h2>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <TrendingDown size={12} className="text-emerald-500" /> Group total
            </span>
          </div>
          <div className="flex items-end gap-1.5 h-40">
            {globalMonthly.map((v, i) => (
              <div key={monthLabels[i]} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-eco-500/80 hover:bg-eco-600 transition-colors min-h-[4px]"
                  style={{ height: `${(v / maxGlobal) * 100}%` }}
                  title={`${formatTons(v)} tCO₂e`}
                />
                <span className="text-[10px] text-slate-400">{monthLabels[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Scope mix</h2>
          <div className="space-y-4">
            {[
              { label: "Scope 1", value: t.scope1, color: "bg-orange-500" },
              { label: "Scope 2", value: t.scope2, color: "bg-amber-500" },
              { label: "Scope 3", value: t.scope3, color: "bg-slate-400" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">{s.label}</span>
                  <span className="font-medium">{formatTons(s.value)} · {((s.value / t.total) * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", s.color)} style={{ width: `${(s.value / t.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-slate-900 mb-3">Countries at a glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {countries.map((c) => {
            const total = totalEmissions(c);
            const score = esgScore(c);
            return (
              <div key={c.code} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.flag}</span>
                    <div>
                      <p className="font-semibold text-slate-900">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.region}</p>
                    </div>
                  </div>
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", c.yoyChangePct < 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700")}>
                    {c.yoyChangePct > 0 ? "+" : ""}{c.yoyChangePct}%
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-slate-400">Emissions</p>
                    <p className="font-medium">{formatTons(total)} tCO₂e</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">ESG score</p>
                    <p className="font-medium">{score}/100</p>
                  </div>
                </div>
                <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-eco-500 rounded-full" style={{ width: `${score}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
