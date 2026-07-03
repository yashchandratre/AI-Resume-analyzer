import React from "react";
import { CheckCircle2, Award } from "lucide-react";
import { motion } from "framer-motion";

const StrengthCard = ({ strengths = [] }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-md shadow-slate-100/50">
      <div className="flex items-center gap-2 mb-6">
        <Award className="h-5 w-5 text-emerald-500" />
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Key Strengths
        </h2>
      </div>

      {strengths.length === 0 ? (
        <p className="text-sm text-slate-400 font-medium">No distinct strengths identified.</p>
      ) : (
        <ul className="space-y-4">
          {strengths.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3.5"
            >
              <CheckCircle2 className="text-emerald-500 h-5 w-5 mt-0.5 flex-shrink-0" />
              <span className="text-slate-700 text-sm font-medium leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StrengthCard;