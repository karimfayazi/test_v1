
import React from 'react';
import { Users, UserPlus, Search, ChevronRight, Mail, Phone } from 'lucide-react';

const UsersPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest">System</span>
            <ChevronRight size={12} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">User Management</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Staff & Users</h2>
          <p className="text-slate-500 text-sm mt-1">Manage institutional access and organizational hierarchy.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          <UserPlus size={18} />
          Invite Staff
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search by name, email or department..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-20 flex flex-col items-center justify-center min-h-[400px]">
        <div className="p-6 bg-emerald-50 rounded-3xl text-emerald-200 mb-6"><Users size={48} /></div>
        <h3 className="text-xl font-bold text-slate-900">Directory Initializing</h3>
        <p className="text-slate-500 text-center max-w-sm mt-2">Connecting to the Active Directory and SQL User tables for real-time staff status.</p>
      </div>
    </div>
  );
};

export default UsersPage;
