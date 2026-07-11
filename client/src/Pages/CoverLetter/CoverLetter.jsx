import React, { useState } from 'react';
import CoverLetterModal from './CoverLetterModal';
import CoverLetterResult from './CoverLetterResult';
import API from '../../services/authapi';
import { useParams } from 'react-router-dom';

export default function CoverLetter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [letterContent, setLetterContent] = useState('');
  const {resumeId} = useParams(); // Assuming you are using react-router to get the resume ID from the URL
  // 1. Handles form submissions from inside the modal
  const handleFormSubmit = async(formData) => {
    console.log('Generating letter with data:', formData);
    
    try {
      const res = await API.post(`/coverletter/${resumeId}`, formData);
      const generatedLetter = res.data;
      console.log('Generated letter:', generatedLetter);
      setLetterContent(generatedLetter);
      setIsModalOpen(false); // Close the entry modal
      setShowResult(true);   // Display the document canvas view
    } catch (error) {
      console.log('Error generating cover letter:', error);
    }
    
  };

  // 2. Action Toolbar Handlers
  const handleCopy = () => {
    navigator.clipboard.writeText(letterContent);
    alert('Copied to clipboard!');
  };

  const handleDownloadPDF = () => {
    console.log('Trigger PDF compilation sequence...');
  };

  const handleDownloadDOCX = () => {
    console.log('Trigger Office XML format compilation sequence...');
  };

  return (
    <div className="p-6 text-center">
      {/* State Switcher View Layout */}
      {!showResult ? (
        <div className="max-w-md mx-auto mt-20 p-8 border border-slate-200 rounded-2xl bg-white shadow-sm">
          <h2 className="text-xl font-bold mb-2">Cover Letter Workspace</h2>
          <p className="text-sm text-slate-500 mb-6">Create professional, tailored cover letters instantaneously.</p>
          
          {/* The primary improved button that opens the modal trigger */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-in-out hover:bg-indigo-700 active:scale-98 cursor-pointer"
          >
            Generate Cover Letter
          </button>
        </div>
      ) : (
        /* The Document Result Canvas View */
        <CoverLetterResult 
          coverLetterText={letterContent}
          onBack={() => setShowResult(false)}
          onCopy={handleCopy}
          onDownloadPDF={handleDownloadPDF}
          onDownloadDOCX={handleDownloadDOCX}
          onRegenerate={() => setIsModalOpen(true)}
        />
      )}

      {/* The Configuration Details Form Modal */}
      <CoverLetterModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}