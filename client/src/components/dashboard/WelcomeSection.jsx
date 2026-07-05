import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Award, Star, CheckCircle, Sparkles } from "lucide-react";
import API from "../../services/authapi";

export default function WelcomeSection({ user, resumes = [], scores = {} }) {
  const displayName = user?.fname || user?.name || "User";

  const savedScores = scores.scores || [];
  const activeResumeIds = resumes.map((r) => r._id);
  const activeScores = savedScores.map(item => item.overallScore);

  const analysesCompleted = activeScores.length;

  const highestScore =
    analysesCompleted > 0
      ? Math.max(...activeScores)
      : 0;

  const averageATS =
    analysesCompleted > 0
      ? Math.round(
        activeScores.reduce((sum, score) => sum + score, 0) /
        analysesCompleted
      )
      : 0;

  const stats = [
    {
      label: "Total Resumes",
      value: activeResumeIds.length,
      icon: FileText,
      color: "from-blue-500 to-indigo-500",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Average ATS Score",
      value: averageATS > 0 ? `${averageATS}%` : "Pending",
      icon: Award,
      color: "from-indigo-500 to-purple-500",
      bgLight: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      label: "Highest Score",
      value: highestScore > 0 ? `${highestScore}%` : "Pending",
      icon: Star,
      color: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      label: "Analyses Completed",
      value: `${analysesCompleted} / ${activeResumeIds.length}`,
      icon: CheckCircle,
      color: "from-emerald-500 to-teal-500",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
  ];


  return (
    <section id="dashboard" className="mb-10">
      {/* Hero Welcome banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-indigo-900 p-8 sm:p-10 text-white mb-8 shadow-xl shadow-indigo-950/20 border border-slate-800">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-80 h-80 opacity-40 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-indigo-500 blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/25 border border-indigo-400/20 text-xs font-semibold text-indigo-200 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
            <span>AI Resume Intelligence</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Welcome back, {displayName}
          </h1>
          <p className="mt-3 text-base text-slate-300 leading-relaxed font-medium">
            Analyze your resume using industry-standard ATS algorithms, reveal missing keywords, and get custom recommendations to polish your professional profile.
          </p>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-100/50 flex items-center justify-between transition-shadow hover:shadow-lg hover:shadow-slate-200/50"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                {stat.value}
              </h3>
            </div>
            <div className={`p-3.5 rounded-xl ${stat.bgLight} ${stat.textColor}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
