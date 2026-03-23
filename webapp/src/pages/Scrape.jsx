import React, { useState } from 'react';
import { aiService } from '../services/aiService';
import { Globe, Loader2, AlertCircle, Cpu, FileText } from 'lucide-react';

const Scrape = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleScrape = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await aiService.scrape(url);
      setData(result);
    } catch (err) {
      setError(err.response?.data || 'Failed to extract data. Please check if the URL is valid and the API is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl animate-in fade-in duration-500">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
          <Globe size={24} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI Scraper</h1>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <p className="text-slate-500 mb-4 text-sm md:text-base">Provide a target URL to extract structured data using intelligent scraping agents.</p>
        <div className="flex flex-col md:flex-row gap-3">
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
            placeholder="https://example.com/product/123" 
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm md:text-base focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition-all"
            disabled={loading}
          />
          <button 
            onClick={handleScrape}
            disabled={loading || !url.trim()}
            className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <span>Extract Data</span>}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-100 text-rose-700 p-4 rounded-xl flex items-start space-x-3">
          <AlertCircle className="mt-0.5 flex-shrink-0" size={18} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-2 mb-4 text-slate-800 font-bold border-b border-slate-100 pb-2">
                <FileText size={18} className="text-primary-500" />
                <h2>Extracted Content</h2>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl font-mono text-sm overflow-auto max-h-[500px] text-slate-700 leading-relaxed">
                {typeof data.content === 'object' ? JSON.stringify(data.content, null, 2) : data.content}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
              <div className="flex items-center space-x-2 mb-4 text-slate-800 font-bold border-b border-slate-100 pb-2">
                <Cpu size={18} className="text-primary-500" />
                <h2>Metadata</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm py-2 border-b border-slate-50">
                  <span className="text-slate-500">Status</span>
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">Success</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2 border-b border-slate-50">
                  <span className="text-slate-500">Confidence</span>
                  <span className="font-bold text-slate-800">98%</span>
                </div>
                {data.metadata && Object.entries(data.metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center text-sm py-2 border-b border-slate-50">
                    <span className="text-slate-500 capitalize">{key}</span>
                    <span className="font-bold text-slate-800 truncate max-w-[120px]">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scrape;
