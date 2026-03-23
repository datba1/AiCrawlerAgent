import React from 'react';
import { Clock, MoreVertical } from 'lucide-react';

const CrawlerRow = ({ name, url, status, lastRun, pages }) => {
  const statusColors = {
    'Active': 'bg-emerald-100 text-emerald-700',
    'Idle': 'bg-slate-100 text-slate-700',
    'Error': 'bg-rose-100 text-rose-700',
    'Running': 'bg-primary-100 text-primary-700',
  };

  return (
    <tr className="group hover:bg-slate-50 transition-colors">
      <td className="py-4 px-4 align-middle">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
            {name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{name}</p>
            <p className="text-xs text-slate-500 font-light truncate max-w-[200px]">{url}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 align-middle">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status] || 'bg-slate-100'}`}>
          {status}
        </span>
      </td>
      <td className="py-4 px-4 align-middle">
        <div className="flex items-center space-x-1 text-xs text-slate-600">
          <Clock size={12} />
          <span>{lastRun}</span>
        </div>
      </td>
      <td className="py-4 px-4 align-middle text-sm text-slate-600 font-medium">
        {pages.toLocaleString()}
      </td>
      <td className="py-4 px-4 align-middle text-right text-slate-400">
        <button className="p-1 hover:bg-slate-100 rounded-md transition-colors">
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
};

export default CrawlerRow;
