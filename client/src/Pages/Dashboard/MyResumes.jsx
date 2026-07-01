import { FileText, CalendarDays, Trash2, Sparkles } from "lucide-react";

const MyResumes = ({ resumes = [], onAnalyze, onDelete }) => {
  if (!resumes.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white py-16">
        <FileText className="h-12 w-12 text-gray-400" />
        <h2 className="mt-4 text-xl font-semibold text-gray-700">
          No resumes uploaded
        </h2>
        <p className="mt-2 text-gray-500">
          Upload your first resume to start analyzing it.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        My Uploaded Resumes
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {resumes.map((resume) => (
          <div
            key={resume._id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {/* File Icon */}
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Uploaded
              </span>
            </div>

            {/* Resume Name */}
            <h3 className="mt-5 truncate text-lg font-semibold text-gray-800">
              {resume.originalName}
            </h3>

            {/* Upload Date */}
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays className="h-4 w-4" />
              <span>
                {new Date(resume.uploadedAt).toLocaleDateString()}
              </span>
            </div>

            {/* File Size */}
            <p className="mt-2 text-sm text-gray-500">
              Size: {(resume.fileSize / 1024).toFixed(2)} KB
            </p>

            {/* File Type */}
            <p className="text-sm text-gray-500">
              Type: {resume.mimeType}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => onAnalyze(resume._id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                <Sparkles className="h-4 w-4" />
                Analyze
              </button>

              <button
                onClick={() => onDelete(resume._id)}
                className="rounded-lg border border-red-300 p-2 text-red-600 transition hover:bg-red-50"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyResumes;
