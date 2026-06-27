const express =require("express");
const router =  express.Router();
const controller = require("../controllers/auth-controller");

router.route("/").get(controller.home);
router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/me").get(controller.authMiddleware, controller.me);
// router.route("/clogin").post(controller.clogin);

module.exports = router;
