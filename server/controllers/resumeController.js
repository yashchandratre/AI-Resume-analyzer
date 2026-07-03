const fs = require("fs/promises");
const Resume = require("../model/resume_model");
const AnalysisResult = require("../model/analysisresult_model");
const { extractPdfText } = require("../services/pdfService");
const { extractDocxText } = require("../services/docxService");

async function uploadResume(req, res) {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Resume file is required" });
  }

  try {
    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      extractedText = await extractPdfText(req.file.path);
    } else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      extractedText = await extractDocxText(req.file.path);
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Unsupported file type" });
    }

    const resume = await Resume.create({
      user: req.user._id,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      extractedText,
    });

    return res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    await fs.unlink(req.file.path).catch(() => {});

    return res.status(500).json({
      success: false,
      message: "Unable to process resume upload",
    });
  }
}
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

const deleteResume = async (req, res) => {
  try {
    const resumeId = req.params.resumeId;
    const resume = await Resume.findById(resumeId);
    const analysisresult = await AnalysisResult.find({resume:resumeId})
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    // Check if the user is the owner of the resume
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Resume.findByIdAndDelete(resumeId);
    if(analysisresult){
      await AnalysisResult.findByIdAndDelete(resumeId)
    }
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the resume." });
  }
};
module.exports = { uploadResume,deleteResume };
