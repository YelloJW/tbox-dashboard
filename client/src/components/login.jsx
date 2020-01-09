import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import history from '../history';

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
      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        history.push('/dashboard');
      }
    })
    .catch(err => {
      this.setState({
        errors: err.response.data
      })
      console.log(this.state.errors)
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
          <div className="row">
            <div className="col-3 offset-2 form-group">
              <label htmlFor="email">Email</label>
              <input className="form-control-plaintext" onChange={this.onChange} value={this.state.email} error={this.state.errors.email} id="email" type="text"/>
            </div>
            <div className="col-3 offset-2 form-group">
              <label htmlFor="password">Password</label>
              <input className="form-control-plaintext" onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password"/>
            </div>
          </div>
          <div className="row form-errors">
            <div className="form-error col-3 offset-2">
              {this.state.errors.email}
            </div>
            <div className="form-error col-3 offset-2" >
              {this.state.errors.password}
            </div>
          </div>
          <div className="row">
            <div className="col-12 ">
              <button type="submit" className="btn-tbox" >Login</button>
            </div>
          </div>
        </form>

        <br/>
        <p className="redirect-to-register">
          New to the challenge? <Link to="/register">Sign up</Link>
        </p>
      </div>
    );
  }
}


export default Login;
