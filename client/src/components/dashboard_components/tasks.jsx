import React, { Component} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      tasks: [],
    }
  }

  componentDidMount () {
    axios.post('http://localhost:5000/api/tasks/tasks', {user: this.state.user})
    .then(res => {
      this.setState({
        tasks: res.data,
      })
    })
    .catch(err => console.log(err))
  }

  setLabel= (task) => {
    if(task.completed) {
      return <label htmlFor={task._id}>&#x2714;</label>
    } else {
      return <label htmlFor={task._id}></label>
    }
  }

  render() {
    const tasksCount = this.state.tasks.length
    const previewTasks = this.state.tasks.slice(0,3)
    const taskComponents = previewTasks.map(task => <div key={task._id} className="task-thumbnail"><span>{task.task}</span><input id={task._id} type="checkbox"/>{this.setLabel(task)}</div> )
    const taskPlaceholder = taskComponents.length === 0 ? <p> No tasks to display, add your first task </p> : "" ;
    return(
      <Link to={"/tasks"}>
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            <h2>Tasks ({tasksCount})</h2>
          </div>
          <div className="dashboard-card-contents">
            {taskComponents}
            {taskPlaceholder}
          </div>
        </div>
      </Link>
    )
  }
}

export default Tasks
