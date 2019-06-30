import React from 'react';

export default function Dates(props) {
  return (
    <div className="dates">
      <div onClick={() => props.dateForLink(-1)}
           className={`day ${props.currentDate === (props.todaysDate - 1) ? 'active' : ''}`}>
        <div className="date">
        {props.datesForTable(-1)}
        </div>
        YESTERDAY
      </div>
      <div onClick={() => props.dateForLink()}
           className={`day ${props.currentDate === props.todaysDate ? 'active' : ''}`}>
        <div className="date">
          {props.datesForTable()}
        </div>
        TODAY
      </div>
      <div onClick={() => props.dateForLink(1)}
           className={`day ${props.currentDate === (props.todaysDate + 1) ? 'active' : ''}`}>
        <div className="date">
          {props.datesForTable(1)}
        </div>
        TOMORROW
      </div>
    </div>
  );
}
