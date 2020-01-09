// Dependencies
const express = require("express");
const router = express.Router();

// Load models
const User = require("../../models/User");
const Task = require("../../models/Task");

router.post("/tasks", (req, res, next) => {
  const user = req.body.user
  User.findOne({ email: user.email }).then(user => {
      if (user) {
        console.log(user.id)
        Task.find({user: user.id}, (err, tasks) => {
          if(err) {
            console.log('There is no image')
            // res.status().json()
          } else {
            res.json(tasks)
          }
        })
      } else {
        console.log('cant find user')
        // res.status().json()
      }
    });
});

router.post("/new", (req, res, next) => {
  console.log(req.body.user)
  console.log(req.body.task)


  if(!req.body.task) {
    return res.status(400).json({
      taskempty: 'please provide a description of the task'
    });
  }

  console.log('creating new task')
  const task = new Task ({
    task: req.body.task,
    completed: false,
    user: req.body.user
  })

  console.log('saving new task')
  task.save().
  then(data => {
    console.log('task saved')
    res.json(data)
  }).catch(err => {
    console.log('task not saved')
    res.status(500).json({
      message: err.message
    })
  })
});

router.put("/update", (req, res, next) => {
  const task = req.body
  console.log('updating task' + task)

  console.log('updating task object')
  const updatedTask = {
    completed: !task.completed,
  }

  console.log('finding and updating task')
  Task.findByIdAndUpdate(task._id, updatedTask, (err, task) => {
    if(task){
      console.log('task updated to' + task)
      res.json(task)
    } else {
      console.log('task not found')
      res.status(404).json({noTaskById: err })
    }
  })
});

module.exports = router;
