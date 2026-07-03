import React from "react";
import { Compass } from "lucide-react";

const SummaryCard = ({ summary }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-md shadow-slate-100/50 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Compass className="h-5 w-5 text-indigo-500" />
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            Professional Profile Analysis
          </h2>
        </div>

        <p className="text-slate-655 text-sm sm:text-base leading-8 font-medium">
          {summary || "No professional profile summary provided."}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400 font-semibold">
        <span>Model: GPT/Claude Optimized</span>
        <span>Analysis Context: General Fit</span>
      </div>
    </div>
  );
};

export default SummaryCard;