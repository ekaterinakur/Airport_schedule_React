import React from 'react';

export default function TableHeaders(props) {
  return (
    <thead>
      <tr>
        <th>Terminal</th>
        {props.departuresState ? <th>Gate</th> : null}
        <th>Local time</th>
        <th>Destination</th>
        <th>Status</th>
        <th>Airline</th>
        <th>Flight</th>
        <th>Details</th>
        </tr>
    </thead>
  );
}
