"use client";

import { countries, totalEmissions, esgScore } from "@/lib/data";
import { formatTons, cn } from "@/lib/utils";

export default function CountriesView() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Countries</h1>
        <p className="text-sm text-slate-500 mt-1">Detailed carbon & ESG metrics by operating country</p>
      </div>

      <div className="space-y-4">
        {countries.map((c) => {
          const total = totalEmissions(c);
          const score = esgScore(c);
          return (
            <div key={c.code} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{c.flag}</span>
                  <div>
                    <h2 className="font-semibold text-lg text-slate-900">{c.name}</h2>
                    <p className="text-sm text-slate-500">{c.region} · {c.employees.toLocaleString()} employees</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", c.yoyChangePct < 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700")}>
                    YoY {c.yoyChangePct > 0 ? "+" : ""}{c.yoyChangePct}%
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">Target −{c.targetReductionPct}%</span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-slate-400">Total emissions</p>
                  <p className="text-lg font-bold text-slate-900">{formatTons(total)} tCO₂e</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Scope 1</p>
                  <p className="font-semibold text-orange-600">{formatTons(c.scope1)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Scope 2</p>
                  <p className="font-semibold text-amber-600">{formatTons(c.scope2)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Scope 3</p>
                  <p className="font-semibold text-slate-600">{formatTons(c.scope3)}</p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs text-slate-400 mb-2">ESG pillars</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Environmental", value: c.esg.environmental, color: "bg-eco-500" },
                    { label: "Social", value: c.esg.social, color: "bg-blue-500" },
                    { label: "Governance", value: c.esg.governance, color: "bg-violet-500" },
                  ].map((p) => (
                    <div key={p.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">{p.label}</span>
                        <span className="font-medium">{p.value}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", p.color)} style={{ width: `${p.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-sm text-slate-600">Composite ESG: <strong>{score}/100</strong></p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
