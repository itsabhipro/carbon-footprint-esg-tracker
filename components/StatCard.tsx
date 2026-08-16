import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: React.ReactNode;
  trend?: { value: string; isPositive: boolean; };
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtext, icon, trend }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-200 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 font-mono tracking-tight">{value}</h3>
        </div>
        <div className="p-3 bg-slate-50 text-slate-700 rounded-xl transition-colors duration-300">
          {icon}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">{subtext}</span>
        {trend && (
          <span className={`font-mono font-bold px-2 py-0.5 rounded-full ${
            trend.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}>
            {trend.isPositive ? '↓' : '↑'} {trend.value}
          </span>
        )}
      </div>
    </div>
  );
};
