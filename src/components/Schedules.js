import React, { Component } from "react";
import PropTypes from "prop-types";
import Game from "./Game";

export class Schedules extends Component {
  state = {
    schedules: []
  };

  render() {
    const { schedules } = this.props;
    return (
      <div>
        {schedules.map(scheduledGame => {
          return (
            <div>
              <div>{scheduledGame.gameDate}</div>
              <Game key={scheduledGame.gameKey} game={scheduledGame} />
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
