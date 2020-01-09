// Dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create schema with validation rules
const PhotoSchema = new Schema ({
  path: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Export model
Photo = mongoose.model("photos", PhotoSchema);
module.exports = Photo
