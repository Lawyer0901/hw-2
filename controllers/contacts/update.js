const contactsOperations = require("../../models/contacts");

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
