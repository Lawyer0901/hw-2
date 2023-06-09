const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET_KEY } = process.env;

const userValidation = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().alphanum().min(8).max(32).required(),

    email: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status("400").json({ message: error.details[0].message });
    return;
  }

  next();
};

const userTokenValidation = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      res.status(401).json({ message: "Not authorized" });
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }

};






module.exports = { userValidation, userTokenValidation,  };
