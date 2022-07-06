import { useState } from 'react';
import { postPublicBooking } from '../api/public';
import { minutesHoursAmToNumber } from '../helper/functions';

async function submitBooking(
  savePending,
  setSavePending,
  time,
  restaurantId,
  phone,
  email,
  name,
  covers,
  date,
  turn_time,
  statuses,
  notes,
  setVisible,
  setError
) {
  if (savePending) return;
  setSavePending(true);

  let usable_end_time = parseInt(time / 100) * 60 + (time % 100) + turn_time;

  usable_end_time =
    parseInt(usable_end_time / 60) * 100 + (usable_end_time % 60);
  console.log(phone);
  let booking = {
    restaurant: restaurantId,
    time,
    phone: phone,
    email,
    name,
    covers,
    date,
    turn_time,
    usable_end_time,
    statusesId: statuses._id,
    statusId: statuses.list[0]._id,
    description: `Web booking. ${notes}`,
    history: [
      {
        statusId: statuses.list[0]._id,
        date: new Date(),
        phase: 1,
      },
    ],
  };
  const response = await postPublicBooking(booking);
  setSavePending(false);

  if (response.status === 200) return setVisible(9);

  response.text().then((errorMessage) =>
    setError(
      <>
        <span className="warning">{errorMessage}</span>
        <hr />
      </>
    )
  );
}

function Details({
  visible,
  setVisible,
  covers,
  hours,
  minutes,
  am,
  selectedDate,
  onReloadCheck,
  statuses,
  turnTime,
  restaurantId,
  setSearchError,
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [savePending, setSavePending] = useState('');
  const [error, setError] = useState();

  const partId = 8;
  let left = 0;
  if (visible > partId) left = 'calc(-100% - 100px)';
  if (visible < partId) left = 'calc(100% + 100px)';

  const bookingSlotLost = () => {
    setSearchError(
      <>
        <span className="warning">
          Unfortunately the last table for{' '}
          {`${hours === 0 && am === false ? '12' : hours}:${
            minutes === 0 ? '00' : minutes
          }${am ? 'am' : 'pm'}`}{' '}
          was just booked. Please try another time.
        </span>
        <hr />
      </>
    );
    setVisible(4);
  };

  return (
    <div
      className="details"
      style={{
        opacity: visible === partId ? 1 : 0,
        left: left,
      }}
    >
      <p style={{ marginBottom: 20 }}>
        We have space available. Let's book you in for{' '}
        <b>{covers === 1 ? '1 person' : `${covers} people`}</b> at{' '}
        <b>
          {hours === 0 && am === false ? '12' : hours}:
          {minutes === 0 ? '00' : minutes}
          {am ? 'am' : 'pm'}
        </b>{' '}
        on{' '}
        <b>
          {selectedDate.toLocaleDateString('en-UK', {
            weekday: 'short',
          })}
          , {selectedDate.getDate()}{' '}
          {selectedDate.toLocaleDateString('en-UK', {
            month: 'short',
          })}
        </b>
      </p>
      <input
        type="text"
        className="input-container"
        style={{ outline: 'none' }}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        className="input-container"
        style={{ outline: 'none' }}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      />
      <input
        type="email"
        className="input-container"
        style={{ outline: 'none' }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
      />
      <textarea
        className="input-container"
        style={{ outline: 'none' }}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Requests & requirements"
      />
      <hr />
      {error}
      <div className="row">
        <div
          className="done"
          onClick={() => setVisible(4)}
          style={{
            backgroundColor: 'transparent',
            color: 'unset',
            border: `1px solid var(--blue)`,
            marginRight: 2.5,
          }}
        >
          Back
        </div>
        <div
          className="done"
          onClick={() => {
            onReloadCheck().then((res) => {
              console.log(res);
              let failed = true;
              res.forEach((r) => {
                if (r.hours === hours && r.minutes === minutes && r.am === am)
                  failed = false;
              });
              failed
                ? bookingSlotLost()
                : submitBooking(
                    savePending,
                    setSavePending,
                    minutesHoursAmToNumber(minutes, hours, am),
                    restaurantId,
                    phone,
                    email,
                    name,
                    covers,
                    selectedDate,
                    turnTime,
                    statuses,
                    notes,
                    setVisible,
                    setError
                  );
            });
            // setVisible(9);
          }}
          style={{ marginLeft: 2.3 }}
        >
          {savePending ? 'Booking...' : 'Book now'}
        </div>
      </div>
    </div>
  );
}

export default Details;
