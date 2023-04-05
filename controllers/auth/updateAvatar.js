const { User } = require("../../models");
const path = require("path");
const fs = require("fs");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  try {
    const resultUpload = path.join(avatarsDir, `${id}_${originalname}`);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", `${id}_${originalname}`);
    const avatar = await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.status(200).json({
      avatarURL: avatar,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
};

module.exports = updateAvatar;
