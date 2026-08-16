"use client";

import React, { useState, useEffect } from 'react';
import { carbonApi, RegionalData, GlobalEsgProfile } from '../lib/carbonApi';
import { Globe, RefreshCw } from 'lucide-react';

export const CountriesView: React.FC = () => {
  const [regions, setRegions] = useState<RegionalData[]>([]);
  const [globalProfiles, setGlobalProfiles] = useState<GlobalEsgProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountryData() {
      try {
        const [regData, globalData] = await Promise.all([
          carbonApi.getRegionalIntensity(),
          carbonApi.getGlobalEsgProfiles(),
        ]);
        setRegions(regData);
        setGlobalProfiles(globalData);
      } catch (error) {
        console.error('Failed to load multi-jurisdictional metrics', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCountryData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[40vh] items-center justify-center font-mono text-xs text-slate-400 gap-2">
        <RefreshCw className="w-4 h-4 animate-spin" /> Querying API Registry...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
          <Globe className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Multi-Jurisdictional ESG Matrix</h2>
          <p className="text-sm text-slate-500">Live synchronized reporting across international registry frameworks.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase font-mono">
            <tr>
              <th className="p-4">Jurisdiction</th>
              <th className="p-4">ESG Scale Pillar</th>
              <th className="p-4 text-right">Target Fulfillment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {regions.slice(0, 1).map((r) => (
              <tr key={r.regionid} className="hover:bg-slate-50/50">
                <td className="p-4 font-semibold text-slate-900 flex items-center gap-2">
                  {r.shortname} (UK) 
                  <span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-md uppercase font-mono">
                    Live API Feed
                  </span>
                </td>
                <td className="p-4 text-xs capitalize">Intensity Index: {r.intensity.index}</td>
                <td className="p-4 text-right font-mono font-bold text-slate-900">{r.intensity.forecast} gCO₂</td>
              </tr>
            ))}
            {globalProfiles.map((c) => (
              <tr key={c.code} className="hover:bg-slate-50/50">
                <td className="p-4 font-semibold text-slate-900">
                  {c.name} <span className="text-xs font-normal text-slate-400 font-mono">({c.code})</span>
                </td>
                <td className="p-4 text-xs font-bold text-emerald-700">{c.score} Rating</td>
                <td className="p-4 text-right font-mono font-medium text-slate-500">{c.compliance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
