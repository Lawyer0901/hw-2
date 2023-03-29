const express = require("express");

const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const { userValidation, userTokenValidation } = require("../../middlewares");

router.post("/register", userValidation, ctrl.register);
router.post("/login", userValidation, ctrl.login);
router.get("/current", userTokenValidation, ctrl.getCurrent);
router.post("/logout", userTokenValidation, ctrl.logout);

module.exports = router;
