const { Schema, model } = require("mongoose");
// const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// const joiSchema = Joi.object({
//   name: Joi.string()
//     .required()
//     .messages({ "any.required": `missing required name field` }),
//   email: Joi.string()
//     .required()
//     .messages({ "any.required": `missing required email field` }),
//   phone: Joi.string()
//     .required()
//     .messages({ "any.required": `missing required phone field` }),
//   favorite: Joi.bool(),
// });

// const favoriteSchema = Joi.object({
//   favorite: Joi.bool().required(),
// });

const Contact = model("contact", contactSchema);

module.exports = { Contact };
