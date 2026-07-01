import { XCircle } from "lucide-react";

const WeaknessCard = ({ weaknesses }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-red-600 text-xl font-semibold mb-4">
        Weaknesses
      </h2>

      <ul className="space-y-3">
        {weaknesses.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-3"
          >
            <XCircle
              className="text-red-500"
              size={18}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeaknessCard;