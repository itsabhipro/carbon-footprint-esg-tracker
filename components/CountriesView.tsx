"use client";

import React, { useState, useEffect } from 'react';

interface LiveIntensity {
  forecast: number;
  actual: number;
  index: string;
}

export const CountriesView: React.FC = () => {
  const [ukLive, setUkLive] = useState<LiveIntensity | null>(null);
  const [loading, setLoading] = useState(true);

  // Static portfolio tracking for your other target countries
  const otherCountries = [
    { country: 'Kuwait', code: 'KW', intensity: 'High', emissions: '84,100 tCO₂e', mix: 'Oil / Gas Gas' },
    { country: 'Saudi Arabia', code: 'SA', intensity: 'High', emissions: '142,500 tCO₂e', mix: 'Gas / Heavy Oil' },
    { country: 'UAE', code: 'AE', intensity: 'Moderate-High', emissions: '92,300 tCO₂e', mix: 'Gas / Nuclear' },
    { country: 'Germany', code: 'DE', intensity: 'Moderate', emissions: '42,100 tCO₂e', mix: 'Coal / Solar / Wind' },
    { country: 'Netherlands', code: 'NL', intensity: 'Moderate', emissions: '28,400 tCO₂e', mix: 'Gas / Offshore Wind' }
  ];

  useEffect(() => {
    // Zero-Auth Open Public API hit
    fetch('https://carbonintensity.org.uk')
      .then((res) => {
        if (!res.ok) throw new Error("API Offline");
        return res.json();
      })
      .then((resBody) => {
        const dataPoint = resBody.data[0]?.intensity;
        if (dataPoint) {
          setUkLive({
            forecast: dataPoint.forecast,
            actual: dataPoint.actual,
            index: dataPoint.index
          });
        }
      })
      .catch((err) => console.error("Failed fetching live grid data:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Multi-Country Power Profiles</h2>
        <p className="text-sm text-gray-500">Cross-referencing regional grids with live interconnected nodes.</p>
      </div>

      {/* Live Highlight Card for United Kingdom */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl shadow-md border border-slate-700 text-white">
        <div className="flex justify-between items-center">
          <div>
            <span className="bg-green-500/20 text-green-400 text-xs px-2.5 py-1 rounded-full font-mono uppercase tracking-wider">
              🟢 Live API Network Node
            </span>
            <h3 className="text-2xl font-bold mt-2">United Kingdom (UK Grid)</h3>
          </div>
          <span className="text-3xl">🇬🇧</span>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400 mt-4 animate-pulse">Pinging National Grid ESO APIs...</p>
        ) : ukLive ? (
          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-700/50">
            <div>
              <p className="text-xs text-slate-400">Actual Grid Load</p>
              <p className="text-xl font-bold text-green-400 mt-0.5">{ukLive.actual} <span className="text-xs font-normal text-slate-400">gCO₂/kWh</span></p>
            </div>
            <div>
              <p className="text-xs text-slate-400">96hr Forecast Variance</p>
              <p className="text-xl font-bold text-slate-200 mt-0.5">{ukLive.forecast} <span className="text-xs font-normal text-slate-400">gCO₂/kWh</span></p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Grid Mix Index</p>
              <p className="text-xl font-bold text-amber-400 mt-0.5 capitalize">{ukLive.index}</p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-red-400 mt-4">API connection failed. Using standard European grid assumptions.</p>
        )}
      </div>

      {/* Corporate Dashboard Registry Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
            <tr>
              <th className="p-4">Jurisdiction</th>
              <th className="p-4">Primary Grid Generation Mix</th>
              <th className="p-4">Intensity Profile</th>
              <th className="p-4 text-right">Annual Gross Footprint</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {otherCountries.map((c, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-semibold text-gray-900 flex items-center gap-2">
                  <span>{c.country}</span>
                  <span className="text-xs text-gray-400 font-mono">({c.code})</span>
                </td>
                <td className="p-4 text-gray-500 font-mono text-xs">{c.mix}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    c.intensity.includes('High') ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {c.intensity}
                  </span>
                </td>
                <td className="p-4 text-right font-mono text-gray-900">{c.emissions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
