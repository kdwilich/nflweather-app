import React, { Component } from "react";
import Forecast from "./Forecast";
import PropTypes from "prop-types";
import "./styles/game-tile.scss";

class Game extends Component {
  state = {
    game: [],
    forecast: [],
    showGameDetails: false
  };

  setForecast = forecast => {
    this.setState({ forecast: forecast.currently });
  };

  render() {
    const {
      homeDisplayName,
      visitorDisplayName,
      gameTimeEastern,
      gameKey,
      networkChannel,

    } = this.props.game;
    const { roofType, siteCity, siteState, siteFullname, } = this.props.game.site;
    const { visibility, windSpeed } = this.state.forecast;
    return (
      <div
        className={`tile ${
          this.state.showGameDetails ? "selected" : "default"
          }`}
        onClick={() =>
          this.setState(prevState => ({
            showGameDetails: !prevState.showGameDetails
          }))
        }
      >
        {this.state.showGameDetails ? (
          <table style={{ width: "100%", overflowY: "scroll" }}>
            <tbody>
              <Forecast
                location={this.props.game}
                setForecast={this.setForecast}
              />
            </tbody>
          </table>
        ) : (
            <React.Fragment>
              <div>{visitorDisplayName}</div>
              <div> @ </div>
              <div>{homeDisplayName}</div>
              <div className="header" align="center">
                {siteFullname} <br></br>
                ({roofType})
              </div>

            </React.Fragment>
          )
        }
      </div>
    );
  }

  formatTime = (time, zone) => {
    time = time.split(":");
    let hour = parseInt(time[0].substring(0, 2), 10);
    let timeOfDay;
    hour < 12 ? (timeOfDay = "AM") : (timeOfDay = "PM");
    switch (zone) {
      case "central":
        hour = hour - 1;
        break;
      case "mountain":
        hour = hour - 2;
        break;
      case "pacific":
        hour = hour - 3;
        break;
      default:
        //eastern
        break;
    }

    hour = ((hour + 11) % 12) + 1;

    return `${hour.toString()}:${time[1]} ${timeOfDay}`;
  };
}

Game.propTypes = {
  game: PropTypes.object.isRequired
};

export default Game;
