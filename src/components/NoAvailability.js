function NoAvailability({ visible, setVisible, restaurantPhone }) {
  const partId = 7;
  let left = 0;
  if (visible > partId) left = 'calc(-100% - 100px)';
  if (visible < partId) left = 'calc(100% + 100px)';
  return (
    <div
      className="no-availability"
      style={{
        opacity: visible === partId ? 1 : 0,
        left: left,
      }}
    >
      <p>
        Sorry, I can't find any availability around this time, but what do I
        know? I'm just a robot.
      </p>
      <p>
        Please call the restaurant on
        <br />
        <a href={`tel:${restaurantPhone}`}>{restaurantPhone}</a>
      </p>
      <hr />
      <div className="done" onClick={() => setVisible(4)}>
        Back
      </div>
    </div>
  );
}

export default NoAvailability;
