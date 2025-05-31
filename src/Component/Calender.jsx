import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calendar() {
  const [value, setValue] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        view="month" // You can set view to 'year' for year grid
        maxDetail="month"
      />
      <p className="mt-4">
        Selected date: <strong>{value.toDateString()}</strong>
      </p>
    </div>
  );
}

export default Calendar;
