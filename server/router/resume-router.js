const express = require("express");
const { authMiddleware } = require("../controllers/auth-controller");
const { uploadResume, deleteResume } = require("../controllers/resumeController");
const { upload, handleUploadErrors } = require("../middleware/uploadMiddleware");
const { getAllResumesController, analyzeResumeController } = require("../controllers/analysisController");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  handleUploadErrors,
  uploadResume
);

router.get(
  "/resumes",
  authMiddleware,
  getAllResumesController
);

router.delete(
  "/:resumeId",
  authMiddleware,
  deleteResume  
);

module.exports = router;
