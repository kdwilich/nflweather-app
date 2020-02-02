import React, { Component } from "react";
import Forecast from "./Forecast";
import PropTypes from "prop-types";
import { Table, Card, Accordion } from "react-bootstrap";

export class Game extends Component {
  state = {
    game: [],
    forecast: []
  };

  setForecast = (forecast) => {
    this.setState({ forecast: forecast.current });
  }

  render() {
    const {
      homeDisplayName,
      visitorDisplayName,
      gameTimeEastern,
      gameDate,
      gameKey
    } = this.props.game;
    // const { visibility, windSpeed } = this.state.forecast;
    // const { siteCity, siteState } = this.props.game.site;
    return (
      <React.Fragment>
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
                  <Forecast location={this.props.game} setForecast={this.setForecast} />
                </tr>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={gameKey}>
                <Table>
                  <tr style={{ backgroundColor: "#C9C9C9" }}>
                    {/* <td>
                      {visibility}
                    </td>
                    <td>
                      {windSpeed}
                    </td> */}
                  </tr>
                </Table>
              </Accordion.Collapse>
            </Accordion>
          </td>
        </tr>
      </React.Fragment>
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
