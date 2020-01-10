import React, { Component} from 'react'
import weather from 'openweather-apis';

weather.setLang('en');
weather.setAPPID('b4d5e2d0b482d6809b784b136a4c69ac');

class Weather extends Component {
  constructor(props) {
    super(props)

    this.state= {
      lat: 0,
      lon: 0,
      location: "",
      description: "",
      icon: "",
      temperature: 0
    }
  }

  getWeather = () => {
    weather.getAllWeather((err, JSONObj) => {
      this.setState({
        location: JSONObj.name,
        description: JSONObj.weather[0].description,
        icon: JSONObj.weather[0].icon,
        temperature: JSONObj.main.temp,
      })
    });
  }

  setCoordinates = () => {
    weather.setCoordinate(this.state.lat, this.state.lon);
    this.getWeather()
  }

  geolocate = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    const success = (pos) => {
      this.setState({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })
      this.setCoordinates();
    }
    const error = (err) => {
      console.log(err)
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }


  componentDidMount () {
    this.geolocate()
    weather.getAllWeather((err, JSONObj) => {
      this.setState({
        location: JSONObj.name,
        description: JSONObj.weather[0].description,
        icon: JSONObj.weather[0].icon,
        temperature: JSONObj.main.temp,
      })
    });
  }

  render() {
    const location = this.state.location
    const description = this.state.description
    const temperature = Math.round(this.state.temperature)
    const image = <img src={`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt=""/>
    return(
      <div className="dashboard-card">
        <div className="dashboard-card-title">
          <h2>Weather</h2>
        </div>
        <div className="dashboard-card-contents">
          <div className="weather">
            {image}
            <div>
              <h4 className="location">{location}</h4>
              <p>{description}</p>
              <p>{temperature}°C</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Weather
