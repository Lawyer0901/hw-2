const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const contacts = await Contact.find({ owner: _id });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
