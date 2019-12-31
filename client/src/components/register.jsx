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
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Dev Challenege</h1>
          </div>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="row pt-5">
            <div className="col-4 offset-2 form-group">
              <label htmlFor="name">Username</label>
              <input className="form-control-plaintext" onChange={this.onChange} value={this.state.name} error={errors.name} id="name" type="text"/>
            </div>
            <div className="col-4 offset-1 form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control-plaintext" onChange={this.onChange} value={this.state.email} error={errors.email} id="email" type="email"/>
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-4 offset-2 form-group">
              <label htmlFor="password">Password</label>
              <input className="form-control-plaintext" onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password"/>
            </div>
            <div className="col-4 offset-1 form-group">
              <label htmlFor="password2">Confirm password</label>
              <input className="form-control-plaintext" onChange={this.onChange} value={this.state.password2} error={errors.password2} id="password2" type="password" />
            </div>
          </div>
          <div className="row">
            <div className="col-12 ">
              <button type="submit" className="btn-tbox" >Register</button>
            </div>
          </div>
        </form>
        <br/>
        <p className="redirect-to-register">
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </div>

    );
  }
}
export default Register;
