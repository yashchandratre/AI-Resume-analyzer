const express = require("express");
const { authMiddleware } = require("../controllers/auth-controller");
const {
  analyzeResumeController,
  getAllResumesController,
  getAnalysisResultController,
  getAllAnalysisResultController,
} = require("../controllers/analysisController");
const router = express.Router();
console.log("Analysis");

router.get("/analysisresult/:id", authMiddleware, getAnalysisResultController);
router.get("/analysisresult", authMiddleware, getAllAnalysisResultController);

router.post("/:resumeId", authMiddleware, analyzeResumeController);
module.exports = router;
