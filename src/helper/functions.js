export function findAvailability(
  date,
  allSchedules,
  allTables,
  allPacings,
  allStatuses,
  bookings,
  covers,
  am,
  hours,
  minutes,
  allPacingOverrides,
  setStatuses,
  setTurnTime
) {
  const availableSchedules = allSchedules.filter(
    (schedule) => schedule.startDate <= date && schedule.lastDate >= date
  );
  let schedule;
  if (availableSchedules.length > 0) {
    schedule = availableSchedules.reduce((saved, next) =>
      next.length < saved.length ? next : saved
    );
  } else {
    schedule = allSchedules[0];
  }
  let day = new Date(date).getDay();
  day = schedule.days.find((d) => d.day === day);

  // const tables = this.state.allTables.find(
  //   (tables) => tables._id === day.tablesIds[0].tablesId
  // );

  const tables = [];

  day.tablesIds.forEach((tablesId) => {
    const obj = allTables.find((tables) => tables._id === tablesId.tablesId);
    obj.time = tablesId.time;
    tables.push(obj);
  });

  const pacings = allPacings.find((pacings) => pacings._id === day.pacingsId);
  calculatePacings(pacings, bookings, date, allPacingOverrides);
  const statuses = allStatuses.find(
    (statuses) => statuses._id === day.statusesId
  );
  if (setStatuses) setStatuses(statuses);

  const turnTime = findTurnTime(statuses, covers);
  if (setTurnTime) setTurnTime(turnTime);

  optimiseTables(tables, bookings);

  const score = autoAvailable(
    turnTime,
    minutesHoursAmToNumber(minutes, hours, am),
    pacings,
    covers,
    date,
    schedule,
    tables,
    bookings
  );

  ///console.log('score', score);

  // if theyre looking for a time with a high scoring turn just give it to them and leave it there
  if (score.score > 0) return [{ minutes, hours, am }];

  const options = [
    -180, -165, -150, -135, -120, -105, -90, -75, -60, -45, -30, -15, 0, 15, 30,
    45, 60, 75, 90, 105, 120, 135, 150, 165, 180,
  ];

  const timeNumber = minutesHoursAmToNumber(minutes, hours, am);
  const time = timeNumberToValue(timeNumber);

  for (let i = 0; i < options.length; i++) {
    const avail = autoAvailable(
      turnTime,
      timeValueToNumber(time + options[i]),
      pacings,
      covers,
      date,
      schedule,
      tables,
      bookings
    );
    options[i] = {
      time: timeValueToNumber(time + options[i]),
      score: avail.score,
      value: avail.value,
    };
  }

  //console.log(options);

  // if unavailable give highest score within 45 mins before & after or just first available

  const otherOptions = [];
  // futureproof, make it editable how far it will push them. bestRange is time in mins that it will still look for best scores.
  const bestRange = 45;
  //console.log('1', options);
  const before = options.filter((o) => o.time < timeNumber && o.score > -9999);
  //console.log('options', options);
  const bestBefore = before.filter(
    (o) =>
      timeNumberToValue(o.time) + bestRange >= timeNumberToValue(timeNumber)
  );
  if (bestBefore.length > 0) {
    otherOptions.push(
      bestBefore.reduce(
        (acc, v) => (v.score > acc.score ? v : acc),
        bestBefore[bestBefore.length - 1]
      )
    );
  } else {
    before.length > 0 && otherOptions.push(before[before.length - 1]);
  }

  const after = options.filter((o) => o.time > timeNumber && o.score > -9999);
  const bestAfter = after.filter(
    (o) =>
      timeNumberToValue(o.time) <= timeNumberToValue(timeNumber) + bestRange
  );
  if (bestAfter.length > 0) {
    otherOptions.push(
      bestAfter.reduce(
        (acc, v) => (v.score > acc.score ? v : acc),
        bestAfter[0]
      )
    );
  } else {
    after.length > 0 && otherOptions.push(after[0]);
  }
  //console.log('oo', otherOptions);
  if (score.score === -9999) {
    for (let i = 0; i < otherOptions.length; i++) {
      otherOptions[i] = timeNumberToMinutesHoursAm(otherOptions[i].time);
    }
    return otherOptions;
  }

  const onlyBetter = otherOptions.filter((o) => o.score > score.score);
  onlyBetter.forEach(
    (o, i) => (onlyBetter[i] = timeNumberToMinutesHoursAm(o.time))
  );
  onlyBetter.push({ hours, minutes, am });

  return onlyBetter;

  // otherwise it's available, but offer additional options before or after 45 mins if they're better

  //this.setTurnTime()
}

