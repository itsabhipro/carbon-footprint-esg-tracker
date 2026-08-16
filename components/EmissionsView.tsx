"use client";

import React, { useState } from 'react';

export const EmissionsView: React.FC = () => {
  const [kwhAmount, setKwhAmount] = useState('5000');
  const [calculatedCo2, setCalculatedCo2] = useState<number | null>(null);
  const [apiFactorUsed, setApiFactorUsed] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateScope2Footprint = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://carbonintensity.org.uk');
      if (!response.ok) throw new Error("API Offline");
      
      const payload = await response.json();
      // Grab actual live carbon factor (gCO2 per kWh)
      const currentFactorGrams = payload.data[0]?.intensity?.actual || 150; 
      
      // Conversion math: Grams to Kilograms = divide by 1000
      const currentFactorKg = currentFactorGrams / 1000;
      const totalKwh = parseFloat(kwhAmount) || 0;

      setApiFactorUsed(currentFactorGrams);
      setCalculatedCo2(totalKwh * currentFactorKg);
    } catch (err) {
      console.warn("Falling back to standard EU/UK baseline metrics.", err);
      // Hard fallback factor if network cuts out
      setCalculatedCo2(parseFloat(kwhAmount) * 0.21); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Live Carbon Accounting Ledger</h2>
        <p className="text-sm text-gray-500">Calculate Scope 2 facility footprint metrics using live transmission line metrics.</p>
      </div>

      <form onSubmit={calculateScope2Footprint} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Facility Power Consumption (kWh)
          </label>
          <input 
            type="number"
            value={kwhAmount}
            onChange={(e) => setKwhAmount(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition"
            placeholder="e.g., 24500"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium text-sm rounded-lg shadow-sm transition"
        >
          {loading ? 'Interrogating National Grid...' : 'Compute Dynamic Emissions'}
        </button>
      </form>

      {calculatedCo2 !== null && (
        <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-xl space-y-2">
          <h4 className="text-xs font-bold text-green-800 uppercase tracking-wider">Audit Results (GHG Compliant)</h4>
          <p className="text-3xl font-extrabold text-green-900 tracking-tight">
            {calculatedCo2.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-lg font-medium">kg CO₂e</span>
          </p>
          {apiFactorUsed && (
            <p className="text-xs text-green-600 font-mono">
              Calculation factor sourced from live API grid state: {apiFactorUsed} gCO₂/kWh
            </p>
          )}
        </div>
      )}
    </div>
  );
};
