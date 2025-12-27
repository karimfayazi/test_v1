
import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Wallet, 
  CheckCircle2, 
  Timer, 
  TrendingUp,
  ArrowRight,
  LogOut,
  Menu
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import AIInsights from './components/AIInsights';
import LoginForm from './components/LoginForm';
import SettingsPage from './components/SettingsPage';
import BaselinePage from './components/BaselinePage';
import ProjectsPage from './components/ProjectsPage';
import AnalyticsPage from './components/AnalyticsPage';
import ReportsPage from './components/ReportsPage';
import UsersPage from './components/UsersPage';
import { MOCK_PROJECTS, NAV_ITEMS } from './constants';
import { ProjectStatus, User } from './types';
import { apiService } from './services/apiService';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sjda_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loginError, setLoginError] = useState<string>();
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentPath(hash);
      setSidebarOpen(false);
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = async (userId: string, pass: string) => {
    setLoginError(undefined);
    try {
      const user = await apiService.login(userId, pass);
      setCurrentUser(user);
      localStorage.setItem('sjda_user', JSON.stringify(user));
    } catch (err: any) {
      setLoginError(err.message || "Failed to connect to SJDA_Users database.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('sjda_user');
    window.location.hash = '#/';
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} error={loginError} />;
  }

  const activeNavItem = NAV_ITEMS.find(item => item.path === currentPath) || NAV_ITEMS[0];
  const isDashboard = currentPath === '#/' || currentPath === '';
  const pageTitle = isDashboard ? "MIS Overview" : activeNavItem.name;

  const renderContent = () => {
    switch (currentPath) {
      case '#/baseline': return <BaselinePage />;
      case '#/projects': return <ProjectsPage />;
      case '#/analytics': return <AnalyticsPage />;
      case '#/reports': return <ReportsPage />;
      case '#/users': return <UsersPage />;
      case '#/settings': return <SettingsPage />;
      case '#/':
      case '':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <StatsCard label="Total Projects" value={MOCK_PROJECTS.length} subtext="Registered in current FY" icon={<Timer className="text-blue-600" size={24} />} color="bg-blue-50" trend={{ value: 12, isUp: true }} />
              <StatsCard label="Total Budget" value={`₹${(MOCK_PROJECTS.reduce((acc, p) => acc + p.budget, 0) / 10000000).toFixed(2)} Cr`} subtext="Total allocated funds" icon={<Wallet className="text-emerald-600" size={24} />} color="bg-emerald-50" />
              <StatsCard label="Overall Progress" value="74.2%" subtext="Mean project completion" icon={<TrendingUp className="text-purple-600" size={24} />} color="bg-purple-50" trend={{ value: 5, isUp: true }} />
              <StatsCard label="Finished Projects" value={MOCK_PROJECTS.filter(p => p.status === ProjectStatus.COMPLETED).length} subtext="Closed this quarter" icon={<CheckCircle2 className="text-orange-600" size={24} />} color="bg-orange-50" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg text-slate-900">Budget vs Expenditure (Lakhs)</h3>
                </div>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_PROJECTS.map(p => ({ name: p.title.substring(0, 10), budget: p.budget / 100000, spent: p.spent / 100000 }))}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="budget" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                      <Bar dataKey="spent" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <AIInsights projects={MOCK_PROJECTS} />
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-20 flex flex-col items-center justify-center min-h-[500px]">
            <div className="p-6 bg-slate-50 rounded-3xl text-slate-300 mb-6">{activeNavItem.icon}</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{pageTitle}</h3>
            <p className="text-slate-500 max-w-sm text-center">This module is coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar currentPath={currentPath} isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 bg-white rounded-lg border border-slate-200 text-slate-600"><Menu size={20} /></button>
              <div>
                <div className="flex items-center gap-2 mb-0.5"><h2 className="text-2xl font-bold text-slate-900">{pageTitle}</h2><span className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-bold border border-emerald-100 uppercase tracking-tighter">● Connected</span></div>
                <p className="text-slate-500 text-sm">Welcome, {currentUser.USER_FULL_NAME}.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleLogout} className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors" title="Logout"><LogOut size={20} /></button>
              {currentUser.permissions.CAN_ADD && <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"><PlusCircle size={18} /><span className="hidden sm:inline">New Action</span></button>}
            </div>
          </header>
          {renderContent()}
        </div>
        <footer className="px-8 py-4 bg-white border-t border-slate-100 text-center"><p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">All Rights Reserved. (c) SJDA - Silver Jubilee Development Agency 2025</p></footer>
      </main>
    </div>
  );
};

export default App;
