const express = require("express");

const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const { userValidation, userTokenValidation } = require("../../middlewares");
const upload = require("../../middlewares/upload");

router.post("/register", userValidation, ctrl.register);
router.post("/login", userValidation, ctrl.login);
router.get("/current", userTokenValidation, ctrl.getCurrent);
router.post("/logout", userTokenValidation, ctrl.logout);
router.patch(
  "/avatars",
  userTokenValidation,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
