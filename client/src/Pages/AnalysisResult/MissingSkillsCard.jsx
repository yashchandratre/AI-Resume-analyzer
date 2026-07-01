import { BadgeAlert } from "lucide-react";

const MissingSkillsCard = ({ skills }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-yellow-600 text-xl font-semibold mb-4">
        Missing Skills
      </h2>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full"
          >
            <BadgeAlert
              className="inline mr-2"
              size={16}
            />
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MissingSkillsCard;