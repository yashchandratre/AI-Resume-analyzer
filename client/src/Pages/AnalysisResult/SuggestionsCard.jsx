import { Lightbulb } from "lucide-react";

const SuggestionsCard = ({ suggestions }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-indigo-600 text-xl font-semibold mb-4">
        Suggestions
      </h2>

      <ul className="space-y-4">
        {suggestions.map((item, index) => (
          <li
            key={index}
            className="flex gap-3"
          >
            <Lightbulb
              className="text-indigo-500 mt-1"
              size={18}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsCard;