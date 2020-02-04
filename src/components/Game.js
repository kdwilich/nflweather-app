import React, { Component } from "react";
import Forecast from "./Forecast";
import PropTypes from "prop-types";
import { Table, Accordion } from "react-bootstrap";

export class Game extends Component {
  state = {
    game: [],
    forecast: []
  };

  setForecast = (forecast) => {
    this.setState({ forecast: forecast.currently });
  }

  render() {
    const {
      homeDisplayName,
      visitorDisplayName,
      gameTimeEastern,
      gameKey,
      networkChannel
    } = this.props.game;
    const {
      roofType,
      siteCity,
      siteState
    } = this.props.game.site;
    const { visibility, windSpeed } = this.state.forecast;
    return (
      <tr>
        <td>
          <Accordion
            defaultActiveKey="1"
            key={gameKey}
          >
            <Accordion.Toggle
              as={Table}
              style={{ margin: 0 }}
              eventKey={gameKey}
            >
              <tbody>
                <tr>
                  <td style={{ width: "10%", textAlign: "right" }}>
                    {this.formatTime(gameTimeEastern, "central")}
                  </td>
                  <td style={{ width: "20%", textAlign: "right" }}>
                    {homeDisplayName}
                  </td>
                  <td style={{ width: "10%", textAlign: "center" }}>VS</td>
                  <td style={{ width: "20%", textAlign: "left" }}>
                    {visitorDisplayName}
                  </td>
                  <Forecast location={this.props.game} setForecast={this.setForecast} />
                </tr>
              </tbody>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={gameKey}>
              <table style={{ width: "100%", backgroundColor: "#e3e3e3" }}>
                <tbody>
                  <tr>
                    <td>
                      Location: {siteCity}, {siteState}
                    </td>
                    <td>
                      TV: {networkChannel}
                    </td>
                    <td>
                      Visibility: {visibility} miles
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      Stadium: {roofType}
                    </td>
                    <td>
                      Windspeed: {windSpeed} mph
                    </td>
                  </tr>
                </tbody>
              </table>
            </Accordion.Collapse>
          </Accordion>
        </td>
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
