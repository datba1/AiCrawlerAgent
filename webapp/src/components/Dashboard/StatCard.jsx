import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600`}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <div className={`flex items-center space-x-1 text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
        <span>{change}</span>
        {trend === 'up' ? <ArrowUpRight size={12} strokeWidth={1.5} /> : <ArrowDownRight size={12} strokeWidth={1.5} />}
      </div>
    </div>
    <h3 className="text-slate-500 text-[11px] font-medium uppercase tracking-wider">{title}</h3>
    <p className="text-xl font-semibold text-slate-900 mt-1">{value}</p>
  </div>
);

export default StatCard;
