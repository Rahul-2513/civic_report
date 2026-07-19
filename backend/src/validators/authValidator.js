const { body, validationResult } = require("express-validator");

/*
====================================================
Register Validation
====================================================
*/

const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters."),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email."),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),

  body("role")
    .isIn(["citizen", "officer", "admin"])
    .withMessage("Invalid user role."),
];

/*
====================================================
Login Validation
====================================================
*/

const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email."),

  body("password")
    .notEmpty()
    .withMessage("Password is required."),
];

/*
====================================================
Validation Result
====================================================
*/

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  validate,
};