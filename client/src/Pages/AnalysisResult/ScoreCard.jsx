import React from "react";
import { Award } from "lucide-react";

const ScoreCard = ({ score }) => {
  const finalScore = Number(score) || 0;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (finalScore / 100) * circumference;

  // Determine feedback text and color based on score
  let feedback = "Poor Match";
  let colorClass = "text-rose-500";
  let ringColor = "url(#scoreGradientRose)";
  if (finalScore >= 80) {
    feedback = "Excellent Match";
    colorClass = "text-emerald-500";
    ringColor = "url(#scoreGradientEmerald)";
  } else if (finalScore >= 50) {
    feedback = "Good Match";
    colorClass = "text-amber-500";
    ringColor = "url(#scoreGradientAmber)";
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col items-center justify-center text-center shadow-md shadow-slate-100/50 h-full min-h-[300px]">
      <div className="flex items-center gap-2 mb-6">
        <Award className="h-5 w-5 text-indigo-500" />
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          ATS Fit Score
        </h2>
      </div>

      {/* SVG Circular Progress Gauge */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
          <defs>
            {/* Gradients */}
            <linearGradient id="scoreGradientEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="scoreGradientAmber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="scoreGradientRose" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
          </defs>

          {/* Underlay Track */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            className="stroke-slate-100"
            strokeWidth="10"
            fill="transparent"
          />

          {/* Glowing Animated Ring */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke={ringColor}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Text score centered inside circle */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-slate-800 tracking-tight">
            {finalScore}%
          </span>
          <span className={`text-[11px] font-bold uppercase tracking-wider mt-1 ${colorClass}`}>
            {feedback}
          </span>
        </div>
      </div>

      <p className="mt-6 text-sm font-semibold text-slate-500 leading-relaxed max-w-[200px]">
        Overall ATS rating matching modern recruitment filters.
      </p>
    </div>
  );
};

export default ScoreCard;