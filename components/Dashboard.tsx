"use client";

import React, { useState, useEffect } from 'react';
import { StatCard } from './StatCard';
import { carbonApi, IntensityData, RegionalData } from '../lib/carbonApi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

export const Dashboard: React.FC = () => {
  const [national, setNational] = useState<IntensityData | null>(null);
  const [regions, setRegions] = useState<RegionalData[]>([]);
  const [chartType, setChartType] = useState<'trend' | 'mix'>('trend');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [natData, regData] = await Promise.all([
          carbonApi.getCurrentIntensity(),
          carbonApi.getRegionalIntensity()
        ]);
        setNational(natData);
        setRegions(regData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const historicTrend = [
  { month: 'Jan', scope1: 420, scope2: 310, scope3: 840 },
  { month: 'Feb', scope1: 380, scope2: 290, scope3: 790 },
  { month: 'Mar', scope1: 410, scope2: 245, scope3: 810 },
  { month: 'Apr', scope1: 390, scope2: 210, scope3: 750 },
  { month: 'May', scope1: 350, scope2: 180, scope3: 720 }, // Fixed 'stop2' typo here
  { month: 'Jun', scope1: 310, scope2: 145, scope3: 690 },
];


  const aggregateMix = regions[0]?.generationmix || [
    { fuel: 'wind', percentage: 45 }, { fuel: 'gas', percentage: 30 }, { fuel: 'nuclear', percentage: 15 }
  ];

  const COLORS = ['#10b981', '#f59e0b', '#6366f1', '#ec4899', '#3b82f6'];

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-xs font-semibold text-slate-400 animate-pulse tracking-widest uppercase">
          Compiling Live Sustainability Ledger...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">ESG Command Center</h1>
          <p className="text-sm text-slate-500">Multi-jurisdictional environmental data visualization engine.</p>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start">
          <button onClick={() => setChartType('trend')} className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${chartType === 'trend' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
            📉 Trends
          </button>
          <button onClick={() => setChartType('mix')} className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${chartType === 'mix' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
            🍕 Power Mix
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Aggregate Scope 1-3" value="1,445 t" subtext="Gross Corporate footprint" trend={{ value: '4.2%', isPositive: true }} icon="💨" />
        <StatCard title="Live Grid Intensity" value={`${national?.intensity.actual || 145} g`} subtext="Sourced from National Grid API" trend={{ value: '12%', isPositive: true }} icon="⚡" />
        <StatCard title="Grid Mix Safety" value={national?.intensity.index || 'Moderate'} subtext="Current systemic evaluation" icon="🌟" />
        <StatCard title="Active Facilities" value="6 Regions" subtext="Synchronized audit networks" icon="🌍" />
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="h-80 w-full font-mono text-xs">
          {chartType === 'trend' ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicTrend}>
                <defs>
                  <linearGradient id="colorS1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                  <linearGradient id="colorS2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" />
                <XAxis dataKey="month" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Area type="monotone" dataKey="scope1" name="Scope 1 (Direct)" stroke="#10b981" fill="url(#colorS1)" strokeWidth={2} />
                <Area type="monotone" dataKey="scope2" name="Scope 2 (Grid)" stroke="#6366f1" fill="url(#colorS2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={aggregateMix} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="percentage" nameKey="fuel">
                    {aggregateMix.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 font-sans text-sm">
                {aggregateMix.map((item, index) => (
                  <div key={item.fuel} className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="capitalize font-medium text-slate-600">{item.fuel}:</span>
                    <span className="font-mono font-bold ml-auto text-slate-900">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
