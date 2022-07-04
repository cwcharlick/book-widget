import React, { useState } from 'react';

import Calendar from './Calendar';
import TimePicker from './TimePicker';
import CoversPicker from './CoversPicker';
import SearchForm from './SearchForm';
import NoAvailability from './NoAvailability';
import PleaseMove from './PleaseMove';
import Details from './Details';
import Confirmation from './Confirmation';

function Widget({ h = 6, m = 30, a = false, c = 2 }) {
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
    { id: 5, name: 'please move' },
    { id: 7, name: 'no availability' },
    { id: 8, name: 'details' },
    { id: 9, name: 'confirmation' },
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
        <NoAvailability visible={visible} setVisible={setVisible} />
        <PleaseMove
          visible={visible}
          setVisible={setVisible}
          hours={hours}
          setHours={setHours}
          minutes={minutes}
          setMinutes={setMinutes}
          options={[
            { hours: 6, minutes: 30 },
            { hours: 7, minutes: 30 },
          ]}
        />
        <Details
          visible={visible}
          setVisible={setVisible}
          covers={covers}
          hours={hours}
          minutes={minutes}
          am={am}
          selectedDate={selectedDate}
        />
        <Confirmation visible={visible} setVisible={setVisible} />
      </form>
    </div>
  );
}

export default Widget;
