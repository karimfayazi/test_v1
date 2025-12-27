
import React from 'react';
import { BarChart3, TrendingUp, Download, Calendar, ChevronRight } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest">MIS Modules</span>
            <ChevronRight size={12} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Analytics</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Performance Analytics</h2>
          <p className="text-slate-500 text-sm mt-1">Real-time data visualization of agency performance.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all">
          <Download size={18} />
          Export Insights
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm animate-pulse">
            <div className="w-10 h-10 bg-slate-100 rounded-xl mb-4"></div>
            <div className="h-4 bg-slate-100 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-slate-50 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-20 flex flex-col items-center justify-center min-h-[300px]">
        <div className="p-6 bg-purple-50 rounded-3xl text-purple-200 mb-6"><BarChart3 size={48} /></div>
        <h3 className="text-xl font-bold text-slate-900">Analytics Engine Ready</h3>
        <p className="text-slate-500 text-center max-w-sm mt-2">Integrating PowerBI and Recharts visualization engine for live budget tracking.</p>
      </div>
    </div>
  );
};

export default AnalyticsPage;
