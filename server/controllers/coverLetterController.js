const Resume = require("../model/resume_model");
const CoverLetter = require("../model/coverLatter_model");
const { generateCoverLetter } = require("../services/geminiService");

// GET /api/cover-letter/:resumeId
const getCoverLetterController = async (req, res) => {
  try {
    const { resumeId } = req.params;

    if (!resumeId) {
      return res.status(450).json({ success: false, error: "Resume ID is required" });
    }

    // Verify ownership of the resume first
    const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ success: false, error: "Resume not found or unauthorized" });
    }

    // Find the cover letter associated with this resume and user
    const coverLetter = await CoverLetter.findOne({
      user: req.user._id,
      resume: resumeId
    });

    if (coverLetter) {
      return res.status(200).json({
        success: true,
        exists: true,
        coverLetter
      });
    }

    return res.status(200).json({
      success: true,
      exists: false,
      coverLetter: null
    });
  } catch (error) {
    console.error("Error in getCoverLetterController:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// POST /api/cover-letter/:resumeId
const generateCoverLetterController = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const { companyName, fullName, jobDescription, jobTitle } = req.body;

    if (!resumeId) {
      return res.status(400).json({ error: "Resume ID is required" });
    }

    if (!companyName || !jobTitle || !jobDescription || !fullName) {
      return res.status(400).json({ error: "All required fields (companyName, jobTitle, jobDescription, fullName) must be provided" });
    }

    // Verify ownership of the resume first
    const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ error: "Resume not found or unauthorized" });
    }

    // Check if cover letter already exists to prevent duplicate creation
    const existingCoverLetter = await CoverLetter.findOne({
      user: req.user._id,
      resume: resumeId
    });

    if (existingCoverLetter) {
      return res.status(200).json({ success: true, coverLetter: existingCoverLetter });
    }

    // Call Gemini to generate the cover letter (passing single object argument as expected by service)
    const coverLetterText = await generateCoverLetter({
      resumeText: resume.extractedText,
      companyName,
      jobTitle,
      jobDescription,
      fullName,
    });

    // Save exactly one document to MongoDB
    const newCoverLetter = new CoverLetter({
      user: req.user._id,
      resume: resume._id,
      companyName,
      jobTitle,
      hiringManager: req.body.hiringManager || "",
      coverLetter: coverLetterText,
    });
    
    await newCoverLetter.save();

    return res.status(200).json({ success: true, coverLetter: newCoverLetter });
  } catch (error) {
    console.error("Error in generateCoverLetterController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getCoverLetterController,
  generateCoverLetterController,
};
