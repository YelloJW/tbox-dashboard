import React, { Component} from 'react';
import axios from 'axios';


class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      photo: "",
      photos: []
    }
  }


  onFileChange = e => {
    this.setState({ [e.target.id]: e.target.files[0] })
  };

  onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('photo', this.state.photo)
    formData.append('user', this.state.user.email)
    axios.post('http://localhost:5000/api/photos/upload', formData)
    .catch(err => {
      console.log(err)
    })
    document.location.reload()
  };

  componentDidMount () {
    axios.post('http://localhost:5000/api/photos/photos', {user: this.state.user})
    .then(res => {
      this.setState({
        photos: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const photos = this.state.photos
    const photoElements = photos.map(photo => <img className="photo" key={photo._id} src={photo.path} alt=""/>)
    return (
      <div className="container">
        <h1 className="page-heading">Your photos</h1>
        <div className="photo-container">
          <div className="photo">
            <form ref="formToSubmit" onSubmit={this.onSubmit} encType="multipart/form-data">
              <label htmlFor="photo"></label>
              <input className="" onChange={this.onFileChange} id="photo" type="file"/>
              <button type="submit" className="btn-tbox" >save</button>
            </form>
          </div>
          {photoElements}
        </div>
      </div>
    )
  }
}

export default Photo


