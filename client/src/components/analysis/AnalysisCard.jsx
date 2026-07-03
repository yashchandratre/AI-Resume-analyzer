import { Link } from "react-router-dom";

export default function AnalysisCard({analysis}){

    return(
        <div className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition">
            <h2 className="font-bold text-lg">
                {analysis.resume.originalName}
            </h2>
            <div className="mt-4">
                <span className="text-sm text-gray-500">
                    ATS Score
                </span>
                <h1 className="text-5xl font-black text-indigo-600">
                    {analysis.analysisData.overallScore}
                </h1>
            </div>
            <div className="mt-5">
                <h3 className="font-semibold">
                    Strengths
                </h3>
                <ul className="mt-2 space-y-1">
                    {
                        analysis.analysisData.strengths
                        ?.slice(0,3)
                        .map((item,index)=>(
                            <li key={index}>
                                • {item}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="mt-6">
                <Link
                    to={`/analysis/${analysis.resume._id}`}
                    className="rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
                >
                    View Report
                </Link>
            </div>
        </div>
    )
}