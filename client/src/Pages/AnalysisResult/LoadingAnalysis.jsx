const LoadingAnalysis = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-14 w-14 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>

        <h2 className="text-2xl font-semibold mt-6">
          AI is analyzing your resume...
        </h2>

        <p className="text-gray-500 mt-2">
          This usually takes a few seconds.
        </p>
      </div>
    </div>
  );
};

export default LoadingAnalysis;