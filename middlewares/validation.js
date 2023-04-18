const { User } = require("../models");

const Joi = require("joi");

const validationAddContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),

    email: Joi.string().required(),

    phone: Joi.string().required(),

    favorite: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status("400").json({
      message: `missing required ${error.details[0].context.key} field`,
    });
    return;
  }

  next();
};

const validationUpdContact = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.status("400").json({ message: "missing fields" });
    return;
  }

  const schema = Joi.object({
    name: Joi.string().min(3).max(30),

    email: Joi.string(),

    phone: Joi.string(),

    favorite: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const [{ message }] = error.details;
    res.status("400").json({ message: `huy ${message}` });
    return;
  }
  console.log("validation is ok");
  next();
};

const validationUpdStatusContact = (req, res, next) => {
  if (!req.body.favorite) {
    res.status("400").json({ message: "missing field favorite" });
    return;
  }

  const schema = Joi.object({
    name: Joi.string().min(3).max(30),

    email: Joi.string(),

    phone: Joi.string(),

    favorite: Joi.boolean().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status("400").json({
      message: `missing required ${error.details[0].context.key} field`,
    });
    return;
  }

  next();
};

const userVerificationValidation = (req, res, next) => {
  const schema = Joi.object({
    verificationToken: Joi.string().required(),
  });

  const { error } = schema.validate(req.params);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  next();
};

const userReVerificationValidation = async (req, res, next) => {
  if (!req.body.email) {
    res.status(400).json({ message: "missing required field email" });
    return;
  }

  const user = await User.findOne({ email: req.body.email });

  if (user.verify) {
    res.status(200).json({ message: "Verification has already been passed" });
    return;
  }

  req.body.user = user;

  next();
};

module.exports = {
  validationAddContact,
  validationUpdContact,
  validationUpdStatusContact,
  userVerificationValidation,
  userReVerificationValidation,
};

// const validation = (schema) => {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       error.status = 400;
//       next(error);
//     }
//     if (!Object.keys(req.body).length) {
//       res.status(400).json({ message: "missing fields" });
//       return;
//     }
//     next();
//   };
// };

// const favoriteValidation = (schema) => {
//   return (req, res, next) => {
//     // if (!req.body.favorite) {
//     //   res.status(400).json({ message: "missing fields favorite" });
//     //   return;
//     // }
//     const { error } = schema.validate(req.body);
//     if (error) {
//       error.status = 400;
//       json({ message: "missing fields favorite" });
//       next(error);
//     }
//     next();
//   };
// };

// module.exports = validation;
// module.exports = favoriteValidation;
