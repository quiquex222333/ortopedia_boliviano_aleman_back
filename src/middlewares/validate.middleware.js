function validate(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          error: 'Error de validacion',
          details: error.details.map(d => d.message)
        });
      }
      next();
    };
  }
  
  module.exports = { validate };
  