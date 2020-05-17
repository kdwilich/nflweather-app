import React, { Component } from "react";
import Schedules from "./components/Schedules";
import axios from "axios";
import { Dropdown, DropdownButton, ButtonToolbar } from "react-bootstrap";
import { Row, Container, Col, Table } from "react-bootstrap";
import "./App.css";

class App extends Component {
  state = {
    schedules: [],
    // schedules: [
    //   {
    //     season: 2019,
    //     seasonType: "REG",
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
    //   },
    //   {
    //     season: 2019,
    //     seasonType: "REG",
    //     week: 1,
    //     gameId: 2019080853,
    //     gameKey: 57838,
    //     gameDate: "08/08/2019",
    //     gameTimeEastern: "19:00:00",
    //     gameTimeLocal: "19:00:00",
    //     isoTime: 1565305200000,
    //     homeTeamId: "0610",
    //     visitorTeamId: "2200",
    //     homeTeamAbbr: "BUF",
    //     visitorTeamAbbr: "IND",
    //     homeDisplayName: "Buffalo Bills",
    //     visitorDisplayName: "Indianapolis Colts",
    //     homeNickname: "Bills",
    //     visitorNickname: "Colts",
    //     gameType: "PRE",
    //     weekNameAbbr: "P1",
    //     weekName: "Preseason Week 1",
    //     visitorTeam: {
    //       season: 2019,
    //       teamId: "2200",
    //       abbr: "IND",
    //       cityState: "Indianapolis",
    //       fullName: "Indianapolis Colts",
    //       nick: "Colts",
    //       teamType: "TEAM",
    //       conferenceAbbr: "AFC",
    //       divisionAbbr: "ACS"
    //     },
    //     homeTeam: {
    //       season: 2019,
    //       teamId: "0610",
    //       abbr: "BUF",
    //       cityState: "Buffalo",
    //       fullName: "Buffalo Bills",
    //       nick: "Bills",
    //       teamType: "TEAM",
    //       conferenceAbbr: "AFC",
    //       divisionAbbr: "ACE"
    //     },
    //     site: {
    //       siteId: 3770,
    //       siteCity: "Orchard Park",
    //       siteFullname: "New Era Field",
    //       siteState: "NY",
    //       roofType: "OUTDOOR"
    //     }
    //   },
    //   {
    //     season: 2019,
    //     seasonType: "REG",
    //     week: 1,
    //     gameId: 2019080860,
    //     gameKey: 57846,
    //     gameDate: "08/08/2019",
    //     gameTimeEastern: "19:00:00",
    //     gameTimeLocal: "19:00:00",
    //     isoTime: 1565305200000,
    //     homeTeamId: "3410",
    //     visitorTeamId: "3430",
    //     homeTeamAbbr: "NYG",
    //     visitorTeamAbbr: "NYJ",
    //     homeDisplayName: "New York Giants",
    //     visitorDisplayName: "New York Jets",
    //     homeNickname: "Giants",
    //     visitorNickname: "Jets",
    //     gameType: "PRE",
    //     weekNameAbbr: "P1",
    //     weekName: "Preseason Week 1",
    //     visitorTeam: {
    //       season: 2019,
    //       teamId: "3430",
    //       abbr: "NYJ",
    //       cityState: "New York Jets",
    //       fullName: "New York Jets",
    //       nick: "Jets",
    //       teamType: "TEAM",
    //       conferenceAbbr: "AFC",
    //       divisionAbbr: "ACE"
    //     },
    //     homeTeam: {
    //       season: 2019,
    //       teamId: "3410",
    //       abbr: "NYG",
    //       cityState: "New York Giants",
    //       fullName: "New York Giants",
    //       nick: "Giants",
    //       teamType: "TEAM",
    //       conferenceAbbr: "NFC",
    //       divisionAbbr: "NCE"
    //     },
    //     site: {
    //       siteId: 3757,
    //       siteCity: "East Rutherford",
    //       siteFullname: "MetLife Stadium",
    //       siteState: "NJ",
    //       roofType: "OUTDOOR"
    //     },
    //     networkChannel: "NFL NETWORK"
    //   }
    // ],
    possibleWeeks: [
      "Hall of Fame Week",
      "Preseason Week 1",
      "Preseason Week 2",
      "Preseason Week 3",
      "Preseason Week 4",
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
      "Week 8",
      "Week 9",
      "Week 10",
      "Week 11",
      "Week 12",
      "Week 13",
      "Week 14",
      "Week 15",
      "Week 16",
      "Week 17",
      "Wild Card Weekend",
      "Divisional Playoffs",
      "Conference Championships",
      "Pro Bowl",
      "Super Bowl"
    ],
    possibleSeasons: [
      "2019",
      "2018",
      "2017",
      "2016",
      "2015",
      "2014",
      "2013",
      "2012",
      "2011",
      "2010",
      "2009",
      "2008",
      "2007",
      "2006",
      "2005",
      "2004",
      "2003",
      "2002"
    ],
    selectedWeek: "Week 1", //make this the current week
    selectedSeason: "2019",
    scheduleByWeek: []
  };

  componentDidMount() {
    //set selected week to current week
    this.getSchedule();
  }

  getSchedule = () => {
    axios
      .get(
        `https://www.nfl.com/feeds-rs/schedules/${this.state.selectedSeason}.json`
      )
      .then(response =>
        this.setState({ schedules: response.data.gameSchedules })
      )
      .then(() => this.weekSelect(this.state.selectedWeek))
      .catch(err => console.error(err));
  };

  //TODO: set to current week based on current date
  // parseInt((new Date('2012.08.10').getTime() / 1000).toFixed(0))
  weekSelect = selectedWeek => {
    this.setState({
      selectedWeek: selectedWeek,
      scheduleByWeek: [
        ...this.state.schedules.filter(game => game.weekName === selectedWeek)
      ]
    });
  };

  seasonSelect = selectedSeason => {
    this.setState({
      selectedSeason: selectedSeason
    });
    this.getSchedule();
  };

  render() {
    return (
      <Container className="">
        {/* <ButtonToolbar>
          <DropdownButton
            title={this.state.selectedSeason}
            variant="primary"
            id="dropdown-season"
            style={{ padding: "15px" }}
          >
            <div
              style={{
                height: "300px",
                overflowY: "scroll"
              }}
            >
              {this.state.possibleSeasons.map(season => (
                <Dropdown.Item
                  onSelect={this.seasonSelect}
                  eventKey={season}
                  key={season}
                >
                  {season}
                </Dropdown.Item>
              ))}
            </div>
          </DropdownButton>
          <DropdownButton
            title={this.state.selectedWeek}
            variant="primary"
            id="dropdown-week"
            style={{ padding: "15px" }}
          >
            <div
              style={{
                height: "300px",
                overflowY: "scroll"
              }}
            >
              {this.state.possibleWeeks.map(week => (
                <Dropdown.Item
                  onSelect={this.weekSelect}
                  eventKey={week}
                  key={week}
                >
                  {week}
                </Dropdown.Item>
              ))}
            </div>
          </DropdownButton>
        </ButtonToolbar> */}
        <Schedules schedules={this.state.scheduleByWeek} />
      </Container>
    );
  }
}

export default App;
