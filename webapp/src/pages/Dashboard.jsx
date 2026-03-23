import React, { useState } from 'react';
import { 
  Plus, 
  Globe, 
  Database, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import CrawlerTable from '../components/Dashboard/CrawlerTable';

const Dashboard = () => {
  const [crawlers] = useState([
    { name: 'E-commerce Scraper', url: 'https://store.example.com', status: 'Running', lastRun: '2 mins ago', pages: 1240 },
    { name: 'News Aggregator', url: 'https://news.example.org', status: 'Active', lastRun: '1 hour ago', pages: 45210 },
    { name: 'Stock Tracker', url: 'https://finance.example.com', status: 'Idle', lastRun: 'Yesterday', pages: 890 },
    { name: 'Blog Archive', url: 'https://blog.example.net', status: 'Error', lastRun: '3 days ago', pages: 0 },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time status of your AI crawler agents.</p>
        </div>
        <button className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-primary-200 transition-all active:scale-95">
          <Plus size={20} />
          <span>New Crawler</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="Total Pages Scraped" value="1.2M" change="+12.5%" trend="up" icon={Globe} color="primary" />
        <StatCard title="Data Points" value="842,031" change="+8.2%" trend="up" icon={Database} color="emerald" />
        <StatCard title="Active Agents" value="12" change="-2" trend="down" icon={CheckCircle2} color="indigo" />
        <StatCard title="System Errors" value="3" change="+1" trend="down" icon={AlertCircle} color="rose" />
      </div>

      {/* Recent Crawlers Table */}
      <CrawlerTable crawlers={crawlers} />
    </div>
  );
};

export default Dashboard;
