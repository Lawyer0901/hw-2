const { User } = require("../../models");
const path = require("path");
const fs = require("fs");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  try {
    const resultUpload = path.join(avatarsDir, `${id}_${originalname}`);
    const img = await jimp.read(resultUpload);
    await img
      .autocrop(
        20,
        20,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(resultUpload);
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
