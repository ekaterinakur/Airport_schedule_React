import React from 'react';

export default function DepArrButtons(props) {
  return (
    <section className="buttons">
      <button
        type="button"
        className={`departure ${props.departuresState ? 'active' : ''}`}
        onClick={() => props.changeTab(true)}
      >
        DEPARTURES
      </button>
      <button
        type="button"
        className={`arrive ${!props.departuresState ? 'active' : ''}`}
        onClick={() => props.changeTab(false)}
      >
        ARRIVALS
      </button>
    </section>
  );
}
