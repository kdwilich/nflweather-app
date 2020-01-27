import React, { Component } from "react";
import PropTypes from "prop-types";
import Forecast from "./Forecast";

export class Game extends Component {
  state = {
    game: []
  };

  render() {
    const {
      homeDisplayName,
      visitorDisplayName,
      gameTimeEastern,
      gameDate
    } = this.props.game;
    // const { siteCity, siteState } = this.props.game.site;
    return (
      <tr>
        <td style={{ textAlign: "right" }}>{homeDisplayName}</td>
        <td style={{ textAlign: "center" }}>VS</td>
        <td style={{ textAlign: "left" }}>{visitorDisplayName}</td>
        <td style={{ textAlign: "right" }}>
          {this.formatTime(gameTimeEastern, "central")}
        </td>
        {/* <Forecast /> */}
      </tr>
    );
  }

  formatTime(time, zone) {
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
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired
};

export default Game;
