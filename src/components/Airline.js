import React from 'react';

export default function Airline(props) {
  return (
    <p className="airline">
      <img src={props.elem.airline.en.logoSmallName} alt={props.elem.airline.en.name} />
      <span>{props.elem.airline.en.name}</span>
    </p>
  )
}
