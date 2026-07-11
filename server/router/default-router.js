const express =require("express");
const { authMiddleware } = require("../controllers/auth-controller");
const { generateCoverLetterController } = require("../controllers/coverLetterController");
const router =  express.Router();

router.post("/coverletter/:resumeId",authMiddleware,generateCoverLetterController);

module.exports = router;