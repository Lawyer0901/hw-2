const contactsOperations = require("../../models/contacts");

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const result = await contactsOperations.updateContact(contactId, body);
    if (!result) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
