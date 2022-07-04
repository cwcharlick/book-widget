function Details({
  visible,
  setVisible,
  covers,
  hours,
  minutes,
  am,
  selectedDate,
}) {
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
        class="input-container"
        style={{ outline: 'none' }}
        placeholder="Name"
      />
      <input
        type="text"
        class="input-container"
        style={{ outline: 'none' }}
        placeholder="Phone Number"
      />
      <input
        type="email"
        class="input-container"
        style={{ outline: 'none' }}
        placeholder="Email Address"
      />
      <textarea
        type="email"
        class="input-container"
        style={{ outline: 'none' }}
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
