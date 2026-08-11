"use client";

import { countries, totalEmissions, monthLabels } from "@/lib/data";
import { formatTons, cn } from "@/lib/utils";

export default function EmissionsView() {
  const sorted = [...countries].sort((a, b) => totalEmissions(b) - totalEmissions(a));
  const maxTotal = totalEmissions(sorted[0]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Emissions</h1>
        <p className="text-sm text-slate-500 mt-1">Scope breakdown and intensity by country</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
              <th className="pb-3 font-medium">Country</th>
              <th className="pb-3 font-medium">Scope 1</th>
              <th className="pb-3 font-medium">Scope 2</th>
              <th className="pb-3 font-medium">Scope 3</th>
              <th className="pb-3 font-medium">Total</th>
              <th className="pb-3 font-medium">tCO₂e / employee</th>
              <th className="pb-3 font-medium w-40">Share</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => {
              const total = totalEmissions(c);
              const intensity = total / c.employees;
              return (
                <tr key={c.code} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="py-3"><span className="mr-2">{c.flag}</span><span className="font-medium">{c.name}</span></td>
                  <td className="py-3 text-orange-600">{formatTons(c.scope1)}</td>
                  <td className="py-3 text-amber-600">{formatTons(c.scope2)}</td>
                  <td className="py-3 text-slate-600">{formatTons(c.scope3)}</td>
                  <td className="py-3 font-semibold">{formatTons(total)}</td>
                  <td className="py-3">{intensity.toFixed(1)}</td>
                  <td className="py-3">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-eco-500 rounded-full" style={{ width: `${(total / maxTotal) * 100}%` }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="font-semibold text-slate-900 mb-3">Monthly trend by country</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {countries.map((c) => {
            const max = Math.max(...c.monthly);
            return (
              <div key={c.code} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span>{c.flag}</span>
                  <span className="font-medium text-sm">{c.name}</span>
                </div>
                <div className="flex items-end gap-1 h-24">
                  {c.monthly.map((v, i) => (
                    <div
                      key={i}
                      className={cn("flex-1 rounded-t min-h-[2px]", c.yoyChangePct < 0 ? "bg-eco-500/70" : "bg-amber-400/70")}
                      style={{ height: `${(v / max) * 100}%` }}
                      title={`${monthLabels[i]}: ${formatTons(v)}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
