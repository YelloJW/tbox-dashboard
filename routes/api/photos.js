// Dependencies
const express = require("express");
const router = express.Router();
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const DIR = './public/userPhotos';

// Load models
const User = require("../../models/User");
const Photo = require("../../models/Photo");

// route to return user photos
router.post("/photos", (req, res, next) => {
  // set user
  const userId = req.body.userId
  // find user
  User.findOne({ _id: userId }).then(user => {
    if (user) {
      // if user found, find user photos
      Photo.find({user: user.id}, (err, photos) => {
        if(err) {
          console.log(err)
        } else {
          // return photos
          res.json(photos)
        }
      })
    } else {
      // res.status().json()
    }
  });
});

// config multer storage and upload settings
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

// Route for uploading a photo
router.post("/upload", upload.single('photo'), (req, res, next) => {
  // set user
  const userId = req.body.userId

  // find user
  User.findOne({ _id: userId }).then(user => {
      if (user) {
        // get path
        const url = req.protocol + '://' + req.get('host')
        // if user found in db create new photo
        const newPhoto = new Photo({
        path: url + '/public/userPhotos/' + req.file.filename,
        user: user
      });
      // save photo
      newPhoto.save()
      } else {
        console.log('cant find user')
      }
    });
});


module.exports = router;
