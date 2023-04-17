const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout.js");
const updateAvatar = require("./updateAvatar.js");
const verifyEmail = require("./verifyEmail");
const reverifyEmail = require("./reverifyEmail");
module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verifyEmail,
  reverifyEmail,
};
