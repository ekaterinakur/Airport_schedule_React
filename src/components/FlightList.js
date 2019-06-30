import React from 'react';
import Flight from './Flight';

export default function FlightList(props) {
  return (
    <tbody>
      {props.data.map(flight => Flight(flight, props.departuresState))}
    </tbody>
  );
}
