const contactsOperations = require("../../models/contacts");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);

    if (!result) {
      const error = new Error(`Contact with id=${contactId} doesn't exist`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
