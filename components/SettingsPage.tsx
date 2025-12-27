
import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Plus, Edit2, Trash2, X, Check, Shield, 
  MapPin, Briefcase, Key, ChevronRight, UserCircle, Settings,
  Globe, Layout, FileText, Database, Lock, AlertCircle
} from 'lucide-react';
import { User, UserPermissions } from '../types';
import { apiService } from '../services/apiService';

const INITIAL_PERMISSIONS: UserPermissions = {
  CAN_ADD: false, CAN_UPDATE: false, CAN_DELETE: false, CAN_UPLOAD: false, SEE_REPORTS: false, ROP_EDIT: false,
  Supper_User: false, Finance_Officer: false, Dashboard: false, PowerBI: false, Setting: false, Other: false,
  BaselineQOL: false, Family_Development_Plan: false, Family_Approval_CRC: false, Family_Income: false, ROP: false, SWB_Families: false,
  TRACKING_SYSTEM: false, PLAN_INTERVENTION: false, access_loans: false, baseline_access: false, bank_account: false
};

const SettingsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'permissions'>('profile');
  
  const [formData, setFormData] = useState<Partial<User>>({
    ACTIVE: true,
    permissions: { ...INITIAL_PERMISSIONS }
  });

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    setLoading(true);
    const data = await apiService.getUsers();
    setUsers(data);
    setLoading(false);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData(JSON.parse(JSON.stringify(user))); // Deep clone
    setActiveTab('profile');
    setShowModal(true);
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm(`Permanently delete user account '${userId}' from Table_User?`)) {
      await apiService.deleteUser(userId);
      loadUsers();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.USER_ID || !formData.USER_FULL_NAME) {
      alert("Please fill in User ID and Full Name");
      return;
    }
    try {
      await apiService.saveUser(formData as User);
      setShowModal(false);
      loadUsers();
    } catch (err) {
      alert("Failed to save user data.");
    }
  };

  const togglePermission = (key: keyof UserPermissions) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions!,
        [key]: !prev.permissions![key]
      }
    }));
  };

  const filteredUsers = users.filter(u => 
    u.USER_FULL_NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.USER_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.DESIGNATION?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.REGION?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Settings size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Administrative Control</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Settings</h2>
          <p className="text-slate-500 text-sm mt-1">Configure user accounts, roles, and modular access for SJDA MIS.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Filter users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 w-full md:w-64 text-sm transition-all shadow-sm"
            />
          </div>
          <button 
            onClick={() => { 
              setEditingUser(null); 
              setFormData({ ACTIVE: true, USER_TYPE: 'Standard', permissions: { ...INITIAL_PERMISSIONS } }); 
              setActiveTab('profile');
              setShowModal(true); 
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            <Plus size={18} />
            New User
          </button>
        </div>
      </div>

      {/* User Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Account Information</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Type & Designation</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Regional Details</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-20 text-center"><div className="flex flex-col items-center gap-2 text-slate-400"><Database className="animate-pulse" size={32}/><span className="font-medium">Fetching Table_User records...</span></div></td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-20 text-center text-slate-400 font-medium">No records found matching your filter.</td></tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.USER_ID} className="group hover:bg-slate-50/80 transition-all">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg border-2 shadow-sm ${user.permissions.Supper_User ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                        {user.USER_FULL_NAME.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                          {user.USER_FULL_NAME}
                          {user.permissions.Supper_User && <Shield size={14} className="text-indigo-500" />}
                        </div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">{user.USER_ID}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded mb-1 tracking-wider">
                      <Briefcase size={10} /> {user.USER_TYPE}
                    </div>
                    <div className="text-sm font-semibold text-slate-700">{user.DESIGNATION}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                      <Globe size={14} className="text-slate-400" />
                      {user.REGION || 'N/A'}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{user.AREA || '-'} {user.SECTION ? `/ ${user.SECTION}` : ''}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${user.ACTIVE ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${user.ACTIVE ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      {user.ACTIVE ? 'ACTIVE' : 'INACTIVE'}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleEdit(user)} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Edit Profile">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(user.USER_ID)} className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" title="Delete User">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern CRUD Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-8 duration-300">
            {/* Modal Header */}
            <div className="px-10 py-8 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <div className="p-2.5 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                    {editingUser ? <Edit2 size={24} /> : <Plus size={24} />}
                  </div>
                  {editingUser ? 'Update Existing User' : 'Register New User'}
                </h3>
                <p className="text-slate-500 text-sm mt-1 ml-14">Configure profile data and granular system permissions for Table_User.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-2xl transition-all"><X size={24} /></button>
            </div>

            {/* Modal Tabs */}
            <div className="px-10 flex border-b border-slate-100 bg-white">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`px-8 py-4 text-sm font-bold tracking-tight transition-all relative ${activeTab === 'profile' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                1. Account Profile
                {activeTab === 'profile' && <div className="absolute bottom-0 left-8 right-8 h-1 bg-blue-600 rounded-t-full" />}
              </button>
              <button 
                onClick={() => setActiveTab('permissions')}
                className={`px-8 py-4 text-sm font-bold tracking-tight transition-all relative ${activeTab === 'permissions' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                2. Functional Permissions
                {activeTab === 'permissions' && <div className="absolute bottom-0 left-8 right-8 h-1 bg-blue-600 rounded-t-full" />}
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto">
              <div className="p-10">
                {activeTab === 'profile' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Basic Info Section */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-2 mb-6 text-slate-900">
                        <UserCircle className="text-blue-600" size={20} />
                        <span className="font-bold uppercase text-xs tracking-widest">Identity & Credentials</span>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Unique User ID</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                              type="text" required disabled={!!editingUser}
                              value={formData.USER_ID}
                              onChange={e => setFormData(p => ({...p, USER_ID: e.target.value}))}
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 disabled:opacity-60 transition-all"
                              placeholder="e.g. jdoe123"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">System Password</label>
                          <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                              type="password" required={!editingUser}
                              value={formData.PASSWORD}
                              onChange={e => setFormData(p => ({...p, PASSWORD: e.target.value}))}
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Full Display Name</label>
                        <input 
                          type="text" required 
                          value={formData.USER_FULL_NAME}
                          onChange={e => setFormData(p => ({...p, USER_FULL_NAME: e.target.value}))}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                          placeholder="Johnathan Doe"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Designation</label>
                          <input 
                            type="text" 
                            value={formData.DESIGNATION}
                            onChange={e => setFormData(p => ({...p, DESIGNATION: e.target.value}))}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                            placeholder="Executive Officer"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">User Class Type</label>
                          <select 
                            value={formData.USER_TYPE}
                            onChange={e => setFormData(p => ({...p, USER_TYPE: e.target.value}))}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                          >
                            <option value="Standard">Standard User</option>
                            <option value="SuperUser">Super User</option>
                            <option value="Staff">Field Staff</option>
                            <option value="Finance">Finance Dept</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Org Structure Section */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-2 mb-6 text-slate-900">
                        <MapPin className="text-blue-600" size={20} />
                        <span className="font-bold uppercase text-xs tracking-widest">Administrative Mapping</span>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Region</label>
                          <input type="text" value={formData.REGION} onChange={e => setFormData(p => ({...p, REGION: e.target.value}))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm" placeholder="North Zone" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Area</label>
                          <input type="text" value={formData.AREA} onChange={e => setFormData(p => ({...p, AREA: e.target.value}))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm" placeholder="Urban Center" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Section</label>
                          <input type="text" value={formData.SECTION} onChange={e => setFormData(p => ({...p, SECTION: e.target.value}))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm" placeholder="Sector A" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Reports To</label>
                          <input type="text" value={formData.REPORT_TO} onChange={e => setFormData(p => ({...p, REPORT_TO: e.target.value}))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm" placeholder="Supervisor ID" />
                        </div>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900 text-sm">Account Activation</p>
                          <p className="text-xs text-slate-500">Allow user to authenticate with these credentials.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={formData.ACTIVE} onChange={e => setFormData(p => ({...p, ACTIVE: e.target.checked}))} className="sr-only peer" />
                          <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-10">
                    <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-700">
                      <AlertCircle className="shrink-0 mt-0.5" size={20} />
                      <p className="text-sm"><strong>Important:</strong> Changes to permissions take effect on the next user login. Ensure the user is assigned to the correct Regional and Financial groups to avoid access conflicts.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {/* Permission Group: Core */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                          <Lock className="text-blue-600" size={16} />
                          <span className="font-bold text-xs text-slate-900 uppercase tracking-widest">Core Actions</span>
                        </div>
                        <div className="space-y-3">
                          {['CAN_ADD', 'CAN_UPDATE', 'CAN_DELETE', 'CAN_UPLOAD', 'SEE_REPORTS', 'ROP_EDIT'].map(k => (
                            <PermissionToggle key={k} label={k} checked={!!formData.permissions?.[k as keyof UserPermissions]} onChange={() => togglePermission(k as keyof UserPermissions)} />
                          ))}
                        </div>
                      </div>

                      {/* Permission Group: Modules */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                          <Layout className="text-emerald-600" size={16} />
                          <span className="font-bold text-xs text-slate-900 uppercase tracking-widest">App Modules</span>
                        </div>
                        <div className="space-y-3">
                          {['Dashboard', 'PowerBI', 'Setting', 'Other', 'TRACKING_SYSTEM', 'PLAN_INTERVENTION'].map(k => (
                            <PermissionToggle key={k} label={k} checked={!!formData.permissions?.[k as keyof UserPermissions]} onChange={() => togglePermission(k as keyof UserPermissions)} />
                          ))}
                        </div>
                      </div>

                      {/* Permission Group: Operations */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                          <FileText className="text-indigo-600" size={16} />
                          <span className="font-bold text-xs text-slate-900 uppercase tracking-widest">Operations</span>
                        </div>
                        <div className="space-y-3">
                          {['BaselineQOL', 'Family_Development_Plan', 'Family_Approval_CRC', 'Family_Income', 'ROP', 'SWB_Families'].map(k => (
                            <PermissionToggle key={k} label={k} checked={!!formData.permissions?.[k as keyof UserPermissions]} onChange={() => togglePermission(k as keyof UserPermissions)} />
                          ))}
                        </div>
                      </div>

                      {/* Permission Group: Security */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                          <Shield className="text-rose-600" size={16} />
                          <span className="font-bold text-xs text-slate-900 uppercase tracking-widest">Security & Fin</span>
                        </div>
                        <div className="space-y-3">
                          {['Supper_User', 'Finance_Officer', 'access_loans', 'baseline_access', 'bank_account'].map(k => (
                            <PermissionToggle key={k} label={k} checked={!!formData.permissions?.[k as keyof UserPermissions]} onChange={() => togglePermission(k as keyof UserPermissions)} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="px-10 py-8 bg-slate-50 border-t border-slate-200 flex justify-end gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-8 py-3 text-slate-500 font-bold hover:bg-slate-200 rounded-2xl transition-all">Discard Changes</button>
                <button type="submit" className="px-12 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2">
                  <Check size={20} />
                  {editingUser ? 'Save Table_User Update' : 'Commit New Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface PermissionToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const PermissionToggle: React.FC<PermissionToggleProps> = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl cursor-pointer hover:border-blue-200 hover:shadow-sm transition-all group">
    <div className="relative">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
      <div className={`w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${checked ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-slate-400'}`}>
        {checked && <Check size={12} className="text-white" strokeWidth={3} />}
      </div>
    </div>
    <span className="text-[11px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors uppercase tracking-tight">
      {label.replace(/_/g, ' ')}
    </span>
  </label>
);

export default SettingsPage;
