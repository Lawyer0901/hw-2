const contactsOperations = require("../../models/contacts");

const add = async (req, res, next) => {
  try {
    const result = await contactsOperations.addContact(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
