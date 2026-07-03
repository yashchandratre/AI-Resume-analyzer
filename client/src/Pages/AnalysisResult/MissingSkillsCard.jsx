import React from "react";
import { AlertCircle, Tag } from "lucide-react";
import { motion } from "framer-motion";

const MissingSkillsCard = ({ skills = [] }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-md shadow-slate-100/50">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="h-5 w-5 text-amber-500" />
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Missing Keywords & Skills
        </h2>
      </div>

      {skills.length === 0 ? (
        <p className="text-sm text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 px-4 py-3 rounded-2xl inline-block">
          ✓ Awesome! No critical missing skills or keywords detected for this profile.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill, index) => (
            <motion.span
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-3.5 py-1.5 rounded-xl text-xs font-bold text-amber-700 hover:bg-amber-100/60 transition shadow-sm"
            >
              <Tag className="h-3.5 w-3.5 text-amber-500" />
              <span>{skill}</span>
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MissingSkillsCard;