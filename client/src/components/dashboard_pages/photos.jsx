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
    // this.submitForm = React.createRef()
    this.file= React.createRef()
  }


  onFileChange = e => {
    this.setState({ [e.target.id]: e.target.files[0] })
    // this.submitForm.current.submit()
  };

  onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
      formData.append('photo', this.state.photo);
      formData.append('userId', this.state.user._id);
      axios.post('http://localhost:5000/api/photos/upload', formData)
      .catch(err => {
      console.log(err)
      })
    this.file.current.value = null;
  };

  componentDidMount () {
    axios.post('http://localhost:5000/api/photos/photos', {userId: this.state.user._id})
    .then(res => {
      this.setState({
        photos: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidUpdate(prevProps, prevState) {
  if (prevState.photos !== this.state.photos) {
    this.componentDidMount()
  }
}

  render() {
    const photos = this.state.photos
    const photoComponents = photos.map(photo => <img className="photo" key={photo._id} src={photo.path} alt=""/>)
    return (
      <div className="container">
        <h1 className="page-heading">Photos</h1>
        <div className="photo-container">
          <div className="photo">
            <form ref={this.submitForm} onSubmit={this.onSubmit} encType="multipart/form-data">
              <label htmlFor="photo"></label>
              <input ref={this.file} className="" onChange={this.onFileChange} id="photo" type="file" required/>
              <button type="submit" className="btn-tbox" >save</button>
            </form>
          </div>
          {photoComponents}
        </div>
      </div>
    )
  }
}

export default Photo


