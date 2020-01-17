import React, { Component } from "react";
import PropTypes from "prop-types";
import Game from "./Game";

export class Schedules extends Component {
  state = {
    schedules: []
  };

  render() {
    return (
      <div>
        {this.props.schedules.map(scheduledGame => (
          // <div>{scheduledGame.homeDisplayName}</div>
          <Game key={scheduledGame.gameKey} game={scheduledGame} />
        ))}
      </div>
    );
  }
}

Schedules.propTypes = {
  schedules: PropTypes.array.isRequired
};

export default Schedules;
