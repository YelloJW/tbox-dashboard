import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from '../history';


import axios from 'axios';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const Userdata = {
          email: this.state.email,
          password: this.state.password
        };

    axios.post('http://localhost:5000/api/users/login', Userdata)
      .then(res => {
        console.log(res)
        if (res.data) {
          console.log("successful login")
          console.log(res.data)
          history.push('/dashboard');
        }
      })
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <h1>Hackathon</h1>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="">
                <label htmlFor="email">Email</label>
                <input onChange={this.onChange} value={this.state.email} error={errors.email} id="email" type="text"/>
              </div>
              <div className="">
                <label htmlFor="password">Password</label>
                <input onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password"/>
              </div>
              <div className="">
                <button type="submit" className="" >Login</button>
              </div>
            </form>
            <p className="">
              New to hackathon? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}


export default Login;
