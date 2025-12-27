
import React from 'react';
import { FileText, Download, FileSpreadsheet, ChevronRight, Search } from 'lucide-react';

const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest">MIS Modules</span>
            <ChevronRight size={12} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Reports</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Reports</h2>
          <p className="text-slate-500 text-sm mt-1">Generated documents and data exports.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { title: 'Baseline QOL Summary', desc: 'Household socio-economic data export.', type: 'XLSX' },
          { title: 'Project Expenditure FY24', desc: 'Detailed budget vs actual spend report.', type: 'PDF' },
          { title: 'Ward Wise Development', desc: 'Spatial progress analysis report.', type: 'CSV' },
          { title: 'Beneficiary Distribution', desc: 'Demographic breakdown of scheme coverage.', type: 'PDF' }
        ].map((report, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-blue-300 transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{report.title}</h4>
                <p className="text-xs text-slate-500">{report.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase">{report.type}</span>
              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-all"><Download size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
