import React, { Component } from "react";
import Header from "./components/layout/Header";
import Schedules from "./components/Schedules";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    schedules: []
    // schedules: [
    //   {
    //     season: 2019,
    //     seasonType: "PRE",
    //     week: 0,
    //     gameId: 2019080151,
    //     gameKey: 57835,
    //     gameDate: "08/01/2019",
    //     gameTimeEastern: "20:00:00",
    //     gameTimeLocal: "20:00:00",
    //     isoTime: 1564704000000,
    //     homeTeamId: "0200",
    //     visitorTeamId: "1400",
    //     homeTeamAbbr: "ATL",
    //     visitorTeamAbbr: "DEN",
    //     homeDisplayName: "Atlanta Falcons",
    //     visitorDisplayName: "Denver Broncos",
    //     homeNickname: "Falcons",
    //     visitorNickname: "Broncos",
    //     gameType: "PRE",
    //     weekNameAbbr: "HOF",
    //     weekName: "Hall of Fame Week",
    //     visitorTeam: {
    //       season: 2019,
    //       teamId: "1400",
    //       abbr: "DEN",
    //       cityState: "Denver",
    //       fullName: "Denver Broncos",
    //       nick: "Broncos",
    //       teamType: "TEAM",
    //       conferenceAbbr: "AFC",
    //       divisionAbbr: "ACW"
    //     },
    //     homeTeam: {
    //       season: 2019,
    //       teamId: "0200",
    //       abbr: "ATL",
    //       cityState: "Atlanta",
    //       fullName: "Atlanta Falcons",
    //       nick: "Falcons",
    //       teamType: "TEAM",
    //       conferenceAbbr: "NFC",
    //       divisionAbbr: "NCS"
    //     },
    //     site: {
    //       siteId: 1900,
    //       siteCity: "Canton",
    //       siteFullname: "Tom Benson Hall of Fame Stadium",
    //       siteState: "OH",
    //       roofType: "OUTDOOR"
    //     },
    //     networkChannel: "NBC"
    //   }
    //   // {
    //   //   season: 2019,
    //   //   seasonType: "PRE",
    //   //   week: 1,
    //   //   gameId: 2019080853,
    //   //   gameKey: 57838,
    //   //   gameDate: "08/08/2019",
    //   //   gameTimeEastern: "19:00:00",
    //   //   gameTimeLocal: "19:00:00",
    //   //   isoTime: 1565305200000,
    //   //   homeTeamId: "0610",
    //   //   visitorTeamId: "2200",
    //   //   homeTeamAbbr: "BUF",
    //   //   visitorTeamAbbr: "IND",
    //   //   homeDisplayName: "Buffalo Bills",
    //   //   visitorDisplayName: "Indianapolis Colts",
    //   //   homeNickname: "Bills",
    //   //   visitorNickname: "Colts",
    //   //   gameType: "PRE",
    //   //   weekNameAbbr: "P1",
    //   //   weekName: "Preseason Week 1",
    //   //   visitorTeam: {
    //   //     season: 2019,
    //   //     teamId: "2200",
    //   //     abbr: "IND",
    //   //     cityState: "Indianapolis",
    //   //     fullName: "Indianapolis Colts",
    //   //     nick: "Colts",
    //   //     teamType: "TEAM",
    //   //     conferenceAbbr: "AFC",
    //   //     divisionAbbr: "ACS"
    //   //   },
    //   //   homeTeam: {
    //   //     season: 2019,
    //   //     teamId: "0610",
    //   //     abbr: "BUF",
    //   //     cityState: "Buffalo",
    //   //     fullName: "Buffalo Bills",
    //   //     nick: "Bills",
    //   //     teamType: "TEAM",
    //   //     conferenceAbbr: "AFC",
    //   //     divisionAbbr: "ACE"
    //   //   },
    //   //   site: {
    //   //     siteId: 3770,
    //   //     siteCity: "Orchard Park",
    //   //     siteFullname: "New Era Field",
    //   //     siteState: "NY",
    //   //     roofType: "OUTDOOR"
    //   //   }
    //   // },
    //   // {
    //   //   season: 2019,
    //   //   seasonType: "PRE",
    //   //   week: 1,
    //   //   gameId: 2019080860,
    //   //   gameKey: 57846,
    //   //   gameDate: "08/08/2019",
    //   //   gameTimeEastern: "19:00:00",
    //   //   gameTimeLocal: "19:00:00",
    //   //   isoTime: 1565305200000,
    //   //   homeTeamId: "3410",
    //   //   visitorTeamId: "3430",
    //   //   homeTeamAbbr: "NYG",
    //   //   visitorTeamAbbr: "NYJ",
    //   //   homeDisplayName: "New York Giants",
    //   //   visitorDisplayName: "New York Jets",
    //   //   homeNickname: "Giants",
    //   //   visitorNickname: "Jets",
    //   //   gameType: "PRE",
    //   //   weekNameAbbr: "P1",
    //   //   weekName: "Preseason Week 1",
    //   //   visitorTeam: {
    //   //     season: 2019,
    //   //     teamId: "3430",
    //   //     abbr: "NYJ",
    //   //     cityState: "New York Jets",
    //   //     fullName: "New York Jets",
    //   //     nick: "Jets",
    //   //     teamType: "TEAM",
    //   //     conferenceAbbr: "AFC",
    //   //     divisionAbbr: "ACE"
    //   //   },
    //   //   homeTeam: {
    //   //     season: 2019,
    //   //     teamId: "3410",
    //   //     abbr: "NYG",
    //   //     cityState: "New York Giants",
    //   //     fullName: "New York Giants",
    //   //     nick: "Giants",
    //   //     teamType: "TEAM",
    //   //     conferenceAbbr: "NFC",
    //   //     divisionAbbr: "NCE"
    //   //   },
    //   //   site: {
    //   //     siteId: 3757,
    //   //     siteCity: "East Rutherford",
    //   //     siteFullname: "MetLife Stadium",
    //   //     siteState: "NJ",
    //   //     roofType: "OUTDOOR"
    //   //   },
    //   //   networkChannel: "NFL NETWORK"
    //   // }
    // ]
  };

  componentDidMount() {
    axios
      .get("https://feeds.nfl.com/feeds-rs/schedules.json")
      .then(response =>
        this.setState({ schedules: response.data.gameSchedules })
      )
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <Schedules schedules={this.state.schedules} />
      </div>
    );
  }
}

export default App;
