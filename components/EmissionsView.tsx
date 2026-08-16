"use client";

import React, { useState } from 'react';
import { carbonApi } from '../lib/carbonApi';

export const EmissionsView: React.FC = () => {
  const [kwh, setKwh] = useState('8500');
  const [result, setResult] = useState<number | null>(null);
  const [factor, setFactor] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);

  const handleCompute = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalculating(true);
    const data = await carbonApi.computeScope2(parseFloat(kwh) || 0);
    setResult(data.totalKg);
    setFactor(data.factorGrams);
    setCalculating(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm max-w-xl overflow-hidden">
      <div className="p-6 bg-slate-900 text-white">
        <h3 className="text-xl font-bold tracking-tight">Scope 2 Ledger Calculator</h3>
        <p className="text-xs text-slate-400 mt-1">Computes footprint variables instantly by interacting with your core library wrapper.</p>
      </div>
      <form onSubmit={handleCompute} className="p-6 space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Facility Power Usage (kWh)</label>
          <input type="number" value={kwh} onChange={(e) => setKwh(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" required />
        </div>
        <button type="submit" disabled={calculating} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-semibold text-sm rounded-xl transition-all">
          {calculating ? 'Invoking Calculation Wrapper...' : 'Compute Audit Balance'}
        </button>
      </form>
      {result !== null && (
        <div className="mx-6 mb-6 p-5 bg-emerald-50/40 border border-emerald-100 rounded-xl">
          <p className="text-3xl font-extrabold text-slate-900 font-mono">{result.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-sm font-normal text-emerald-700">kg CO₂e</span></p>
          <p className="text-[11px] text-emerald-600 mt-1">Sourced via live grid coefficient factor: <strong>{factor} gCO₂/kWh</strong></p>
        </div>
      )}
    </div>
  );
};
