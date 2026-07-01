import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ScoreCard from "./ScoreCard";
import SummaryCard from "./SummaryCard";
import StrengthCard from "./StrengthCard";
import WeaknessCard from "./WeeknessCard";
import MissingSkillsCard from "./MissingSkillsCard";
import SuggestionsCard from "./SuggestionsCard";
import API from "../../services/authapi";

export default function AnalysisResult() {
    const { resumeId } = useParams();

    const [analysis, setAnalysis] = useState(null);

    const fetchResume = async () => {
        try {
            const response = await API.post(`/analysis/${resumeId}`);

            console.log(response.data);

            setAnalysis(response.data.analysis);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchResume();
    }, [resumeId]);

    if (!analysis) {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading Analysis...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-6">

            <ScoreCard score={analysis.overallScore} />

            <SummaryCard summary={analysis.summary} />

            <div className="grid lg:grid-cols-2 gap-6">

                <StrengthCard strengths={analysis.strengths} />

                <WeaknessCard weaknesses={analysis.weaknesses} />

            </div>

            <MissingSkillsCard
                skills={analysis.missingSkills}
            />

            <SuggestionsCard
                suggestions={analysis.suggestions}
            />

        </div>
    );
}