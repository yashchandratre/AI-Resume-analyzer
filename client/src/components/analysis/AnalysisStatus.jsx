export default function AnalysisStats({analysis}){
    const total=analysis.length;
    const average=
        total===0?
        0
        :
        Math.round(
            analysis.reduce(
                (sum,item)=>
                sum+
                item.analysisData.overallScore,
                0
            )/total
        );
    const best=
        total===0?
        0
        :
        Math.max(
            ...analysis.map(
                item=>item.analysisData.overallScore
            )
        );
    return(
        <div className="grid gap-6 md:grid-cols-3">
            <Card
                title="Total Analysis"
                value={total}
            />
            <Card
                title="Average ATS"
                value={average}
            />
            <Card
                title="Best Score"
                value={best}
            />
        </div>
    )
}

function Card({title,value}){
    return(
        <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-gray-500">
                {title}
            </p>
            <h2 className="mt-2 text-4xl font-bold text-indigo-600">
                {value}
            </h2>
        </div>
    )
}