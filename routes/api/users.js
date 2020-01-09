// Dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const keys = require("../../config/keys");
const DIR = './public/profileImgs';
// const upload = multer({ dest: DIR })


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// Load user validation functions
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// Route for registering user
router.post("/register", upload.single('profileImg'), (req, res, next) => {

  console.log(req.file)
  // Save output of form validation to const
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check if input valid
  if (!isValid) {
    return res.status(400).send(errors);
  }


  // If input valid return an instance of that user and if no instance exists create a new one
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).send(errors);
    } else {
      const url = req.protocol + '://' + req.get('host')
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profileImg: url + '/public/profileImgs/' + req.file.filename
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
    return res.status(400).send(errors);
  }

  // save user input
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {

    // Check if user exists
    if (!user) {
      errors.email = "Email not found, please sign up to continue";
      return res.status(404).send(errors);
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
              token: "Bearer " + token,
              user:user
            });
          }
        );
      } else {
          errors.password = "Password incorrect";
        return res
          .status(400)
          .send(errors);
        }
    });
  });
});

// router.post("/currentUser", (req, res) => {
//   console.log(req.body)
//   User.findOne({ email: req.body.email })
//   .then(user => {
//     if (user) {
//       return res.json(user)
//     }
//   })
// });

module.exports = router;
