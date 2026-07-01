const express = require("express");
const { authMiddleware } = require("../controllers/auth-controller");
const {
  analyzeResumeController,
  getAllResumesController,
} = require("../controllers/analysisController");
const router = express.Router();
console.log("Analysis");

router.post("/:resumeId", authMiddleware, analyzeResumeController);

// router.get(
//   "/resumes",
//   authMiddleware,
//   getAllResumesController
// );

module.exports = router;
