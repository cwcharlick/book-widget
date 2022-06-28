import React, { useState } from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

function Calendar() {
  const todayWithTime = new Date();
  const today = new Date(
    todayWithTime.getFullYear(),
    todayWithTime.getMonth(),
    todayWithTime.getDate()
  );
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  const [selectedDate, setSelectedDate] = useState(today);
  const [displayMonth, setDisplayMonth] = useState(new Date(year, month, 1));

  const nextMonth = new Date(
    displayMonth.getFullYear(),
    displayMonth.getMonth() + 1,
    1
  );
  const prevMonth = new Date(
    displayMonth.getFullYear(),
    displayMonth.getMonth() - 1,
    1
  );
  const firstDayOfWeek = displayMonth.getDay();
  const calendarStart = new Date(
    displayMonth.getFullYear(),
    displayMonth.getMonth(),
    2 - firstDayOfWeek
  );
  const monthName =
    displayMonth.toLocaleString('default', { month: 'long' }) +
    ' ' +
    displayMonth.getFullYear();

  return (
    <>
      <div className="calendar-controls">
        <span>{monthName}</span>
        <span>
          <ChevronLeftRoundedIcon onClick={() => setDisplayMonth(prevMonth)} />
          <ChevronRightRoundedIcon onClick={() => setDisplayMonth(nextMonth)} />
        </span>
      </div>
      <div className="calendar-widget">
        {createTable(
          calendarStart,
          displayMonth.getMonth(),
          today,
          selectedDate,
          setSelectedDate
        )}
      </div>
    </>
  );
}

function weekRow(
  date,
  key = 1,
  today,
  selectedDate,
  setSelectedDate,
  startMonth
) {
  const days = [0, 1, 2, 3, 4, 5, 6];
  const currentDate = new Date(date);

  const row = days.map((d, i) => {
    const thisDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + d
    );
    let useClass = 'calendar-cell';
    if (thisDate.valueOf() < today.valueOf()) useClass += ' disabled';
    if (
      selectedDate.valueOf() === thisDate.valueOf() &&
      thisDate.getMonth() === startMonth
    )
      useClass += ' selected';
    if (thisDate.getMonth() !== startMonth) useClass += ' diff-month';

    return (
      <div
        key={i}
        className={useClass}
        onClick={() => setSelectedDate(thisDate)}
      >
        {thisDate.getDate()}
      </div>
    );
  });

  return (
    <div className="calendar-row" key={key}>
      {row}
    </div>
  );
}

function createTable(date, startMonth, today, selectedDate, setSelectedDate) {
  const currDate = new Date(date);
  const startDate = new Date(date);

  let numberOfWeeks = [0];

  while (true) {
    currDate.setDate(currDate.getDate() + 7);
    if (currDate.getMonth() !== startMonth) break;
    numberOfWeeks.push(7);
  }

  const rows = numberOfWeeks.map((w, i) => {
    return weekRow(
      startDate.setDate(startDate.getDate() + w),
      i,
      today,
      selectedDate,
      setSelectedDate,
      startMonth
    );
  });

  return (
    <div className="calendar-table">
      <div className="calendar-row">
        <div className="calendar-cell disabled">M</div>
        <div className="calendar-cell disabled">T</div>
        <div className="calendar-cell disabled">W</div>
        <div className="calendar-cell disabled">T</div>
        <div className="calendar-cell disabled">F</div>
        <div className="calendar-cell disabled">S</div>
        <div className="calendar-cell disabled">S</div>
      </div>
      {rows}
    </div>
  );
}

export default Calendar;
