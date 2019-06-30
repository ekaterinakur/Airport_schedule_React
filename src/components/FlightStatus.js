import React from 'react';

export default function FlightStatus(props) {
  let status;

  switch (props.status) {
    case 'DP':
      status = `Departed at ${props.factTime}`;
      break;
    case 'LN':
      status = `Landed at ${props.factTime}`;
      break;
    case 'CK':
      status = 'Check in';
      break;
    case 'BD':
      status = 'In boarding';
      break;
    case 'DL':
      status = 'Delayed';
      break;
    case 'CX':
      status = 'Cancelled';
      break;
    default:
      status = 'On time';
  }

  return <td>{status}</td>;
}
