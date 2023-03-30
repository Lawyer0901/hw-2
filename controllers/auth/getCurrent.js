const { User } = require("../../models");

const getCurrent = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status("401").json({ message: "Not authorized" });
      return;
    }

    res.status("200").json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
