import { useRef, useState } from "react";
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
      const response = await API.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
      className="mx-auto w-full max-w-3xl rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
    >
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex min-h-72 flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 text-center transition ${
          isDragging ? "border-teal-500 bg-teal-50" : "border-slate-300 bg-slate-50"
        }`}
      >
        <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-2xl text-teal-700 shadow-sm">
          ^
        </div>
        <h2 className="mt-5 text-xl font-semibold text-slate-950">Upload Resume</h2>
        <p className="mt-2 max-w-md text-sm text-slate-500">
          Drag and drop your resume here, or choose a file from your device.
        </p>
        <p className="mt-1 text-xs font-medium text-slate-500">PDF or DOCX, maximum 5MB.</p>

        <input
          ref={inputRef}
          id="resume"
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={(event) => applyFile(event.target.files?.[0])}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-6 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Choose File
        </button>

        {file && (
          <p className="mt-4 max-w-full truncate rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-700">
            {file.name}
          </p>
        )}

        {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
        {success && <p className="mt-4 text-sm font-medium text-emerald-700">✓ {success}.</p>}
      </div>

      <button
        type="button"
        disabled={!file || isUploading}
        onClick={handleUpload}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {isUploading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
        {isUploading ? "Uploading..." : "Upload Resume"}
      </button>
    </section>
  );
}
