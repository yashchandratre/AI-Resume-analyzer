const SummaryCard = ({ summary }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Professional Summary
      </h2>

      <p className="text-gray-600 leading-7">
        {summary}
      </p>
    </div>
  );
};

export default SummaryCard;