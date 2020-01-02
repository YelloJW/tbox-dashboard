// Dependencies
const Validator = require('validator')
const isEmpty = require('is-empty')

// Export validation function
module.exports = function validateRegisterInput(data) {
  // Instantiate errors object
  let errors = {};

  // Convert empty fields to empty strings for validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name check - not empty
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

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

  // Password confirmation check - not empty
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Please confirm password";
  }

  // Password length check
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must be at least 6 characters";
  }

  // Password and password confirmation match
  if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
