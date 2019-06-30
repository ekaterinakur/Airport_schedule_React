import React from 'react';
import FlightStatus from './FlightStatus';
import Airline from './Airline';
import './Flight.css';

function timeView(elem) {
  return elem < 10 ? `0${elem}` : elem;
}

export default function Flight(props, departuresState) {
  const localDate = new Date(props.timeDepShedule || props.timeToStand);
  const localeTime = `
        ${timeView(localDate.getHours())}:${timeView(localDate.getMinutes())}
        `;
  const factDate = new Date(departuresState ? props.timeTakeofFact : props.timeLandFact);
  const factTime = `
        ${timeView(factDate.getHours())}:${timeView(factDate.getMinutes())}
        `;

  return (
    <tr className="flight" key={props.ID}>
      <td>
        <span className={props.term === 'A' ? 'termA terminal' : 'termD terminal'}>{props.term}</span>
      </td>
      {departuresState
        ? <td>{props.gateNo || ''}</td>
        : null}
      <td>{localeTime}</td>
      <td>{props['airportToID.city_en'] || props['airportFromID.city_en']}</td>
      <FlightStatus factTime={factTime} status={props.status} />
      <td>{props.codeShareData.map(elem => <Airline elem={elem} key={elem.codeShare} /> )}</td>
      <td>{props.codeShareData.map(elem => <p key={elem.codeShare} className="code-share">{elem.codeShare}</p>)}</td>
      <td><a href="#" className="details">Flight details</a></td>
    </tr>
  );
}
