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
    let gameDate = this.props.location.gameDate.split("/")
    // reformats MM/DD/YYYY to YYYY-MM-DD
    let date = `${gameDate[2]}-${gameDate[0]}-${gameDate[1]}`

    this.getCoords({ siteCity, date, gameTimeLocal })
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
    let { temperature, summary, icon } = this.state.forecast.currently;
    icon = icon.replace(new RegExp("-", "g"), "_");
    return (
      <React.Fragment>
        <td
          style={{ width: "15%", textAlign: "right" }}
        >
          {Math.round(temperature)}°F
        </td>
        <td style={{ width: "5%", textAlign: "center" }}>
          <ReactAnimatedWeather
            icon={icon.toUpperCase()}
            color={"#212529"}
            size={24}
            animate={true}
          />
        </td>
        <td style={{ width: "15%", textAlign: "left" }}>{summary}</td>
      </React.Fragment>
    );
  }
}

export default Forecast;
