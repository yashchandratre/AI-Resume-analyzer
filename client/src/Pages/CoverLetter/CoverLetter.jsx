import React, { useState, useEffect, useRef } from 'react';
import CoverLetterModal from './CoverLetterModal';
import CoverLetterResult from './CoverLetterResult';
import API from '../../services/authapi';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function CoverLetter() {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const hasChecked = useRef(false);

  // 1. Check MongoDB for existing cover letter on mount
  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    const checkExistingCoverLetter = async () => {
      try {
        setIsChecking(true);
        setError('');
        
        // GET /api/cover-letter/:resumeId
        const response = await API.get(`/cover-letter/${resumeId}`);
        
        if (response.data.success && response.data.exists) {
          setCoverLetter(response.data.coverLetter);
        } else {
          // If not exists, open the modal
          setIsModalOpen(true);
        }
      } catch (err) {
        console.error("Error checking existing cover letter:", err);
        const errMsg = err.response?.data?.error || "Error checking existing cover letter.";
        setError(errMsg);
        toast.error(errMsg);
      } finally {
        setIsChecking(false);
      }
    };

    checkExistingCoverLetter();
  }, [resumeId]);

  // 2. Handles form submissions from inside the modal (POST generation)
  const handleFormSubmit = async (formData) => {
    if (isGenerating) return;

    try {
      setIsGenerating(true);
      setError('');
      
      // POST /api/cover-letter/:resumeId
      const response = await API.post(`/cover-letter/${resumeId}`, formData);
      
      if (response.data?.coverLetter) {
        // Use returned data directly (no extra GET request)
        setCoverLetter(response.data.coverLetter);
        setIsModalOpen(false); // Close modal only on success
        toast.success("Cover letter generated successfully!");
      } else {
        throw new Error("Invalid response structure from server");
      }
    } catch (err) {
      console.error('Error generating cover letter:', err);
      const errMsg = err.response?.data?.error || err.response?.data?.msg || "Failed to generate cover letter.";
      setError(errMsg);
      toast.error(errMsg);
      // Keep modal open and form data intact if generation fails
    } finally {
      setIsGenerating(false);
    }
  };

  // Action Toolbar Handlers
  const handleCopy = () => {
    if (coverLetter?.coverLetter) {
      navigator.clipboard.writeText(coverLetter.coverLetter);
      toast.success('Copied to clipboard!');
    }
  };

  const handleDownloadPDF = () => {
    console.log('Trigger PDF compilation sequence...');
    toast.info('PDF download coming soon!');
  };

  const handleDownloadDOCX = () => {
    console.log('Trigger Office XML format compilation sequence...');
    toast.info('DOCX download coming soon!');
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-indigo-655 border-t-transparent rounded-full mx-auto" />
          <p className="mt-4 text-sm font-semibold text-slate-600">Checking existing documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 text-center">
      {error && !coverLetter && (
        <div className="max-w-md mx-auto mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-sm text-rose-700">
          {error}
        </div>
      )}

      {coverLetter ? (
        /* The Document Result Canvas View */
        <CoverLetterResult 
          coverLetter={coverLetter}
          onBack={() => navigate(`/analysis/${resumeId}`)}
          onCopy={handleCopy}
          onDownloadPDF={handleDownloadPDF}
          onDownloadDOCX={handleDownloadDOCX}
          onRegenerate={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="max-w-md mx-auto mt-20 p-8 border border-slate-200 rounded-2xl bg-white shadow-sm">
          <h2 className="text-xl font-bold mb-2">Cover Letter Workspace</h2>
          <p className="text-sm text-slate-500 mb-6">Create professional, tailored cover letters instantaneously.</p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-in-out hover:bg-indigo-700 active:scale-98 cursor-pointer"
          >
            Generate Cover Letter
          </button>
        </div>
      )}

      {/* The Configuration Details Form Modal */}
      <CoverLetterModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        isGenerating={isGenerating}
      />
    </div>
  );
}