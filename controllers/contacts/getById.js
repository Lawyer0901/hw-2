const { Contact } = require("../../models");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId); // findOne({_id: contactId})
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
