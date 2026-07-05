import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, File, AlertCircle, CheckCircle, Sparkles } from "lucide-react";
import API from "../../services/authapi";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function validateResumeFile(file) {
  if (!file) return "Please choose a resume file";
  if (!ACCEPTED_MIME_TYPES.includes(file.type)) return "Only PDF and DOCX files are allowed";
  if (file.size > MAX_FILE_SIZE) return "File size must be 5MB or less";
  return "";
}

export default function ResumeUploadCard({ onUploadSuccess }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const applyFile = (selectedFile) => {
    if (!selectedFile) return;
    const validationError = validateResumeFile(selectedFile);
    setSuccess("");
    setError(validationError);
    setFile(validationError ? null : selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    applyFile(event.dataTransfer.files?.[0]);
  };

  const handleUpload = async () => {
    const validationError = validateResumeFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setIsUploading(true);
      setError("");
      setSuccess("");
      const startTime = performance.now();
      const response = await API.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const endTime = performance.now();
      console.log(`Resume upload took ${(endTime - startTime).toFixed(2)} ms`);

      setSuccess(response.data?.message || "Resume uploaded successfully");
      setFile(null);
      onUploadSuccess?.();
      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      setError(err.response?.data?.message || "Unable to upload resume");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section
      id="upload"
      className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/40 mb-10"
    >
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative flex min-h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-all cursor-pointer ${
          isDragging
            ? "border-indigo-500 bg-indigo-50/40"
            : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-350"
        }`}
        onClick={() => inputRef.current?.click()}
      >
        {/* Animated Upload Icon */}
        <motion.div
          animate={isUploading ? { y: [0, -10, 0] } : {}}
          transition={isUploading ? { repeat: Infinity, duration: 1.5 } : {}}
          className={`grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-md text-3xl mb-5 text-indigo-600 border border-slate-100`}
        >
          <UploadCloud className="h-7 w-7" />
        </motion.div>

        <h2 className="text-lg font-bold text-slate-900">Upload Your Resume</h2>
        <p className="mt-2 max-w-sm text-sm text-slate-500 font-medium">
          Drag and drop your document here, or click to browse files
        </p>
        <p className="mt-1 text-xs text-slate-400 font-semibold">
          Supports PDF or DOCX up to 5MB.
        </p>

        <input
          ref={inputRef}
          id="resume"
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={(event) => applyFile(event.target.files?.[0])}
        />

        <AnimatePresence>
          {file && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-6 flex items-center gap-2 max-w-full truncate rounded-xl bg-white border border-slate-100 px-4 py-2.5 shadow-sm text-sm font-semibold text-slate-700"
              onClick={(e) => e.stopPropagation()} // Prevent double trigger
            >
              <File className="h-4.5 w-4.5 text-indigo-500 flex-shrink-0" />
              <span className="truncate">{file.name}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-rose-600"
              onClick={(e) => e.stopPropagation()}
            >
              <AlertCircle className="h-4.5 w-4.5" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-emerald-600"
              onClick={(e) => e.stopPropagation()}
            >
              <CheckCircle className="h-4.5 w-4.5" />
              <span>{success}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={file && !isUploading ? { scale: 1.01 } : {}}
        whileTap={file && !isUploading ? { scale: 0.99 } : {}}
        type="button"
        disabled={!file || isUploading}
        onClick={handleUpload}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/10 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none cursor-pointer"
      >
        {isUploading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Processing & Uploading...
          </>
        ) : (
          <>
            <Sparkles className="h-4.5 w-4.5" />
            Upload & Analyze Resume
          </>
        )}
      </motion.button>
    </section>
  );
}
