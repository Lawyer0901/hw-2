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
    res.json({
      status: "success",
      code: 200,
      message: "Contact deleted",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
