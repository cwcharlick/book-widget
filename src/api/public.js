export async function getPublicRestaurant(slug) {
  const requestOptions = {
    method: 'GET',
  };
  let data = await fetch(
    'https://evening-eyrie-53360.herokuapp.com/api/restaurants/public/' + slug,
    requestOptions
  );

  let result = JSON.parse(await data.text());

  return result;
}

export async function getPublicSchedules(restId) {
  const requestOptions = {
    method: 'GET',
  };

  let data = await fetch(
    'https://evening-eyrie-53360.herokuapp.com/api/schedules/public/' + restId,
    requestOptions
  );

  let result = JSON.parse(await data.text());

  for (let i = 0; result.length > i; i++) {
    result[i].startDate !== null &&
      (result[i].startDate = new Date(result[i].startDate));
    result[i].lastDate !== null &&
      (result[i].lastDate = new Date(result[i].lastDate));
  }

  return result;
}

export async function getPublicTables(restId) {
  const requestOptions = {
    method: 'GET',
  };

  let data = await fetch(
    'https://evening-eyrie-53360.herokuapp.com/api/tablesschedules/public/' +
      restId,
    requestOptions
  );

  let result = JSON.parse(await data.text());

  return result;
}

export async function getPublicBookings(restId, date) {
  const requestOptions = {
    method: 'GET',
  };

  let data = await fetch(
    'https://evening-eyrie-53360.herokuapp.com/api/bookings/public/' +
      restId +
      '/' +
      date,
    requestOptions
  );

  let result = JSON.parse(await data.text());

  for (let i = 0; result.length > i; i++) {
    result[i].date = new Date(result[i].date);
  }

  return result;
}

export async function getPublicPacings(restId) {
  const requestOptions = {
    method: 'GET',
  };

  let data = await fetch(
    'https://evening-eyrie-53360.herokuapp.com/api/pacingsschedules/public/' +
      restId,
    requestOptions
  );

  let result = JSON.parse(await data.text());

  return result;
}

export async function getPublicPacingOverrides(restId) {
  const requestOptions = {
    method: 'GET',
  };

  let data = await fetch(
    'https://evening-eyrie-53360.herokuapp.com/api/pacingoverrides/public/' +
      restId,
    requestOptions
  );

  let result = JSON.parse(await data.text());

  return result;
}

export async function getPublicStatuses(restId) {
  const requestOptions = {
    method: 'GET',
  };

  let data = await fetch(
    'https://evening-eyrie-53360.herokuapp.com/api/statuses/public/' + restId,
    requestOptions
  );

  let result = JSON.parse(await data.text());

  return result;
}

export async function postPublicBooking(booking) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking),
  };

  let data = await fetch(
    'https://evening-eyrie-53360.herokuapp.com/api/bookings/public/',
    requestOptions
  );

  return data;
}

export async function getPublicStyles(restId) {
  const requestOptions = {
    method: 'GET',
  };

  let data = await fetch(
    'https://evening-eyrie-53360.herokuapp.com/api/styles/public/' + restId,
    requestOptions
  );

  let result = JSON.parse(await data.text());
  console.log(data);

  return result;
}

// get rest from id
// get all schedules, table plans, bookings, pacings from id. No PII.
