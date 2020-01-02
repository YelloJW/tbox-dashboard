// Dependencies
const Validator = require("validator");
const isEmpty = require("is-empty");

// Export validation function
module.exports = function validateLoginInput(data) {
  // instantiate errors object
  let errors = {};

  // Convert empty fields to empty strings for validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email check - not empty or invalid format
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password check - not empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
