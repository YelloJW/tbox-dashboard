import React, { Component} from 'react';
import axios from 'axios';


class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      task: "",
      tasks: []
    }
  }

  componentDidMount () {
    axios.post('http://localhost:5000/api/tasks/tasks', {user: this.state.user})
    .then(res => {
      this.setState({
        tasks: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const task = {
          task: this.state.task,
          user: this.state.user
        };
    axios.post('http://localhost:5000/api/tasks/new', task)
    .catch(err => {
      console.log(err)
    })
    document.location.reload()
  }

  onCheckbox = (e) => {
    const task = JSON.parse(e.target.dataset.task)
    axios.put('http://localhost:5000/api/tasks/update', task)
    .catch(err => {
      console.log(err)
    })
    document.location.reload()
  }

  setLabel= (task) => {
    if(task.completed) {
      return <label htmlFor={task._id}>&#x2714;</label>
    } else {
      return <label htmlFor={task._id}></label>
    }
  }

  render() {
    const tasks = this.state.tasks
    const taskElements = tasks.map(task => <div key={task._id} className="task"><span>{task.task}</span><input id={task._id} type="checkbox" checked={task.completed} onChange={this.onCheckbox} data-task={JSON.stringify(task)}/>{this.setLabel(task)}</div> )
    return (
      <div className="container">
        <h1>Your tasks</h1>
        <div className="tasks">
          <form className="new-task" onSubmit={this.onSubmit}>
            <input className="" onChange={this.onChange} id="task" type="text" placeholder="New task"/>
            <button type="submit" className="add-task" >+</button>
          </form>
          {taskElements}
        </div>
      </div>
    )
  }
}

export default Task