function timeNumberToMinutesHoursAm(time) {
  const am = time >= 1200 ? false : true;
  const minutes = time % 100;
  const hour = parseInt(time / 100);
  const hours = hour >= 12 ? hour - 12 : hour;

  return { minutes, hours, am };
}

export function minutesHoursAmToNumber(minutes, hours, am) {
  return (am || hours === 12 ? hours : hours + 12) * 100 + minutes;
}

function timeNumberToValue(number) {
  return parseInt(number / 100) * 60 + (number % 100);
}

function timeValueToNumber(value) {
  return parseInt(value / 60) * 100 + (value % 60);
}

function findTurnTime(statuses, covers) {
  let turn_time = statuses.turnTimeTotal.filter(
    (tableSizes) => tableSizes.tableSize <= covers
  );
  turn_time = turn_time[turn_time.length - 1].time;
  return turn_time;
}

function calculatePacings(pacings, bookings, date, allPacingOverrides) {
  const pacingOverrides = [...allPacingOverrides].filter(
    (p) => date.toISOString() === p.date
  );

  pacingOverrides.forEach(
    (po) => (pacings.pacings.find((p) => p.time === po.time).max = po.max)
  );

  pacings.pacings.forEach((p) => (p.booked = 0));
  bookings.forEach((booking) => {
    let p = pacings.pacings.find(
      (pacing) =>
        pacing.time === booking.time || pacing.time === booking.time - 15
    );
    p.booked = p.booked + booking.covers;
  });
}

function optimiseTables(tables, bookings) {
  // strip auto assigned bookings

  for (let i = 0; bookings.length > i; i++) {
    if (!bookings[i].table_assigned) {
      bookings[i].table = [];
    }
  }

  // assign highest scoring table to each booking

  for (let i = 0; bookings[i]; i++) {
    if (bookings[i].table.length === 0) {
      bookings[i].table.push(scoreTables(tables, bookings, bookings[i]).name);
    }
  }
}

