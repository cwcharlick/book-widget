import React, { useState } from 'react';

import Calendar from './Calendar';
import TimePicker from './TimePicker';
import CoversPicker from './CoversPicker';
import SearchForm from './SearchForm';

function Widget({ h = 7, m = 0, a = false, c = 2 }) {
  const todayWithTime = new Date();
  const today = new Date(
    todayWithTime.getFullYear(),
    todayWithTime.getMonth(),
    todayWithTime.getDate()
  );

  const [selectedDate, setSelectedDate] = useState(today);

  const [hours, setHours] = useState(h);
  const [minutes, setMinutes] = useState(m);
  const [am, setAm] = useState(a);

  const [covers, setCovers] = useState(c);

  const [visible, setVisible] = useState(4);

  const bookingSections = [
    { id: 1, name: 'covers' },
    { id: 2, name: 'time' },
    { id: 3, name: 'date' },
    { id: 4, name: 'search' },
  ];

  return (
    <div className="booking-widget">
      <form>
        <CoversPicker
          covers={covers}
          setCovers={setCovers}
          visible={visible}
          setVisible={setVisible}
        />
        <TimePicker
          hours={hours}
          setHours={setHours}
          minutes={minutes}
          setMinutes={setMinutes}
          am={am}
          setAm={setAm}
          visible={visible}
          setVisible={setVisible}
        />
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          today={today}
          visible={visible}
          setVisible={setVisible}
        />
        <SearchForm
          selectedDate={selectedDate}
          hours={hours}
          minutes={minutes}
          am={am}
          covers={covers}
          visible={visible}
          setVisible={setVisible}
        />
      </form>
    </div>
  );
}

export default Widget;
