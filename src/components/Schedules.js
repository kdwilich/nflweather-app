import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Card, Accordion } from "react-bootstrap";
import Forecast from "./Forecast";
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
    // this.props.schedules[0]

    schedules.sort(this.compare);

    return (
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <tbody>
            {schedules.map(scheduledGame => {
              return (
                <React.Fragment>
                  {scheduledGame.gameId % 100 === 0 && (
                    <tr>
                      <td>{scheduledGame.gameDate}</td>
                    </tr>
                  )}
                  <tr>
                    <td>
                      <Accordion
                        defaultActiveKey="1"
                        key={scheduledGame.gameKey}
                      >
                        <Accordion.Toggle
                          as={Table}
                          eventKey={scheduledGame.gameKey}
                          onClick={() => {
                            console.log("click", scheduledGame.gameKey);
                          }}
                        >
                          <Game game={scheduledGame} />
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={scheduledGame.gameKey}>
                          <Card.Body
                            style={{ backgroundColor: "#999" }}
                          ></Card.Body>
                        </Accordion.Collapse>
                      </Accordion>
                    </td>
                  </tr>
                </React.Fragment>
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
