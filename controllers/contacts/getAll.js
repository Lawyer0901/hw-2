const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
