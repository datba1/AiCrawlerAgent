import React from 'react';
import { Search, Filter } from 'lucide-react';
import CrawlerRow from './CrawlerRow';

const CrawlerTable = ({ crawlers }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h2 className="text-lg font-bold text-slate-800">Active Crawlers</h2>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input type="text" placeholder="Filter crawlers..." className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-8 pr-3 text-xs focus:ring-1 focus:ring-primary-500 focus:bg-white outline-none transition-all" />
        </div>
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center space-x-1 text-xs font-medium">
          <Filter size={14} />
          <span>Filters</span>
        </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50">
            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Crawler Name</th>
            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Sync</th>
            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pages</th>
            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {crawlers.map((crawler, i) => (
            <CrawlerRow key={i} {...crawler} />
          ))}
        </tbody>
      </table>
    </div>
    <div className="p-4 border-t border-slate-100 bg-slate-50/30 text-center">
      <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
        View all crawlers
      </button>
    </div>
  </div>
);

export default CrawlerTable;
