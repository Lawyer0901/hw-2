const { User } = require("../../models");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = process.env;

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
