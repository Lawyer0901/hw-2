const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.verify) {
      res.status(401).json({ message: "Email or password is wrong" });
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      res.status(401).json({ message: "Email or password is wrong" });
    }
    //   token
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    const loginUser = await User.findByIdAndUpdate(
      user._id,
      { token: token },
      { new: true }
    );

    res.status("200").json({
      token: loginUser.token,
      user: {
        email: loginUser.email,
        subscription: loginUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
