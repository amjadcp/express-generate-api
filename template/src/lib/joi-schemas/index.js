const JoiValidator = (validationSchema) => {
    return (req, res, next) => {
      const data = req.body;
      const { error } = validationSchema.validate(data);
      if (error) {
        return res.status(400).json({
          status: "failure",
          message: error.details.map((err) => err.message).join(", "),
        })
      }
      next();
    };
  };

export {JoiValidator};