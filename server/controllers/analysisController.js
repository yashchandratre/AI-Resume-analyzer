const { analyzeResume } = require("../services/geminiService");
const Resume = require("../model/resume_model");
const AnalysisResult = require("../model/analysisresult_model");

// const analyzeResumeController = async (req, res) => {
//   console.log("Controller started");
//   try {
//     const { resumeId } = req.params;
//     console.log("Resume ID:", resumeId);

//     const resume = await Resume.findById(resumeId);
//     const AnalysisResultExists = await AnalysisResult.findOne({
//       resume: resumeId,
//     });

//     if (AnalysisResultExists) {
//       console.log("Analysis Stoped");
//       return res.status(200).json({
//         success: true,
//         analysis: AnalysisResultExists.analysisData,
//       });
//     }

//     if (!resume) {
//       return res.status(404).json({ error: "Resume not found" });
//     }

//     const analysis = await analyzeResume(resume.extractedText);

//     const newAnalysisResult = new AnalysisResult({
//       user: req.user._id,
//       resume: resume._id,
//       analysisData: analysis,
//     });
//     console.log("Before save");

//     try {
//       await newAnalysisResult.save();
//       console.log("Saved successfully");
//     } catch (err) {
//       console.error("SAVE ERROR:", err);
//       return res.status(500).json({
//         message: err.message,
//       });
//     }
//     console.log("User:", req.user._id);
//     console.log("Resume:", resume._id);
//     console.log("Analysis Type:", typeof analysis);
//     console.log("Analysis:", analysis);

//     return res.json({
//       success: true,
//       analysis,
//     });
//   } catch (error) {
//     console.error("========================");
//     console.error("FULL ERROR:");
//     console.error(error);
//     console.error("MESSAGE:", error.message);
//     console.error("STACK:", error.stack);
//     console.error("========================");

//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };

const analyzeResumeController = async (req, res) => {
  try {
    const { resumeId } = req.params;

    // Check if analysis already exists
    const existingAnalysis = await AnalysisResult.findOne({
      resume: resumeId,
      user: req.user._id,
    });

    if (existingAnalysis) {
      return res.status(200).json({
        success: true,
        analysis: existingAnalysis.analysisData,
      });
    }

    // Find resume
    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    // Generate analysis
    const analysis = await analyzeResume(resume.extractedText);

    // Save analysis
    const newAnalysisResult = await AnalysisResult.create({
      user: req.user._id,
      resume: resume._id,
      analysisData: analysis,
    });

    return res.status(200).json({
      success: true,
      analysis: newAnalysisResult.analysisData,
    });

  } catch (error) {
    console.error(error);

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

const getAnalysisResultController = async (req, res) => {
  try {
    const analysisResult = await AnalysisResult.findOne({
      resume: req.params.id,
    })
      .populate("user")
      .populate("resume");

    if (!analysisResult) {
      return res.json({ analysis: [] });
    }
    return res.status(200).json({ analysis: analysisResult.analysisData });
  } catch (error) {
    console.error("Error fetching analysis result:", error);
    return res
      .status(500)
      .json({ msg: "An error occurred while fetching the analysis result." });
  }
};
const getAllAnalysisResultController = async (req, res) => {
  try {
    const analysisResults = await AnalysisResult.find({
      user: req.user._id,
    }).populate("resume");

    if (analysisResults.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No analysis results found",
      });
    }

    return res.status(200).json({
      success: true,
      analysisResults,
    });
  } catch (error) {
    console.error("Error fetching analysis results:", error);

    return res.status(500).json({
      success: false,
      msg: "An error occurred while fetching analysis results.",
    });
  }
};

module.exports = {
  analyzeResumeController,
  getAllResumesController,
  getAnalysisResultController,
  getAllAnalysisResultController,
};
