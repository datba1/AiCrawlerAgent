import React, { useState } from 'react';
import { aiService } from '../services/aiService';
import { Loader2, AlertCircle, BookOpen } from 'lucide-react';

const Research = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleResearch = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await aiService.research(topic);
      setResult(data);
    } catch (err) {
      setError(err.response?.data || 'Failed to execute research. Please check if the API is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-500">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
          <BookOpen size={24} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI Research</h1>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <p className="text-slate-500 mb-4 text-sm md:text-base">Enter a topic to generate a comprehensive research summary powered by AI agents.</p>
        <div className="flex flex-col md:flex-row gap-3">
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleResearch()}
            placeholder="e.g. Impact of Quantum Computing on Cybersecurity" 
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm md:text-base focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition-all"
            disabled={loading}
          />
          <button 
            onClick={handleResearch}
            disabled={loading || !topic.trim()}
            className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <span>Research</span>}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-100 text-rose-700 p-4 rounded-xl flex items-start space-x-3 animate-in slide-in-from-top-2">
          <AlertCircle className="mt-0.5 flex-shrink-0" size={18} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-in zoom-in-95 duration-300">
          <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-4">
            Research Summary: {result.topic}
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
            {result.summary}
          </div>
        </div>
      )}
    </div>
  );
};

export default Research;
