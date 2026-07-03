import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, CalendarDays, Trash2, Sparkles, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../services/authapi";

const Resume = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  const [resumes, setResumes] = useState([]);

  const fetchResumes = useCallback(async () => {
    try {
      const response = await API.get("/resume/resumes", { withCredentials: true });
      setResumes(response.data.resumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      setResumes([]);
    }
  }, []);

  const onAnalyzeResume = async (resumeId) => {
    try {

      navigate(`/analysis/${resumeId}`,);
    } catch (error) {
      console.log("FULL ERROR");
      console.error(error);
    }
  };

  const onDeleteResume = async (resumeId) => {
    try {
      await API.delete(`/resume/${resumeId}`, { withCredentials: true });
      setResumes((prevResumes) => prevResumes.filter((resume) => resume._id !== resumeId));
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      fetchResumes();
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [fetchResumes]);

  // Fetch scores cached during analysis
  const savedScores = JSON.parse(localStorage.getItem("resume_scores") || "{}");

  const getScoreBadge = (resumeId) => {
    const score = savedScores[resumeId];
    if (score === undefined) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
          Not Analyzed
        </span>
      );
    }

    const numScore = Number(score);
    if (numScore >= 80) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 shadow-sm">
          ATS: {numScore}%
        </span>
      );
    } else if (numScore >= 50) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700 shadow-sm">
          ATS: {numScore}%
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-100 px-2.5 py-1 text-xs font-bold text-rose-700 shadow-sm">
          ATS: {numScore}%
        </span>
      );
    }
  };

  if (!resumes.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-16 px-4 text-center shadow-sm"
      >
        <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
          <FileText className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">
          No Resumes Found
        </h2>
        <p className="mt-1 text-sm text-slate-500 max-w-sm">
          You haven't uploaded any resumes yet. Upload your first document to run the analysis.
        </p>
      </motion.div>
    );
  }

  return (
    <div id="resumes" className="mt-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Your Resumes
        </h2>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {resumes.length} Document{resumes.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resumes.map((resume, index) => (
          <motion.div
            key={resume._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-md shadow-slate-100/50 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/50 transition-shadow"
          >
            <div>
              {/* File Icon & Badge */}
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                  <FileText className="h-5 w-5" />
                </div>
                {getScoreBadge(resume._id)}
              </div>

              {/* Resume Name */}
              <h3 className="mt-4 truncate text-base font-bold text-slate-800" title={resume.originalName}>
                {resume.originalName}
              </h3>

              {/* Upload Date & Metadata */}
              <div className="mt-3 space-y-2 border-b border-slate-50 pb-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <CalendarDays className="h-4 w-4" />
                  <span>
                    {new Date(resume.uploadedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-medium text-slate-400">
                  <span>Size: {(resume.fileSize / 1024).toFixed(1)} KB</span>
                  <span className="uppercase">{(resume.mimeType.split("/")[1]?.length < 4 ? resume.mimeType.split("/")[1] : "DOCX") || "DOCX"}</span>

                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onAnalyzeResume(resume._id)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-750 cursor-pointer shadow-sm shadow-indigo-600/10"
              >
                <Sparkles className="h-4 w-4" />
                Analyze
              </button>

              <button
                onClick={() => onDeleteResume(resume._id)}
                className="rounded-xl border border-rose-250 p-2.5 text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                title="Delete Resume"
              >
                <Trash2 className="h-4.5 w-4.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Resume;
