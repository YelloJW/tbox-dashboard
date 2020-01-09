// Dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create schema with validation rules
const TaskSchema = new Schema ({
  task: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    dafulat: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Export model
Task = mongoose.model("tasks", TaskSchema);
module.exports = Task
