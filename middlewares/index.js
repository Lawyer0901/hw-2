const validationAddContact = require("./validation");
const validationUpdContact = require("./validation");
const validationUpdStatusContact = require("./validation");

const { userValidation, userTokenValidation } = require("./authValidation.js");

module.exports = {
  validationAddContact,
  validationUpdContact,
  validationUpdStatusContact,
  userValidation,
  userTokenValidation,
};
