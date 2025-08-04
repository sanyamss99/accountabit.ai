import React, { useState } from 'react';
import { Download, Users, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { exportEmailsCSV } from '../lib/supabase';

export default function AdminPanel() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleExportCSV = async () => {
    setIsExporting(true);
    setExportStatus('idle');
    setErrorMessage('');

    const result = await exportEmailsCSV();

    if (result.success) {
      setExportStatus('success');
      setTimeout(() => setExportStatus('idle'), 3000);
    } else {
      setExportStatus('error');
      setErrorMessage(result.error || 'Export failed');
    }

    setIsExporting(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 min-w-80">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Admin Panel</h3>
            <p className="text-sm text-gray-500">Export email signups</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleExportCSV}
            disabled={isExporting}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export CSV
              </>
            )}
          </button>

          {exportStatus === 'success' && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-2 rounded-lg text-sm">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>CSV exported successfully!</span>
            </div>
          )}

          {exportStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded-lg text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="text-xs text-gray-500 text-center">
            <FileText className="w-3 h-3 inline mr-1" />
            Downloads all email signups with timestamps
          </div>
        </div>
      </div>
    </div>
  );
}