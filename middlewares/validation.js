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

const favoriteValidation = (schema) => {
  return (req, res, next) => {
    const { favorite } = req.body;
    if (!favorite) {
      res.status(400).json({ message: "missing fields favorite" });
      return;
    }
    next();
  };
};

module.exports = validation;
module.exports = favoriteValidation;
