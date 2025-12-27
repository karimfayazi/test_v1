
import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { analyzeMISData } from '../services/geminiService';
import { MISProject } from '../types';

interface AIInsightsProps {
  projects: MISProject[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ projects }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInsight = async () => {
    setLoading(true);
    const result = await analyzeMISData(projects);
    setInsight(result || 'No insights available.');
    setLoading(false);
  };

  useEffect(() => {
    fetchInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-yellow-300" size={20} />
            <h2 className="text-lg font-bold">AI Data Analyst Insights</h2>
          </div>
          <button 
            onClick={fetchInsight}
            disabled={loading}
            className="p-1 hover:bg-white/10 rounded transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-white/20 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-white/20 rounded w-5/6 animate-pulse"></div>
          </div>
        ) : (
          <div className="text-sm leading-relaxed whitespace-pre-line text-indigo-50">
            {insight}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
