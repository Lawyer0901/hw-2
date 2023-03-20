const { Contact } = require("../../models");

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
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
