
import React from 'react';
import { FolderKanban, Plus, Filter, Search, ChevronRight } from 'lucide-react';

const ProjectsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest">MIS Modules</span>
            <ChevronRight size={12} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Projects</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Project Management</h2>
          <p className="text-slate-500 text-sm mt-1">Track and manage all regional development initiatives.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          <Plus size={18} />
          Create Project
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search projects..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600">
          <Filter size={16} /> Filter
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-20 flex flex-col items-center justify-center min-h-[400px]">
        <div className="p-6 bg-blue-50 rounded-3xl text-blue-200 mb-6"><FolderKanban size={48} /></div>
        <h3 className="text-xl font-bold text-slate-900">Projects List is Empty</h3>
        <p className="text-slate-500 text-center max-w-sm mt-2">The project tracking system is connected but no active records were found for the current filter.</p>
      </div>
    </div>
  );
};

export default ProjectsPage;
