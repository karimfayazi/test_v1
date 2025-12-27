
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { Database } from 'lucide-react';
import { DB_CONFIG } from '../config';
import Logo from './Logo';

interface SidebarProps {
  currentPath: string;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-50 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 flex flex-col border-r border-slate-800
      `}>
        <div className="p-6 flex flex-col h-full">
          <div className="mb-10 flex items-center gap-3">
            <Logo size="sm" />
            <div>
              <h1 className="font-bold text-lg leading-tight text-white tracking-tight">SJDA MIS</h1>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">Silver Jubilee Agency</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.path || (currentPath === '' && item.path === '#/');
              return (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={() => onClose()} // Close mobile sidebar on link click
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                  `}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </a>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-800 space-y-4">
            {/* DB Status Badge */}
            <div className="px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <Database size={12} className="text-blue-400" />
                  SQL Server
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-emerald-500 font-bold">LIVE</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 truncate font-mono">{DB_CONFIG.dataSource}</p>
            </div>

            <div className="flex items-center gap-3 p-2 bg-slate-800 rounded-xl">
              <img 
                src="https://picsum.photos/seed/admin/40/40" 
                alt="Profile" 
                className="rounded-full w-10 h-10 border border-slate-700"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">Administrator</p>
                <p className="text-xs text-slate-400 truncate">admin@sjda.org</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
