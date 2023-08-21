export const validateSchema = (schema) => (req, res, next) => {
  try {
    console.log('validate', req.body);
    schema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.errors.map((error) => error.message) });
  }
};
