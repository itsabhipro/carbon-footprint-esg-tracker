"use client";

import React, { useState } from 'react';
import { FileSpreadsheet, FileText, Download, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingExcel, setDownloadingExcel] = useState(false);

  const triggerDownload = async (type: 'pdf' | 'excel') => {
    const setLoader = type === 'pdf' ? setDownloadingPdf : setDownloadingExcel;
    setLoader(true);

    try {
      // Connects directly to the native Next.js API endpoint router vectors
      const response = await fetch(`/api/reports/${type}`);
      if (!response.ok) throw new Error('Download execution failed');
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = type === 'pdf' ? 'ESG_Sustainability_Audit.pdf' : 'ESG_Carbon_Footprint_Report.xlsx';
      
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error(`Error triggering ${type} report stream:`, error);
    } finally {
      setLoader(false);
    }
  };

  const previewData = [
    { type: 'Corporate Disclosure PDF', scope: 'Scope 1, 2, 3 Matrix', size: '2.4 MB', status: 'Audit Ready' },
    { type: 'Financial Ledger Spreadsheet', scope: 'Granular Energy Variables', size: '840 KB', status: 'Compliant' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Compliance & Reporting</h1>
        <p className="text-sm text-slate-500">Export audit-ready multi-jurisdictional disclosures matching CSRD and GRI frameworks.</p>
      </div>

      {/* Modern Control Deck Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PDF Download Wrapper Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:border-slate-200 transition-all">
          <div className="flex gap-4 items-start">
            <div className="p-3.5 bg-rose-50 text-rose-600 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Executive Sustainability Summary</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Includes executive dashboard overviews, country profile scores, and official GHG protocol emissions breakdowns formatted for presentation.
              </p>
            </div>
          </div>
          <button
            onClick={() => triggerDownload('pdf')}
            disabled={downloadingPdf}
            className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
          >
            {downloadingPdf ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Compiling Document Stream...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Download Audit PDF (.PDF)
              </>
            )}
          </button>
        </div>

        {/* Excel Download Wrapper Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:border-slate-200 transition-all">
          <div className="flex gap-4 items-start">
            <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Granular Carbon Accounting Ledger</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Complete quantitative data arrays containing regional intensity metrics, raw asset kWh entries, and multi-country operational variables.
              </p>
            </div>
          </div>
          <button
            onClick={() => triggerDownload('excel')}
            disabled={downloadingExcel}
            className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
          >
            {downloadingExcel ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Structuring Cell Data...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Download Complete Spreadsheet (.XLSX)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Internal Live File Status Log */}
      <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6">
        <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-emerald-500" /> Compiled Generation Logs
        </h4>
        <div className="overflow-hidden bg-white rounded-xl border border-slate-100 shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100 font-bold text-slate-400 uppercase font-mono">
              <tr>
                <th className="p-4">Document Type</th>
                <th className="p-4">Data Coverage</th>
                <th className="p-4">Payload Size</th>
                <th className="p-4 text-right">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
              {previewData.map((file, i) => (
                <tr key={i} className="hover:bg-slate-50/30">
                  <td className="p-4 font-semibold text-slate-900">{file.type}</td>
                  <td className="p-4 font-mono">{file.scope}</td>
                  <td className="p-4 text-slate-400">{file.size}</td>
                  <td className="p-4 text-right flex items-center justify-end gap-1.5 text-emerald-600 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> {file.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
