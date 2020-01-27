import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Card, Accordion } from "react-bootstrap";
import Game from "./Game";

export class Schedules extends Component {
  state = {
    schedules: []
  };

  compare = (a, b) => {
    let comparison = 0;
    if (a.gameId > b.gameId) {
      comparison = 1;
    } else if (a.gameId < b.gameId) {
      comparison = -1;
    }
    return comparison;
  };

  render() {
    const { schedules } = this.props;

    schedules.sort(this.compare);

    return (
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <tbody>
            {schedules.map(scheduledGame => {
              return (
                <React.Fragment>
                  {scheduledGame.gameId % 100 === 0 && (
                    <div>{scheduledGame.gameDate}</div>
                  )}
                  <Accordion defaultActiveKey="1">
                    <Accordion.Toggle as={Table} eventKey={scheduledGame.gameKey} key={scheduledGame.gameKey}>
                      <Game game={scheduledGame} />
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={scheduledGame.gameKey}>
                      <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                  </Accordion></React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Schedules.propTypes = {
  schedules: PropTypes.array.isRequired
};

export default Schedules;
