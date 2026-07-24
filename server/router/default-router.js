const express = require("express");
const { authMiddleware } = require("../controllers/auth-controller");
const { 
  getCoverLetterController,
  generateCoverLetterController 
} = require("../controllers/coverLetterController");

const router = express.Router();

router.get("/cover-letter/:resumeId", authMiddleware, getCoverLetterController);
router.post("/cover-letter/:resumeId", authMiddleware, generateCoverLetterController);

module.exports = router;