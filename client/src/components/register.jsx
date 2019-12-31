import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import history from '../history';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
        };
    console.log(newUser);

    axios.post('http://localhost:5000/api/users/register', newUser)
    .then(res => {
      console.log(res)
      if (res.data) {
        console.log("successful registration")
        history.push('/');
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
              <h4>
                <b>Register</b> below
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="">
                <label htmlFor="name">Username</label>
                <input onChange={this.onChange} value={this.state.name} error={errors.name} id="name" type="text"/>
              </div>
              <div className="">
                <label htmlFor="email">Email</label>
                <input onChange={this.onChange} value={this.state.email} error={errors.email} id="email" type="email"/>
              </div>
              <div className="">
                <label htmlFor="password">Password</label>
                <input onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password"/>
              </div>
              <div className="">
                <label htmlFor="password2">Confirm Password</label>
                <input onChange={this.onChange} value={this.state.password2} error={errors.password2} id="password2" type="password" />
              </div>
              <div className="">
                <button type="submit" className="" >Register</button>
              </div>
            </form>
            <p className="">
              Already have an account? <Link to="/">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
