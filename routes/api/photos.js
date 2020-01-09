// Dependencies
const express = require("express");
const router = express.Router();
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const DIR = './public/userPhotos';
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

// Load models
const User = require("../../models/User");
const Photo = require("../../models/Photo");

// Route for uploading a photo
router.post("/upload", upload.single('photo'), (req, res, next) => {
  console.log('file to upload')
  console.log(req.file)

  console.log('associated user email')
  console.log(req.body.user)
  console.log('finding user')
  User.findOne({ email: req.body.user }).then(user => {
      if (user) {
        const url = req.protocol + '://' + req.get('host')
        console.log('user found')
        console.log(user)
        console.log('creating new photo')
        const newPhoto = new Photo({
        path: url + '/public/userPhotos/' + req.file.filename,
        user: user
      });
      newPhoto.save()
      } else {
        console.log('cant find user')
      }
    });

});

router.post("/photos", (req, res, next) => {
  const user = req.body.user
  User.findOne({ email: user.email }).then(user => {
    if (user) {
      Photo.find({user: user.id}, (err, photos) => {
        if(err) {
          // res.status().json()
        } else {
          res.json(photos)
        }
      })
    } else {
      // res.status().json()
    }
  });
});


module.exports = router;
