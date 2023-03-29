const express = require("express");

const router = express.Router();

const {
  validationAddContact,
  validationUpdContact,
  validationUpdStatusContact,
} = require("../../middlewares/validation");
const { userTokenValidation } = require("../../middlewares/authValidation");
// const { favoriteValidation } = require("../../middlewares");
// const { joiSchema, favoriteSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");
//
// const validateMiddleware = validation(joiSchema);

// const validateMiddlewareFavorite = favoriteValidation(favoriteSchema);

router.get("/", userTokenValidation, ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", userTokenValidation, validationAddContact, ctrl.add);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validationUpdContact, ctrl.update);

router.patch(
  "/:contactId/favorite",
  validationUpdStatusContact,
  ctrl.updateStatusContact
);

module.exports = router;
