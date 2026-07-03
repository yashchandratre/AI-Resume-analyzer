import { useEffect, useMemo, useState } from "react";

import AnalysisCard from "../../components/analysis/AnalysisCard";
import AnalysisStats from "../../components/analysis/AnalysisStatus";
import SearchBar from "../../components/analysis/SearchBar";
import EmptyAnalysis from "../../components/analysis/EmptyAnalysis";
import AnalysisSkeleton from "../../components/analysis/AnalysisSkeleton";
import API from "../../services/authapi";

export default function AnalysisHistory() {
    const [analysis, setAnalysis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchAnalysis();
    }, []);
    async function fetchAnalysis() {
        try {
            setLoading(true);
            const response = await API.get("/analysis/analysisresult");
            setAnalysis(response.data.analysisResults);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    const filteredAnalysis = useMemo(() => {
        return analysis.filter(item => {
            return item.resume.originalName
                .toLowerCase()
                .includes(search.toLowerCase());
        });
    }, [analysis, search]);
    if (loading) {
        return <AnalysisSkeleton />
    }
    return (
        <div className="space-y-8">
            <SearchBar
                value={search}
                onChange={setSearch}
            />
            <AnalysisStats
                analysis={analysis}
            />
            {
                filteredAnalysis.length === 0 ?
                    <EmptyAnalysis />
                    :
                    <div className="grid gap-6 lg:grid-cols-2">
                        {
                            filteredAnalysis.map(item => (
                                <AnalysisCard
                                    key={item._id}
                                    analysis={item}
                                />
                            ))
                        }
                    </div>
            }
        </div>
    )
}