// dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// load user validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load User model
const User = require("../../models/User");

// route for registering user
router.post("/register", (req, res) => {
  // save form validation to const
  const { errors, isValid } = validateRegisterInput(req.body);
  // check if input valid
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // if input valid return an instance of that user and if no instance exists create a new one
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

router.get("/register", (req, res)=> {
  console.log("hello")
})

// route for login in user
router.post("/login", (req, res) => {
  // save form validation to const
  const { errors, isValid } = validateLoginInput(req.body);
  // check if input valid
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // find user by email
  User.findOne({ email }).then(user => {
    // check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found, please sign up to continue" });
    }
    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user matched
        // create JWT payload
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
