const express = require("express");

const router = express.Router();

const { validation } = require("../../middlewares");
const { favoriteValidation } = require("../../middlewares");
const { joiSchema, favoriteSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(joiSchema);

const validateMiddlewareFavorite = favoriteValidation(favoriteSchema);

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateMiddleware, ctrl.add);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validateMiddleware, ctrl.update);

router.patch(
  "/:contactId/favorite",
  validateMiddlewareFavorite,
  ctrl.updateStatusContact
);

module.exports = router;
