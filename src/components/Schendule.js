import React, { Component } from 'react';
import FlightList from './FlightList';
import DepArrButtons from './DepArrButtons';
import Dates from './Dates';
import TableHeaders from './TableHeaders';
import './Schendule.css';

export default class Schendule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departuresState: true,
      departures: [],
      arrivals: [],
      dateForLink: null,
      filterDate: null,
      todaysDate: null
    };
    this.changeTab = this.changeTab.bind(this);
    this.dateForLink = this.dateForLink.bind(this);
    this.datesForTable = this.datesForTable.bind(this);
    this.loadApi = this.loadApi.bind(this);
  }

  componentDidMount() {
    this.dateForLink();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.dateForLink !== prevState.dateForLink) {
      this.loadApi(`https://api.iev.aero/api/flights/${this.state.dateForLink}`)
      .then(flights => this.setState({
          departures: flights.departure
            .filter(flight => this.dateForFilter(flight.timeDepShedule) === this.state.filterDate)
            .sort((a, b) => a.timeDepShedule.localeCompare(b.timeDepShedule)),
          arrivals: flights.arrival
            .filter(flight => this.dateForFilter(flight.timeToStand) === this.state.filterDate)
            .sort((a, b) => a.timeToStand.localeCompare(b.timeToStand))
        })
      )
    }
  }

  dateForLink(num = 0) {
    const date = new Date();
    const dateCorrected = this.correctDate(date, num);
    const [correctDay, correctMonth] = [...this.monthAndDayView(dateCorrected)];

    this.setState({
      todaysDate: date.getDate(),
      dateForLink: `${correctDay}-${correctMonth}-${dateCorrected.getFullYear()}`,
      filterDate: dateCorrected.getDate()
    });
  }

  dateForFilter(date) {
    return new Date(date).getDate();
  }

  timeForSort(time) {
    return new Date(time).toTimeString().slice(0, 5);
  }

  datesForTable(num = 0) {
    const todaysDate = new Date();
    const dateCorrected = this.correctDate(todaysDate, num);
    const [correctDay, correctMonth] = [...this.monthAndDayView(dateCorrected)];

    return `${correctDay} / ${correctMonth}`;
  }

  monthAndDayView(date) {
    const dayAndMonth = [date.getDate(), date.getMonth() + 1];

    return dayAndMonth.map(elem => elem < 10 ? (`0${elem}`) : elem);
  }

  correctDate(date, num) {
    const day = date.getDate() + num;
    const month = date.getMonth();
    const year = date.getFullYear();
    return new Date(year, month, day);
  }

  changeTab(departuresState) {
    this.setState({
      departuresState: departuresState
    });
  }

  loadApi(url) {
    return fetch(url)
      .then(resolve => resolve.json())
      .then(data => data.body);
  }

  render() {
    return (
      <section className="schendule">
        <DepArrButtons changeTab={this.changeTab} departuresState={this.state.departuresState} />
        <Dates datesForTable={this.datesForTable} dateForLink={this.dateForLink}
               currentDate={this.state.filterDate} todaysDate={this.state.todaysDate} />
        <table>
          <TableHeaders departuresState={this.state.departuresState} />
          {this.state.departuresState
            ? (
              <FlightList
                data={this.state.departures}
                departuresState={this.state.departuresState}
              />
            )
            : (
              <FlightList
                data={this.state.arrivals}
              />
            )
          }
        </table>
      </section>
    );
  }
}
