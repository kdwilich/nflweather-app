import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: []
    };
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
    document.body.style.color = null;
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#282c34";
    document.body.style.color = "white";
    this.getSchedules();
  }

  getSchedules = _ => {
    fetch("https://feeds.nfl.com/feeds-rs/schedules.json")
      .then(response => response.json())
      .then(response => this.setState({ schedules: response.gameSchedules }))
      .catch(err => console.error(err));
  };

  renderSchedules = ({
    gameDate,
    seasonType,
    gameId,
    gameTimeLocal,
    homeTeamAbbr,
    visitorTeamAbbr,
    week
  }) => (
    <div key={gameId}>
      {seasonType === "REG" && week === 15 && (
        <div>
          {homeTeamAbbr} vs {visitorTeamAbbr} on {gameDate} at &nbsp;
          {this.formatTime(gameTimeLocal)}
          <br />
          &nbsp;
        </div>
      )}
    </div>
  );

  formatTime(time) {
    time = time.split(":");
    let hour = parseInt(time[0].substring(0, 2), 10);
    let timeOfDay;
    hour < 12 ? (timeOfDay = "AM") : (timeOfDay = "PM");
    hour = ((hour + 11) % 12) + 1;

    return `${hour.toString()}:${time[1]} ${timeOfDay}`;
  }

  render() {
    const { schedules } = this.state;
    // /schedules.map(this.renderSchedules)
    return <div>{schedules.map(this.renderSchedules)}</div>;
  }
}

export default App;
