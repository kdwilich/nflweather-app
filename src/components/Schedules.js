import React, { Component } from "react";
import PropTypes from "prop-types";
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
      <div>
        {schedules.map(scheduledGame => {
          return (
            <div key={scheduledGame.gameKey}>
              {scheduledGame.gameId % 100 === 0 && (
                <div>{scheduledGame.gameDate}</div>
              )}
              <Game game={scheduledGame} />
            </div>
          );
        })}
      </div>
    );
  }
}

Schedules.propTypes = {
  schedules: PropTypes.array.isRequired
};

export default Schedules;
