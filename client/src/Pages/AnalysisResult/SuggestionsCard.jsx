import React from "react";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const SuggestionsCard = ({ suggestions = [] }) => {
  const renderBoldText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index}>
            {part.slice(2, -2)}
          </strong>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-md shadow-slate-100/50">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="h-5 w-5 text-indigo-500" />
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Actionable Suggestions
        </h2>
      </div>

      {suggestions.length === 0 ? (
        <p className="text-sm text-slate-400 font-medium">No custom suggestions available.</p>
      ) : (
        <ul className="space-y-5">
          {suggestions.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/40 hover:bg-slate-50 transition"
            >
              <div className="h-7 w-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-650 shrink-0 mt-0.5 border border-indigo-100">
                <Lightbulb className="h-4 w-4" />
              </div>
              <span className="text-slate-705 text-sm font-medium leading-relaxed">
                {renderBoldText(item)}
              </span>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionsCard;