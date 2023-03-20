const express = require("express");

const router = express.Router();

const { validation } = require("../../middlewares");
const { joiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(joiSchema);

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateMiddleware, ctrl.add);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validateMiddleware, ctrl.update);

module.exports = router;
