const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
    }
    if (!Object.keys(req.body).length) {
      res.status(400).json({ message: "missing fields" });
      return;
    }
    next();
  };
};

module.exports = validation;