function scoreTables(tablesArr, bookings, booking) {
  // returns a score per table of seat-minutes wasted if booking is sat here. Points are negative per seat minute wasted, posit
  // Fully wasted seats = -turn time. 15 min gap from previous booking = -seats * 15. Same for gap to next booking. If less than default turn time. For perfect start/end give +10 each (to favour these)
  // 0. Combine tables & bookings
  // 1. exclude unavailable tables (tables with a reservation where tableBooking.time <= booking.time && tableBooking.end_time > booking.time || tableBooking.time > booking.time && tableBooking.time < booking.end_time) & tables that are too small
  // 2. Find previous booking (highest value from list of end times <= start time). Score the gap (if less than turn time), minus the result. If perfect = +10.
  // 3. Find next booking (lowest value from list of start times >= end time). Score the gap (if less than turn time), minus the result. If perfect = +10.
  // 4. Score wasted covers from turn time. Minus the result.

  // this is incase there's multiple table layouts for the day, it gets the right one.
  let tables = tablesArr.filter((tables) => tables.time <= booking.time);
  tables = tables[tables.length - 1].tables;

  const start = booking.time;
  const end = booking.usable_end_time;
  let useBookings = bookings;
  useBookings = useBookings.filter(
    (b) => b.phase !== 3 && (!b._id || b._id !== booking._id)
  );

  let defaultTurntime = 90;
  // setting turntimes is not yet complete. for now use 90 minutes.
  // 0
  //const clone = require("rfdc")();
  let combinedTables = tables;
  combinedTables.map(
    (table) =>
      (table.bookings = useBookings.filter((booking) =>
        booking.table.includes(table.name)
      ))
  );

  // 1
  combinedTables = combinedTables.filter(
    (table) =>
      table.bookings.filter(
        (tableBooking) =>
          !(tableBooking.usable_end_time <= start || tableBooking.time >= end)
      ).length === 0
  );

  combinedTables = combinedTables.filter(
    (table) => table.covers >= booking.covers
  );

  // 2 & 3

  for (let i = 0; combinedTables[i]; i++) {
    combinedTables[i].score = 0;

    let previous = [];
    combinedTables[i].bookings.forEach(
      (booking) =>
        booking.usable_end_time <= start &&
        previous.push(booking.usable_end_time)
    );
    previous = Math.max(...previous);

    let next = [];
    combinedTables[i].bookings.forEach(
      (booking) => booking.time >= end && next.push(booking.time)
    );
    next = Math.min(...next);

    //let next = Math.min(
    //  ...combinedTables[i].bookings
    //    .filter(booking => booking.time >= end)
    //    .map(next => next.time),
    //  0
    //);

    // previous and start are integers in the format 1030. Difference between 1100 and 1030 needs to be 30 minutes. find the difference in minutes.
    const previousMin =
      Number(previous.toString().slice(0, 2)) * 60 +
      Number(previous.toString().slice(2, 4));
    const startMin =
      Number(start.toString().slice(0, 2)) * 60 +
      Number(start.toString().slice(2, 4));
    const endMin =
      Number(end.toString().slice(0, 2)) * 60 +
      Number(end.toString().slice(2, 4));
    let nextMin =
      Number(next.toString().slice(0, 2)) * 60 +
      Number(next.toString().slice(2, 4));
    let prevDiff = startMin - previousMin;
    let nextDiff = nextMin - endMin;

    // for smart turn times we want to cause sub 15 minute switches to align. Sub 15 minutes cant happen from booking, so a diff of less than 15 MUST be because of smart turntimes.
    if (prevDiff < 15 && prevDiff > 0) {
      prevDiff = 0;
    }
    if (nextDiff < 15 && nextDiff > 0) {
      nextDiff = 0;
    }

    defaultTurntime = endMin - startMin;
    if (prevDiff === 0) {
      combinedTables[i].score += 10;
    } else if (prevDiff > 0 && prevDiff < defaultTurntime) {
      combinedTables[i].score -= prevDiff * combinedTables[i].covers;
    }

    if (nextDiff === 0) {
      combinedTables[i].score += 10;
    } else if (nextDiff > 0 && nextDiff < defaultTurntime) {
      combinedTables[i].score -= nextDiff * combinedTables[i].covers;
    }

    // 4
    combinedTables[i].score +=
      -(combinedTables[i].covers - booking.covers) * defaultTurntime;
  }
  const result = combinedTables.sort((a, b) => (a.score > b.score ? -1 : 1));
  return result[0];
}

function autoAvailable(
  turnTime,
  time,
  pacings,
  covers,
  date,
  schedule,
  tables,
  bookings
) {
  //function is copy+pasted from addbooking.jsx - first section is modifying it to work on the booking page

  let turn_time = turnTime;
  turn_time = { mins: turn_time % 60, hours: parseInt(turn_time / 60) };
  // Is there pacing limit?
  if (!pacings) return;
  const pacing = pacings.pacings.find(
    (pacing) => pacing.time === time || pacing.time === time - 15
  );

  if (!pacing) {
    return { score: -9999, value: 'closed' };
  }

  const converted_time = parseInt(time / 100) * 60 + (time % 100);
  let usable_end_time = converted_time + turn_time.mins + turn_time.hours * 60;

  usable_end_time =
    parseInt(usable_end_time / 60) * 100 + (usable_end_time % 60);

  // bookings needs an _id or it will get filtered out by onScoreTables. Just set to anything invalid.

  let booking = {
    covers,
    time,
    usable_end_time,
    _id: 1,
  };

  let day = new Date(date).getDay();
  day = schedule.days.find((d) => d.day === day);

  let useTables = [...tables[0].tables].filter(
    (table) => table.online === true && table.covers < covers + 2
  );

  let availableTables = [{ time: tables[0].time, tables: useTables }];

  let best_table = scoreTables(availableTables, bookings, booking);
  //returns best_table.name & best_table.score

  if (best_table === undefined) {
    return { score: -9999, value: 'table' };
  }
  if (pacing.booked + covers > pacing.max) {
    return { score: -9999, value: 'pacing' };
  }

  if (best_table.score > 0) {
    return { score: best_table.score, value: 'ideal' };
  }
  return { score: best_table.score, value: 'available' };
}
