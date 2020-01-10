import React, { Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      photos: [],
    }
  }

  componentDidMount () {
    axios.post('http://localhost:5000/api/photos/photos', {userId: this.state.user._id})
    .then(res => {
      this.setState({
        photos: res.data,
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const photoCount = this.state.photos.length
    const previewPhotos = this.state.photos.slice(0,4)
    const photoComponents = previewPhotos.map(photo => <img className="photo-thumbnail" key={photo._id} src={photo.path} alt=""/>)
    const photoPlaceholder = <img className="photo-thumbnail" src="https://carepharmaceuticals.com.au/wp-content/uploads/sites/19/2018/02/placeholder-600x400.png" alt=""/>
    return(
      <Link to={"/photos"}>
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            <h2>Photos ({photoCount})</h2>
          </div>
          <div className="dashboard-card-contents">
            <div className="photo-thumbnail-container">
              {photoComponents}
              {photoCount < 1 ? photoPlaceholder : ""}
              {photoCount < 2 ? photoPlaceholder : ""}
              {photoCount < 3 ? photoPlaceholder : ""}
              {photoCount < 4 ? photoPlaceholder : ""}
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default Photos
