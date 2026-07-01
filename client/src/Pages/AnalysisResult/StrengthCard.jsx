import { CheckCircle } from "lucide-react";

const StrengthCard = ({ strengths }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-green-600 text-xl font-semibold mb-4">
        Strengths
      </h2>

      <ul className="space-y-3">
        {strengths.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-3"
          >
            <CheckCircle
              className="text-green-500"
              size={18}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StrengthCard;