const express = require("express");

const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const { userValidation } = require("../../middlewares");

router.post("/register", userValidation, ctrl.register);

module.exports = router;
