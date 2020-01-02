// Dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load user validation functions
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// Route for registering user
router.post("/register", (req, res) => {

  // Save output of form validation to const
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check if input valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // If input valid return an instance of that user and if no instance exists create a new one
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password using bcrypt before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// Route for login in user
router.post("/login", (req, res) => {

  // Save output of form validation to const
  const { errors, isValid } = validateLoginInput(req.body);

  // Check if input valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // save user input
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {

    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found, please sign up to continue" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {

        // If saved and input passwords match create JWT payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
        }
    });
  });
});

module.exports = router;
