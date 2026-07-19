const { body, validationResult } = require("express-validator");

/*
==========================================================
Create Complaint Validation
==========================================================
*/

const createComplaintValidation = [

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Complaint title is required.")
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required.")
    .isLength({ min: 20 })
    .withMessage("Description must be at least 20 characters."),

  body("department")
    .notEmpty()
    .withMessage("Department is required.")
    .isIn([
      "Railway",
      "Gram Panchayat",
      "Nagar Nigam",
    ])
    .withMessage("Invalid department."),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required."),

  body("priority")
    .optional()
    .isIn([
      "Low",
      "Medium",
      "High",
      "Critical",
    ])
    .withMessage("Invalid priority."),

  body("location")
  .notEmpty()
  .withMessage("Location is required.")
  .custom((value) => {
    try {
      const parsed = JSON.parse(value);

      if (!parsed.address) {
        throw new Error();
      }

      return true;
    } catch {
      throw new Error("Invalid location");
    }
  }),

];

/*
==========================================================
Validation Result
==========================================================
*/

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("Validation Errors:");
    console.log(errors.array());

    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  createComplaintValidation,
  validate,
};