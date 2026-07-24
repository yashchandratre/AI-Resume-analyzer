import React from 'react';

export default function CoverLetterResult({ 
  onBack, 
  onCopy, 
  onDownloadPDF, 
  onDownloadDOCX, 
  onRegenerate,
  coverLetter 
}) {
  
  // Handlers for fallback display values
  const company = coverLetter?.companyName || "Your Target Company";
  const title = coverLetter?.jobTitle || "Job Position";
  const bodyText = coverLetter?.coverLetter || "No cover letter content loaded.";
  
  // Format generation date if available, otherwise fallback
  const displayDate = coverLetter?.createdAt 
    ? new Date(coverLetter.createdAt).toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : new Date().toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Navigation */}
        <button 
          onClick={onBack}
          className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <svg className="h-4 w-4 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Analysis
        </button>

        {/* Main Document Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-10 mb-6 text-left">
          
          {/* Document Meta Header */}
          <div className="border-b border-slate-100 pb-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Cover Letter</span>
                <h1 className="text-2xl font-bold text-slate-900 mt-1">{company}</h1>
                <p className="text-lg font-medium text-slate-650">{title}</p>
              </div>
              <div className="sm:text-right">
                <span className="inline-flex items-center rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500 ring-1 ring-inset ring-slate-600/10">
                  Generated on {displayDate}
                </span>
              </div>
            </div>
          </div>

          {/* Letter Body */}
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-705 leading-relaxed text-[15px] mb-4 whitespace-pre-line">
              {bodyText}
            </p>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          
          {/* Left/Primary Utilities */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Copy Button */}
            <button
              onClick={onCopy}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-98 cursor-pointer"
            >
              <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy
            </button>

            {/* Download PDF */}
            <button
              onClick={onDownloadPDF}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-98 cursor-pointer"
            >
              <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>

            {/* Download DOCX */}
            <button
              onClick={onDownloadDOCX}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-98 cursor-pointer"
            >
              <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download DOCX
            </button>
          </div>

          {/* Right Action: Regenerate */}
          <div className="w-full sm:w-auto">
            <button
              onClick={onRegenerate}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-98 cursor-pointer"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18" />
              </svg>
              Regenerate
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}