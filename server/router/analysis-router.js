const express = require("express");
const { authMiddleware } = require("../controllers/auth-controller");
const {
  analyzeResumeController,
  getAllResumesController,
  getAnalysisResultController,
  getAllAnalysisResultController,
  getAnalysisScores,
} = require("../controllers/analysisController");
const router = express.Router();
console.log("Analysis");

router.get("/analysisresult/:id", authMiddleware, getAnalysisResultController);
router.get("/analysisresult", authMiddleware, getAllAnalysisResultController);
router.get("/score", authMiddleware, getAnalysisScores);
router.post("/:resumeId", authMiddleware, analyzeResumeController);
module.exports = router;
