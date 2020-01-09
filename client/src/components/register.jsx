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
      profileImg: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onFileChange = e => {
      this.setState({ [e.target.id]: e.target.files[0] })
      console.log(e.target.files[0])
  };

  onSubmit = e => {
    console.log(this.state.profileImg)
    e.preventDefault();

    const formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('email', this.state.email)
    formData.append('password', this.state.password)
    formData.append('password2', this.state.password2)
    formData.append('profileImg', this.state.profileImg)
    console.log(formData)

    axios.post('http://localhost:5000/api/users/register', formData)
    .then(res => {
      console.log(res)
      if (res.data) {
        console.log("successful registration")
        console.log(res.data)
        history.push('/');
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
        <form noValidate onSubmit={this.onSubmit} encType="multipart/form-data">
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
          <div className="row form-errors">
            <div className="form-error col-3 offset-2">
              {this.state.errors.name}
            </div>
            <div className="form-error col-3 offset-2" >
              {this.state.errors.email}
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
          <div className="row form-errors">
            <div className="form-error col-3 offset-2">
              {this.state.errors.password}
            </div>
            <div className="form-error col-3 offset-2" >
              {this.state.errors.password2}
            </div>
          </div>
          <label className="profile-upload-label" htmlFor="profileImg">+</label>
          <input className="profile-upload" id="profileImg" type="file" onChange={this.onFileChange}/>
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
