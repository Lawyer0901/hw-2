const contactsOperations = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
      // res.status(404).json({
      //   status: "error",
      //   code: 404,
      //   message: `Contact with id=${contactId} doesn't exist`,
      // }
      // return;
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   status: "error",
    //   code: 500,
    //   message: "Server error",
    // });
  }
};

module.exports = getById;
