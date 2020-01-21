import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Container, Col } from "react-bootstrap";
// import Forecast from "./Forecast";

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
      <Container>
        <Row>
          <Col>
            {homeDisplayName} vs {visitorDisplayName}
          </Col>
          <Col style={{ textAlign: "right" }}>
            {this.formatTime(gameTimeEastern, "central")}
          </Col>
          {/* <Forecast location={{ siteCity, siteState }} /> */}
        </Row>
      </Container>
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
