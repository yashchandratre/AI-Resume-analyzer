import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, AlertCircle } from "lucide-react";

import ScoreCard from "./ScoreCard";
import SummaryCard from "./SummaryCard";
import StrengthCard from "./StrengthCard";
import WeaknessCard from "./WeeknessCard";
import MissingSkillsCard from "./MissingSkillsCard";
import SuggestionsCard from "./SuggestionsCard";
import LoadingAnalysis from "./LoadingAnalysis";
import API from "../../services/authapi";
import { toast } from "sonner";

export default function AnalysisResult() {
    const { resumeId } = useParams();
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    // const fetchResume = async () => {
    //     try {
    //         setError("");
    //         const existingAnalysisResponse = await API.get(`/analysis/analysisresult/${resumeId}`);
    //         console.log(existingAnalysisResponse.data.analysis.length);

    //         if (existingAnalysisResponse.data.analysis.length > 0) {
    //             setAnalysis(existingAnalysisResponse.data.analysis);
    //         } else {
    //             const response = await API.post(`/analysis/${resumeId}`);
    //             logging.info("Analysis response:", response);
    //             setAnalysis(response.data.analysis);
    //             if (response.data?.analysis) {
    //                 const score = response.data.analysis.overallScore;

    //                 // Cache the analysis score in localStorage for Dashboard statistics
    //                 try {
    //                     const savedScores = JSON.parse(localStorage.getItem("resume_scores") || "{}");
    //                     savedScores[resumeId] = score;
    //                     localStorage.setItem("resume_scores", JSON.stringify(savedScores));
    //                 } catch (e) {
    //                     console.error("Failed to write score cache:", e);
    //                 }

    //             } else {
    //                 throw new Error("No analysis returned");
    //             }
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error(error.response?.data?.message || "Failed to analyze resume. Please try again.");
    //         setError(error.response?.data?.msg || "Failed to analyze resume. Please try again.");
    //         navigate("/");
    //     }
    // };

    const fetchResume = async () => {
        try {
            setError("");

            const response = await API.post(`/analysis/${resumeId}`);

            setAnalysis(response.data.analysis);

        } catch (error) {
            console.error(error);

            const message =
                error.response?.data?.message ||
                "Failed to analyze resume.";

            toast.error(message);

            setError(message);
        }
    };
    useEffect(() => {
        fetchResume();
    }, [resumeId]);

    if (!analysis && !error) {
        return <LoadingAnalysis />;
    }
    if (error) {
        return (
            <div className="max-w-3xl mx-auto py-16 px-4">
                <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 text-center shadow-sm">
                    <div className="h-12 w-12 rounded-2xl bg-white border border-rose-100 flex items-center justify-center text-rose-500 mx-auto mb-4">
                        <AlertCircle className="h-6 w-6" />
                    </div>
                    <h2 className="text-lg font-bold text-rose-900">Analysis Error</h2>
                    <p className="text-sm text-rose-700 mt-2">{error}</p>
                    <Link
                        to="/"
                        className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header / Nav details */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-650 hover:bg-slate-50 transition cursor-pointer"
                        title="Back to Dashboard"
                    >
                        <ArrowLeft className="h-4.5 w-4.5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-indigo-650" />
                            <span className="text-xs font-bold text-indigo-650 uppercase tracking-wider">AI Generated Report</span>
                        </div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                            ATS Score & Recommendations
                        </h1>
                    </div>
                </div>
            </div>

            {/* Score & Summary Grid */}
            <div className="grid lg:grid-cols-3 gap-6 items-stretch">
                <div className="lg:col-span-1 h-full">
                    <ScoreCard score={analysis.overallScore} />
                </div>
                <div className="lg:col-span-2 h-full">
                    <SummaryCard summary={analysis.summary} />
                </div>
            </div>

            {/* Strengths & Weaknesses side-by-side */}
            <div className="grid md:grid-cols-2 gap-6">
                <StrengthCard strengths={analysis.strengths || []} />
                <WeaknessCard weaknesses={analysis.weaknesses || []} />
            </div>

            {/* Missing Skills */}
            <MissingSkillsCard skills={analysis.missingSkills || []} />

            {/* Suggestions */}
            <SuggestionsCard suggestions={analysis.suggestions || []} />
        </div>
    );
}