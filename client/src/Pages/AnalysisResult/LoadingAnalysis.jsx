import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LoadingAnalysis() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
      {/* Top Header Placeholder */}
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-slate-200" />
        <div className="space-y-2">
          <div className="h-3.5 w-32 bg-slate-200 rounded-full" />
          <div className="h-5 w-64 bg-slate-200 rounded-full" />
        </div>
      </div>

      {/* Hero Processing Banner */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 animate-bounce">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">
              AI Analysis in Progress
            </h3>
            <p className="text-xs font-semibold text-slate-400 mt-1">
              Please wait while our algorithms process your resume details...
            </p>
          </div>
        </div>
        <div className="w-full sm:w-48 h-2 bg-slate-100 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-1/3 bg-indigo-600 rounded-full"
          />
        </div>
      </div>

      {/* Score & Summary Grid Skeletons */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Score circular gauge skeleton */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col items-center justify-center min-h-[300px] shadow-sm">
          <div className="h-4 w-24 bg-slate-200 rounded-full mb-6" />
          <div className="w-36 h-36 rounded-full border-[10px] border-slate-100 flex items-center justify-center relative">
            <div className="h-10 w-16 bg-slate-200 rounded-lg" />
          </div>
          <div className="h-4 w-36 bg-slate-200 rounded-full mt-6" />
        </div>

        {/* Professional summary text placeholder */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[300px]">
          <div className="space-y-4">
            <div className="h-4 w-40 bg-slate-200 rounded-full mb-6" />
            <div className="h-3 w-full bg-slate-200 rounded-full" />
            <div className="h-3 w-11/12 bg-slate-200 rounded-full" />
            <div className="h-3 w-full bg-slate-200 rounded-full" />
            <div className="h-3 w-10/12 bg-slate-200 rounded-full" />
            <div className="h-3 w-full bg-slate-200 rounded-full" />
          </div>
          <div className="h-3 w-1/3 bg-slate-100 rounded-full mt-6" />
        </div>
      </div>

      {/* Strengths & Weaknesses placeholders */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="h-4 w-32 bg-slate-200 rounded-full mb-6" />
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex gap-3">
              <div className="h-5 w-5 rounded-full bg-slate-200 flex-shrink-0" />
              <div className="h-3 w-5/6 bg-slate-200 rounded-full mt-1" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="h-4 w-40 bg-slate-200 rounded-full mb-6" />
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex gap-3">
              <div className="h-5 w-5 rounded-full bg-slate-200 flex-shrink-0" />
              <div className="h-3 w-4/6 bg-slate-200 rounded-full mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}