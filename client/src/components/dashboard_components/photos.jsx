import React, { Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      photo: "",
      photos: []
    }
  }

  componentDidMount () {
    axios.post('http://localhost:5000/api/photos/photos', {user: this.state.user})
    .then(res => {
      this.setState({
        photos: res.data.slice(0,4)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const photos = this.state.photos
    const photoElements = photos.map(photo => <img className="photo-thumbnail" key={photo._id} src={photo.path} alt=""/>)
    return(
      <Link to={"/photos"}>
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            <h2>Photos</h2>
          </div>
          <div className="dashboard-card-contents">
            <div className="photo-thumbnail-container">
            {photoElements}
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default Photos
