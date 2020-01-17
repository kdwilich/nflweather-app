import React, { Component } from "react";
import axios from "axios";

export class Forecast extends Component {
  state = {
    forecast: {
      currently: { temperature: "0" }
    }
  };

  getCoords = ({ siteCity, siteState }) => {
    if (siteCity !== undefined && siteState !== undefined) {
      axios
        .get(
          `https://us1.locationiq.com/v1/search.php?key=f3bb1afca12686&q=${siteCity}%20${siteState}&format=json`
        )
        .then(response => this.getForecast(response.data[0]))
        .catch(err => console.log(err));
    }
  };

  getForecast = ({ lat, lon }) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios
      .get(
        `${proxyurl}https://api.darksky.net/forecast/1512a2f8760252dca8cff32c45157989/${lat},${lon}`
      )
      .then(res => this.setState({ forecast: res.data }))
      .catch(err => console.log(err));
  };

  displayWeather = location => {
    this.getCoords(location);
  };

  componentDidMount() {
    const { siteCity, siteState } = this.props.location;
    this.displayWeather({ siteCity, siteState });
  }

  render() {
    const { siteCity, siteState } = this.props.location;
    let temp = this.state.forecast.currently.temperature;
    console.log(this.state.forecast);
    return (
      <div>
        &nbsp;&nbsp;&nbsp;&nbsp; Current Temperature in {siteCity}, {siteState}
        :&nbsp;
        {temp !== "0" && temp}
        <br />
      </div>
    );
  }
}

export default Forecast;
