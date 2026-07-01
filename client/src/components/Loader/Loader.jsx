import React from "react";

/**
 * @param {string} size - size of the spinner (sm, md, lg, xl)
 * @param {string} color - border color class
 * @param {boolean} fullPage - if true, centers spinner in a fixed overlay
 * @param {string} text - optional loading text
 */
export default function Loader({ 
  size = "md", 
  color = "border-blue-600", 
  fullPage = false, 
  text = "" 
}) {
  // Size Mapping
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} ${color} animate-spin rounded-full border-t-transparent`}
        role="status"
        aria-label="loading"
      />
      {text && (
        <p className="text-sm font-medium animate-pulse text-gray-500 dark:text-gray-400">
          {text}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/70 backdrop-blur-sm dark:bg-gray-900/70">
        {spinner}
      </div>
    );
  }

  return spinner;
}