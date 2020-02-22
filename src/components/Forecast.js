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

  componentDidMount() {
    const { siteCity } = this.props.location.site;
    const { gameTimeLocal } = this.props.location;
    let gameDate = this.props.location.gameDate.split("/");
    // reformats MM/DD/YYYY to YYYY-MM-DD
    let date = `${gameDate[2]}-${gameDate[0]}-${gameDate[1]}`;

    this.getCoords({ siteCity, date, gameTimeLocal });
  }

  getCoords = ({ siteCity, date, gameTimeLocal }) => {
    const location = SITES.filter(site => site.city === siteCity);

    this.getForecast(location[0], date, gameTimeLocal);
  };

  // set up my own cors-anywhere heroku to not get throttled
  getForecast = ({ latitude, longitude }, date, time) => {
    const proxyurl = "https://cors-anywhere-kw.herokuapp.com/";
    axios
      .get(
        `${proxyurl}https://api.darksky.net/forecast/1512a2f8760252dca8cff32c45157989/${latitude},${longitude},${date}T${time}`
      )
      .then(res => {
        this.setState({ forecast: res.data });
        this.props.setForecast(res.data);
      })
      .catch(err => console.log(err));
  };

  // convert = (temp) => {
  //   this.setState(prevState => ({
  //     forecast: {
  //       ...prevState.forecast,
  //       [prevState.forecast[0].currently.temperature]: (temp - 32) * 5 / 9
  //     },
  //   }));
  // }

  render() {
    let {
      temperature,
      apparentTemperature,
      summary,
      icon,
      precipIntensity,
      precipProbability,
      visibility,
      uvIndex,
      windGust,
      windSpeed,
      humidity,
      cloudCover
    } = this.state.forecast.currently;

    icon = icon.replace(new RegExp("-", "g"), "_");
    humidity = parseInt(humidity) * 100;
    precipProbability = parseInt(precipProbability) * 100;
    cloudCover = parseInt(cloudCover) * 100;
    precipIntensity = Math.round(precipIntensity);
    temperature = Math.round(temperature);
    apparentTemperature = Math.round(apparentTemperature);

    //add if indoors somewhere

    let imperialUnits = true;
    return (
      <React.Fragment>
        <tr>
          <td className="l featured" style={{ width: "33%" }}>
            {summary}
          </td>
          <td className="c" style={{ width: "33%" }}>
            <ReactAnimatedWeather
              icon={icon.toUpperCase()}
              color={"#fff"}
              size={60}
              animate={true}
            />
          </td>
          <td className="r featured" style={{ width: "33%" }}>
            {temperature} °{imperialUnits ? "F" : "C"}
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td colSpan="2">Feels-Like</td>
          <td className="r">
            {apparentTemperature} °{imperialUnits ? "F" : "C"}
          </td>
        </tr>
        <tr>
          <td colSpan="2">Precip Prob</td>
          <td className="r">{precipProbability}%</td>
        </tr>
        <tr>
          <td colSpan="2">Precip Rate</td>
          <td className="r">{precipIntensity} in/hr</td>
        </tr>
        <tr>
          <td colSpan="2">Wind Speed</td>
          <td className="r">{windSpeed} mph</td>
        </tr>
        <tr>
          <td colSpan="2">Wind Gust</td>
          <td className="r">{windGust} mph</td>
        </tr>
        <tr>
          <td colSpan="2">Humidity</td>
          <td className="r">{humidity}%</td>
        </tr>
        <tr>
          <td colSpan="2">Cloud Cover</td>
          <td className="r">{cloudCover}%</td>
        </tr>
        <tr>
          <td colSpan="2">Visibility</td>
          <td className="r">{visibility} mi</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Forecast;
