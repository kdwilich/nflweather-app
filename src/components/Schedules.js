import React, { Component } from "react";
import PropTypes from "prop-types";
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
      <table style={{ width: "100%" }}>
        <tbody>
          {schedules.map(scheduledGame => {
            return (
              <React.Fragment key={scheduledGame.gameKey}>
                {scheduledGame.gameId % 100 === 0 && (
                  <tr>
                    <td>{scheduledGame.gameDate}</td>
                  </tr>
                )}
                <Game game={scheduledGame} key={scheduledGame.gameKey} />
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Schedules.propTypes = {
  schedules: PropTypes.array.isRequired
};

export default Schedules;
