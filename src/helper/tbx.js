function optimiseTables(bookings) {
  //const clone = require("rfdc")();
  // 1. get all tables for date. Filter out offline tables.
  // 2. get all bookings for date
  // 3. strip all tables from bookings if not manually assigned (booking.table_assigned === false) and must be phase 1.
  // 4. for each booking:
  // 4a. get tables scores from this.scoreTables
  // 4b. assign to highest point value table
  // 1
  let tables = this.state.tables;

  //let tables = this.state.tables.tables;
  //tables = tables.filter((table) => table.online);

  // 2
  const stripBookings = clone(b);
  // 3

  for (let i = 0; stripBookings.length > i; i++) {
    if (!stripBookings[i].table_assigned) {
      stripBookings[i].table = [];
    }
  }

  // 4
  //let tableScores = this.scoreTables(tables, bookings, bookings[1]);

  const assignBookings = clone(stripBookings);

  for (let i = 0; assignBookings[i]; i++) {
    if (assignBookings[i].table.length === 0) {
      assignBookings[i].table.push(
        this.props.onScoreTables(tables, assignBookings, assignBookings[i]).name
      );
    }
  }
  return assignBookings;
}

function setDate(date = new Date().setHours(0, 0, 0, 0)) {
  this.setSchedule(date);
}

function setBookings(date = this.state.date) {
  const allBookings = clone(this.state.allBookings);
  let bookings = allBookings.filter(
    (booking) => booking.date.valueOf() === date.valueOf()
  );
  const opBookings = this.optimiseTables(clone(bookings));

  this.setState({ bookings: opBookings }, () =>
    this.handleRecalculatePacings()
  );
}

function autoAvailable(time = this.state.time) {
  //function is copy+pasted from addbooking.jsx - first section is modifying it to work on the booking page

  let turn_time = this.state.turn_time;
  turn_time = { mins: turn_time % 60, hours: parseInt(turn_time / 60) };
  // Is there pacing limit?
  const pacings = this.state.pacings.pacings;
  if (!pacings) return;
  const pacing = pacings.find(
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
    covers: this.state.covers,
    time: time,
    usable_end_time: usable_end_time,
    _id: 1,
  };

  let day = new Date(this.state.date).getDay();
  day = this.state.schedule.days.find((d) => d.day === day);

  const tablesIds = day.tablesIds;
  let tables = [];
  console.log('here', tablesIds, this.state.allTables);
  tablesIds.forEach((obj) => {
    let useTables = this.state.allTables.find(
      (tables) => tables._id === obj.tablesId
    ).tables;
    useTables = useTables.filter(
      (table) => table.online === true && table.covers < this.state.covers + 2
    );
    tables.push({ time: obj.time, tables: useTables });
  });

  let best_table = this.props.onScoreTables(
    tables,
    this.state.bookings,
    booking
  );
  //returns best_table.name & best_table.score

  if (best_table === undefined) {
    return { score: -9999, value: 'table' };
  }
  if (pacing.booked + this.state.covers > pacing.max) {
    return { score: -9999, value: 'pacing' };
  }

  if (best_table.score > 0) {
    return { score: best_table.score, value: 'ideal' };
  }

  return { score: best_table.score, value: 'available' };
}
