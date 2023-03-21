const express = require("express");

const router = express.Router();

const {
  validationAddContact,
  validationUpdContact,
  validationUpdStatusContact,
} = require("../../middlewares/validation");
// const { favoriteValidation } = require("../../middlewares");
// const { joiSchema, favoriteSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");
//
// const validateMiddleware = validation(joiSchema);

// const validateMiddlewareFavorite = favoriteValidation(favoriteSchema);

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validationAddContact, ctrl.add);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validationUpdContact, ctrl.update);

router.patch(
  "/:contactId/favorite",
  validationUpdStatusContact,
  ctrl.updateStatusContact
);

module.exports = router;
