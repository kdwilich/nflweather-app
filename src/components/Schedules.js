import React, { Component } from "react";
import PropTypes from "prop-types";
import Game from "./Game";
import { Table } from "react-bootstrap";

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
      <div style={styles.container}>
        {schedules.map(scheduledGame => {
          return (
            <React.Fragment key={scheduledGame.gameKey}>
              {scheduledGame.gameId % 100 === 0 && (
                <div style={styles.date}>{scheduledGame.gameDate}</div>
              )}
              <Game game={scheduledGame} />
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

const styles = {
  container: {
    width: "175%",
    display: "flex",
    flexWrap: "wrap",
    padding: 10,
    marginLeft: - 250,
    justifyContent: "Left",
  },
  date: { flexBasis: "100%", color: "#ffc107", fontSize: "20px" }
};

Schedules.propTypes = {
  schedules: PropTypes.array.isRequired
};

export default Schedules;
