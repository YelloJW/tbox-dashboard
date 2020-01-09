import React, { Component} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      task: "",
      tasks: [],
      previewTasks: []
    }
  }

  componentDidMount () {
    axios.post('http://localhost:5000/api/tasks/tasks', {user: this.state.user})
    .then(res => {
      this.setState({
        tasks: res.data,
        previewTasks: res.data.slice(0,3)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  setLabel= (task) => {
    if(task.completed) {
      return <label htmlFor={task._id}>&#x2714;</label>
    } else {
      return <label htmlFor={task._id}></label>
    }
  }

  render() {
    const tasks = this.state.previewTasks
    const taskElements = tasks.map(task => <div key={task._id} className="task-thumbnail"><span>{task.task}</span><input id={task._id} type="checkbox"/>{this.setLabel(task)}</div> )
    return(
      <Link to={"/tasks"}>
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            <h2>Tasks ({this.state.tasks.length})</h2>
          </div>
          <div className="dashboard-card-contents">
           {taskElements}
          </div>
        </div>
      </Link>
    )
  }
}

export default Tasks
