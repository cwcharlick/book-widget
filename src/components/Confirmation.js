function Confirmation({ visible, setVisible, homeUrl }) {
  const partId = 9;
  let left = 0;
  if (visible > partId) left = 'calc(-100% - 100px)';
  if (visible < partId) left = 'calc(100% + 100px)';
  return (
    <div
      className="confirmation"
      style={{
        opacity: visible === partId ? 1 : 0,
        left: left,
      }}
    >
      <p>
        <b style={{ fontSize: '14px' }}>You're booked in!</b>
      </p>
      <p>
        Please check your email for confirmation, and instructions on how to
        cancel if needed.
      </p>
      <hr />
      <div className="row">
        <div
          className="done"
          onClick={() => setVisible(4)}
          style={{
            backgroundColor: 'transparent',
            color: 'unset',
            border: `1px solid var(--accent)`,
            marginRight: 2.5,
          }}
        >
          Book again
        </div>
        <div
          className="done"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = homeUrl;
          }}
          style={{ marginLeft: 2.3 }}
        >
          {' '}
          Home
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
