import { useState } from 'react';
import { postPublicBooking } from '../api/public';

async function submitBooking(
  savePending,
  setSavePending,
  time,
  turn_time,
  restaurantId
) {
  if (savePending) return;
  setSavePending(true);

  let usable_end_time = parseInt(time / 100) * 60 + (time % 100) + turn_time;

  usable_end_time =
    parseInt(usable_end_time / 60) * 100 + (usable_end_time % 60);

  let booking = {
    restaurant: this.state.restaurantId,
    time,
    phone: this.state.phone,
    email: this.state.email,
    name: this.state.name,
    covers: this.state.covers,
    date: this.state.date,
    turn_time: this.state.turn_time,
    usable_end_time: usable_end_time,
    statusesId: this.state.statuses._id,
    statusId: this.state.statuses.list[0]._id,
    history: [
      {
        statusId: this.state.statuses.list[0]._id,
        date: new Date(),
        phase: 1,
      },
    ],
  };
  const response = await postPublicBooking(booking);
  if (response.status === 200) return this.changeStage(this.state.stage + 1);

  response
    .text()
    .then((errorMessage) => this.setState({ errorMessage, loading: false }));
  return false;
}

function Details({
  visible,
  setVisible,
  covers,
  hours,
  minutes,
  am,
  selectedDate,
}) {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [notes, setNotes] = useState();
  const [savePending, setSavePending] = useState();

  const partId = 8;
  let left = 0;
  if (visible > partId) left = 'calc(-100% - 100px)';
  if (visible < partId) left = 'calc(100% + 100px)';
  return (
    <div
      className="details"
      style={{
        opacity: visible === partId ? 1 : 0,
        left: left,
      }}
    >
      <p style={{ marginBottom: 20 }}>
        Booking for <b>{covers === 1 ? '1 person' : `${covers} people`}</b> at{' '}
        <b>
          {hours}:{minutes === 0 ? '00' : minutes}
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
        onChange={(e) => setName(e.value)}
        placeholder="Name"
      />
      <input
        type="text"
        className="input-container"
        style={{ outline: 'none' }}
        value={phone}
        onChange={(e) => setPhone(e.value)}
        placeholder="Phone Number"
      />
      <input
        type="email"
        className="input-container"
        style={{ outline: 'none' }}
        value={email}
        onChange={(e) => setEmail(e.value)}
        placeholder="Email Address"
      />
      <textarea
        className="input-container"
        style={{ outline: 'none' }}
        value={notes}
        onChange={(e) => setNotes(e.value)}
        placeholder="Requests & requirements"
      />
      <hr />
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
          onClick={() => setVisible(9)}
          style={{ marginLeft: 2.3 }}
        >
          {' '}
          Book now
        </div>
      </div>
    </div>
  );
}

export default Details;
