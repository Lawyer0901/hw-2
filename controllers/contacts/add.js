const { Contact } = require("../../models");

const add = async (req, res, next) => {
  try {
    const { _id } = req.user;
    console.log(req.user);
    const result = await Contact.create({ ...req.body, owner: _id });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
