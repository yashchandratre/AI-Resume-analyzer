const { analyzeResume } = require("../services/geminiService");
const Resume = require("../model/resume_model");
console.log("analysis Cont");

const analyzeResumeController = async (req, res) => {
  console.log("Controller started");
  try {
    const { resumeId } = req.params;
    console.log("Resume ID:", resumeId);

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    const analysis = await analyzeResume(resume.extractedText);

    console.log("Gemini Response:", analysis);

    return res.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("========================");
    console.error("FULL ERROR:");
    console.error(error);
    console.error("MESSAGE:", error.message);
    console.error("STACK:", error.stack);
    console.error("========================");

    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllResumesController = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({
      uploadedAt: -1,
    });
    res.status(200).json({ resumes });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching resumes." });
  }
};

module.exports = { analyzeResumeController, getAllResumesController };
