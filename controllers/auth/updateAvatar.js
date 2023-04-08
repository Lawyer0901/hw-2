const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  console.log(tempUpload);

  const { _id: id } = req.user;
  // console.log(req.user);
  try {
    const resultUpload = path.join(avatarsDir, `${id}_${originalname}`);

    Jimp.read(req.file.path, function (err, avatar) {
      if (err) throw err;
      avatar.resize(250, 250).write(resultUpload);
      next();
    });
    // const img = await jimp.read(resultUpload);

    // await img
    //   .autocrop(
    //     20,
    //     20,
    //     jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
    //   )
    //   .writeAsync(resultUpload);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", `${id}_${originalname}`);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
};

module.exports = updateAvatar;
