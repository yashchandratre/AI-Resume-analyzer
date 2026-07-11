const Resume = require("../model/resume_model");
const AnalysisResult = require("../model/analysisresult_model");
const Coverlettter = require("../model/coverLatter_model");
const { generateCoverLetter } = require("../services/geminiService");

const generateCoverLetterController = async (req, res) => {
  try {
    console.log("generating...");
    
    const { resumeId } = req.params;
    const { companyName, fullName, jobDescription, jobTitle } = req.body;

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    const coverletter = await Coverlettter.findOne({ resume: resumeId });
    if (coverletter) {
      return res.status(200).json({ letter: coverletter });
    }

    const coverlatter = await generateCoverLetter(
      resume.extractedText,
      companyName,
      jobTitle,
      jobDescription,
      fullName,
    );
    console.log("Cover Letter Generated:", coverlatter);
    const newCoverLetter = new Coverlettter({
      user: req.user._id,
      resume: resume._id,
        companyName,
        jobTitle,
        hiringManager: req.body.hiringManager || "",
        coverLetter: coverlatter,
    });
    await newCoverLetter.save();

    return res.status(200).json({ letter: coverlatter });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  generateCoverLetterController,
};
