import React, { Component } from "react";
import "./App.css";
import SITES from "./assets/CityCoords";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
      forecast: [],
      coords: []
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

  getForecast = _ => {
    const lat = this.state.coords[0].lat;
    const lon = this.state.coords[0].lon;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(
      `${proxyurl}https://api.darksky.net/forecast/1512a2f8760252dca8cff32c45157989/${lat},${lon}`
    )
      .then(response => response.json())
      // .then(response => console.log(response))
      .then(response => this.setState({ forecast: response }))
      .catch(function(error) {
        console.log("Request failed", error);
      });
  };

  getCoords = (city, state) => {
    console.log(city, state);
    fetch(
      `https://us1.locationiq.com/v1/search.php?key=f3bb1afca12686&q=${city}%20${state}&format=json`
    )
      .then(response => response.json())
      .then(response => this.setState({ coords: response }));
    // return <div>{this.state.coords[0].lat}, {this.state.coords[0].lon}</div>;
    //error in return^
  };

  renderSchedules = ({
    gameDate,
    seasonType,
    gameId,
    gameTimeEastern,
    homeTeamAbbr,
    visitorTeamAbbr,
    week
  }) => (
    <div key={gameId}>
      {seasonType === "REG" && week === 15 && (
        <div>
          {homeTeamAbbr} vs {visitorTeamAbbr} on {gameDate} at{" "}
          {this.formatTime(gameTimeEastern, "central")}
          <br />
          &nbsp;
        </div>
      )}
    </div>
  );

  renderStadiumLocations = ({ siteId, siteCity, siteState }) => (
    <div key={siteId}>
      {(siteState && (
        <span>
          {siteCity}, {siteState}
        </span>
      )) || <span>{siteCity}</span>}
      <button onClick={this.getCoords.bind(this, siteCity, siteState)}>
        Coords
      </button>
      {/* {this.state.coords.length > 0 && console.log(this.state.coords[0].lat, this.state.coords[0].lon)} */}
      {/* {this.state.coords.map(x => <div>{x.lat}, {x.lon}</div>)} */}
      {this.state.coords.length > 0 && (
        <div>
          {this.state.coords[0].lat}, {this.state.coords[0].lon}
        </div>
      )}
      <button onClick={this.getForecast.bind(this)}>Forecast</button>
      {this.state.forecast.length > 0 && (
        <div>
          {console.log(this.state.forecast)}
          {this.state.forecast.map(x => (
            <div>{x.currently.summary}</div>
          ))}
        </div>
      )}
      <br />
    </div>
  );

  render() {
    const { schedules, forecast } = this.state;
    const distinctStadiums = this.getUniqueStadiums({ schedules });
    return (
      <div>
        <div>
          {/* {distinctStadiums.map(this.renderStadiumLocations)} */}
          {distinctStadiums[0] !== undefined &&
            this.renderStadiumLocations(distinctStadiums[4])}
        </div>
      </div>
    );
  }

  getUniqueStadiums({ schedules }) {
    return Array.from(new Set(schedules.map(x => x.site.siteId))).map(id => {
      let site = schedules.find(y => y.site.siteId === id).site;
      return {
        siteId: id,
        siteCity: site.siteCity,
        siteState: site.siteState
      };
    });
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

export default App;
