const ScoreCard = ({ score }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        ATS Score
      </h2>

      <div className="w-36 h-36 rounded-full border-8 border-indigo-600 flex items-center justify-center">
        <span className="text-4xl font-bold text-indigo-600">
          {score}
        </span>
      </div>

      <p className="mt-4 text-gray-500">
        Overall Resume Score
      </p>
    </div>
  );
};

export default ScoreCard;