import React, { useState } from 'react';
import { aiService } from '../services/aiService';
import { Search as SearchIcon, Loader2, AlertCircle, ExternalLink } from 'lucide-react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await aiService.search(query);
      setResults(data);
    } catch (err) {
      setError(err.response?.data || 'Failed to complete search. Please check if the API is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-500">
      <div className="flex items-center space-x-3">
        <div className="p-1.5 bg-primary-100 text-primary-600 rounded-md">
          <SearchIcon size={20} strokeWidth={1.5} />
        </div>
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">AI Search</h1>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-slate-500 mb-4 text-xs">Search across the web using AI-powered search services and get structured data results.</p>
        <div className="flex space-x-3">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for companies, trends, or specific data..." 
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary-500 focus:bg-white outline-none transition-all"
            disabled={loading}
          />
          <button 
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center space-x-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} strokeWidth={1.5} /> : <span>Search</span>}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-100 text-rose-700 p-4 rounded-xl flex items-start space-x-3">
          <AlertCircle className="mt-0.5 flex-shrink-0" size={18} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
          {(Array.isArray(results) ? results : results.results || []).map((result, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all group">
              <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2 min-h-[2.5rem] text-sm">{result.title || 'Untitled'}</h3>
              <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">{result.snippet || 'No summary available.'}</p>
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-medium text-slate-400">Score: {result.score?.toFixed(2) || '0.00'}</span>
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-[10px] font-semibold text-primary-600 hover:bg-primary-50 px-2 py-1 rounded-md transition-colors"
                >
                  <span>Visit Website</span>
                  <ExternalLink size={12} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
