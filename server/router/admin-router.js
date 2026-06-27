const express = require("express");
// const adminController = require("../controllers/admin-controller");
const { authMiddleware, adminMiddleware } = require("../controllers/auth-controller");

const router = express.Router();

// Anything registered below this line requires:
// 1. a valid JWT
// 2. a MongoDB user with isAdmin: true
router.use(authMiddleware, adminMiddleware);

module.exports = router;