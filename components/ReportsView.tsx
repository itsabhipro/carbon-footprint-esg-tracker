"use client";

import { countries, globalTotals, totalEmissions, esgScore } from "@/lib/data";
import { formatTons, formatNumber } from "@/lib/utils";
import { FileText, Download } from "lucide-react";

export default function ReportsView() {
  const t = globalTotals();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="text-sm text-slate-500 mt-1">Compliance-oriented summaries and export-ready views</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-eco-100 flex items-center justify-center">
              <FileText size={20} className="text-eco-700" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Group Sustainability Summary</h2>
              <p className="text-sm text-slate-500">FY 2025–26 · Multi-country aggregate</p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-eco-600 text-white text-sm font-medium hover:bg-eco-700 transition-colors"
            onClick={() => alert("Demo: export would generate PDF/CSV from pipeline data.")}
          >
            <Download size={16} />
            Export report
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-400">Total tCO₂e</p>
            <p className="text-xl font-bold">{formatTons(t.total)}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-400">Countries</p>
            <p className="text-xl font-bold">{countries.length}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-400">Avg ESG</p>
            <p className="text-xl font-bold">{formatNumber(t.avgEsg, 0)}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-400">Avg YoY change</p>
            <p className="text-xl font-bold text-emerald-600">{t.avgYoy.toFixed(1)}%</p>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b">
                <th className="pb-2 font-medium">Country</th>
                <th className="pb-2 font-medium">Emissions</th>
                <th className="pb-2 font-medium">ESG</th>
                <th className="pb-2 font-medium">Reduction target</th>
                <th className="pb-2 font-medium">YoY</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((c) => (
                <tr key={c.code} className="border-b border-slate-50">
                  <td className="py-2.5">{c.flag} {c.name}</td>
                  <td className="py-2.5">{formatTons(totalEmissions(c))} tCO₂e</td>
                  <td className="py-2.5">{esgScore(c)}</td>
                  <td className="py-2.5">−{c.targetReductionPct}%</td>
                  <td className="py-2.5">
                    <span className={c.yoyChangePct < 0 ? "text-emerald-600" : "text-red-500"}>
                      {c.yoyChangePct > 0 ? "+" : ""}{c.yoyChangePct}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-slate-400 leading-relaxed">
          This demo illustrates multi-country carbon accounting (Scope 1–3) and ESG scorecards.
          Production systems typically use emission factors per jurisdiction, ETL pipelines
          (Azure Data Factory / Databricks), and audit-ready data lineage for CSRD, GHG Protocol,
          and internal sustainability reporting.
        </p>
      </div>
    </div>
  );
}
