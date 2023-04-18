const sendVerify = require("../../helpers/sendVerify");

const reVerifyUser = async (req, res, next) => {
  try {
    const { email, verificationToken } = req.body.user;

    sendVerify(email, verificationToken);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = reVerifyUser;
