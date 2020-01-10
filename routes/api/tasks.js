// Dependencies
const express = require("express");
const router = express.Router();

// Load models
const User = require("../../models/User");
const Task = require("../../models/Task");

// route to retrive users tasks
router.post("/tasks", (req, res, next) => {
  // set user
  const user = req.body.user
  // find user
  User.findOne({ email: user.email }).then(user => {
      if (user) {
        // once user found return all tasks for that user
        Task.find({user: user.id}, (err, tasks) => {
          if(err) {
            console.log('No tasks found')
            // res.status().json()
          } else {
            // send tasks
            res.json(tasks)
          }
        })
      } else {
        console.log('cant find user')
        // res.status().json()
      }
    });
});

// route for creating new task
router.post("/new", (req, res, next) => {
  // set user
  const user = req.body.user

  // check task not empty
  if(!req.body.task) {
    return res.status(400).json({
      taskempty: 'please provide a description of the task'
    });
  }

  // create new task
  const task = new Task ({
    task: req.body.task,
    completed: false,
    user: user
  })

  // save new task
  task.save().
  then(data => {
    res.json(data)
  }).catch(err => {
    res.status(500).json({
      message: err.message
    })
  })
});

// route for updating completion status of task
router.put("/update", (req, res, next) => {
  // set task
  const task = req.body

  // set updated task upject
  const updatedTask = {
    completed: !task.completed,
  }

  // find and update task
  Task.findByIdAndUpdate(task._id, updatedTask, (err, task) => {
    if(task){
      // console.log('task updated to' + task)
      res.json(task)
    } else {
      // console.log('task not found')
      res.status(404).json({noTaskById: err })
    }
  })
});

module.exports = router;
