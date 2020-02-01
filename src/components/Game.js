import React, { Component } from "react";
import Forecast from "./Forecast";
import PropTypes from "prop-types";

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
      <tbody>
        <tr>
          <td style={{ width: "10%", textAlign: "right" }}>
            {this.formatTime(gameTimeEastern, "central")}
          </td>
          <td style={{ width: "25%", textAlign: "right" }}>
            {homeDisplayName}
          </td>
          <td style={{ width: "10%", textAlign: "center" }}>VS</td>
          <td style={{ width: "25%", textAlign: "left" }}>
            {visitorDisplayName}
          </td>
          <Forecast location={this.props.game} />
        </tr>
      </tbody>
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
