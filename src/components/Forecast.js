import React, { Component } from "react";
import axios from "axios";
import SITES from "../assets/CityCoords";
import ReactAnimatedWeather from "react-animated-weather";

export class Forecast extends Component {
  state = {
    forecast: {
      currently: {
        temperature: "0",
        summary: null,
        icon: "CLEAR_DAY"
      }
    }
  };

  getCoords = ({ siteCity, siteState }) => {
    // if (siteCity !== undefined && siteState !== undefined) {
    //   axios
    //     .get(
    //       `https://us1.locationiq.com/v1/search.php?key=f3bb1afca12686&q=${siteCity}%20${siteState}&format=json`
    //     )
    //     .then(response => this.getForecast(response.data[0]))
    //     .catch(err => console.log(err));
    // } else if (siteCity !== undefined) {
    //   axios
    //     .get(
    //       `https://us1.locationiq.com/v1/search.php?key=f3bb1afca12686&q=${siteCity}&format=json`
    //     )
    //     .then(response => this.getForecast(response.data[0]))
    //     .catch(err => console.log(err));
    // }
    // console.log(siteCity, siteState);
    // SITES.map(site => console.log(site));
    const location = SITES.filter(site => site.city === siteCity);

    this.getForecast(location[0]);
  };

  // set up my own cors-anywhere heroku to not get throttled
  getForecast = ({ latitude, longitude }) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios
      .get(
        `${proxyurl}https://api.darksky.net/forecast/1512a2f8760252dca8cff32c45157989/${latitude},${longitude}`
      )
      .then(res => {
        this.setState({ forecast: res.data });
        this.props.setForecast(this.state.forecast);
      })
      .catch(err => console.log(err));
  };

  displayWeather = location => {
    this.getCoords(location);
  };

  componentDidMount() {
    const { siteCity, siteState } = this.props.location.site;
    this.displayWeather({ siteCity, siteState });
  }

  toCelsius(temp) {
    return parseInt((temp - 273.15) * 10) / 10 + "°C";
  }

  render() {
    let { temperature, summary, icon } = this.state.forecast.currently;
    icon = icon.replace(new RegExp("-", "g"), "_");
    console.log(icon);
    return (
      <React.Fragment>
        <td style={{ width: "15%", textAlign: "left" }}>{summary}</td>
        <td style={{ width: "15%", textAlign: "right" }}>{temperature}°F</td>
        <td>
          <ReactAnimatedWeather
            icon={icon.toUpperCase()}
            color={"#212529"}
            size={32}
            animate={true}
          />
        </td>
      </React.Fragment>
    );
  }
}

export default Forecast;
