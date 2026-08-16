"use client";

import React, { useState, useEffect } from 'react';
import { carbonApi, RegionalData } from '../lib/carbonApi';

export const CountriesView: React.FC = () => {
  const [regions, setRegions] = useState<RegionalData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carbonApi.getRegionalIntensity().then(data => { setRegions(data); setLoading(false); });
  }, []);

  const countriesData = [
    { name: 'Kuwait', code: 'KW', score: 'B-', compliance: '52%' },
    { name: 'Saudi Arabia', code: 'SA', score: 'B', compliance: '61%' },
    { name: 'UAE', code: 'AE', score: 'A-', compliance: '78%' },
    { name: 'Germany', code: 'DE', score: 'A', compliance: '84%' },
    { name: 'Netherlands', code: 'NL', score: 'A+', compliance: '91%' },
  ];

  if (loading) return <div className="text-xs font-mono text-slate-400 animate-pulse">Mapping grid frameworks...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Multi-Jurisdictional ESG Matrix</h2>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">
            <tr>
              <th className="p-4">Jurisdiction</th>
              <th className="p-4">ESG Scale Pillar</th>
              <th className="p-4 text-right">Target Fulfillment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {regions.slice(0, 1).map((r) => (
              <tr key={r.regionid} className="hover:bg-slate-50/50">
                <td className="p-4 font-semibold text-slate-900 flex items-center gap-2">
                  {r.shortname} (UK) <span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-md uppercase font-mono">Live API</span>
                </td>
                <td className="p-4 text-xs capitalize text-slate-500">Intensity Index: {r.intensity.index}</td>
                <td className="p-4 text-right font-mono font-bold text-slate-900">{r.intensity.forecast} g</td>
              </tr>
            ))}
            {countriesData.map((c) => (
              <tr key={c.code} className="hover:bg-slate-50/50">
                <td className="p-4 font-semibold text-slate-900">{c.name} <span className="text-xs font-normal text-slate-400 font-mono">({c.code})</span></td>
                <td className="p-4 text-xs font-bold text-emerald-700">{c.score} Rating</td>
                <td className="p-4 text-right font-mono text-slate-500">{c.compliance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
