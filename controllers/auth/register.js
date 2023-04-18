const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const sendVerify = require("../../helpers/sendVerify");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({ message: "Email in use" });
      return;
    }
    const verificationToken = uuidv4();
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    await sendVerify(email, verificationToken);

    res.status("201").json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
        verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
