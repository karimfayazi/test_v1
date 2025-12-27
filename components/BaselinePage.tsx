
import React from 'react';
import { 
  Activity, 
  Plus, 
  FileSpreadsheet, 
  ChevronRight,
  Database,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  MapPin
} from 'lucide-react';
import { MOCK_BASELINE_DATA } from '../constants';

const BaselinePage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest">MIS Modules</span>
            <ChevronRight size={12} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Baseline Survey</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Baseline Records</h2>
          <p className="text-slate-500 text-sm mt-1">Socio-economic household surveys for regional development planning.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all text-sm shadow-sm">
            <FileSpreadsheet size={18} />
            Import CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
            <Plus size={18} />
            Add Entry
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Family Head or ID..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20">
          <option>All Regions</option>
          <option>North</option>
          <option>South</option>
          <option>East</option>
          <option>West</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">
          <Filter size={16} />
          More Filters
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Survey ID & Head</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Location</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Mo. Income</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Survey Date</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_BASELINE_DATA.map((record) => (
                <tr key={record.id} className="group hover:bg-blue-50/30 transition-all cursor-pointer">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xs border border-blue-100">
                        BSL
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{record.familyHead}</p>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{record.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" /> {record.ward}
                      </span>
                      <span className="text-xs text-slate-400 ml-4">{record.region} Region</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-bold text-slate-900">₹{record.income.toLocaleString()}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar size={14} className="text-slate-400" />
                      {record.date}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      record.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                      record.status === 'Surveyed' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 
                      'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">Showing <span className="text-slate-900">1 to 5</span> of 124 records</p>
          <div className="flex gap-2">
            <button disabled className="px-3 py-1 bg-white border border-slate-200 text-slate-300 rounded-md text-xs font-bold cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-md text-xs font-bold hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      {/* Sync Status Footer */}
      <div className="flex items-center justify-center gap-2 py-4 text-slate-400">
        <Database size={14} className="text-emerald-500" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Connected to SJDA_Users.dbo.BaselineTable • Syncing Live</span>
      </div>
    </div>
  );
};

export default BaselinePage;
