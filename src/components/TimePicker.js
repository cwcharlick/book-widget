function TimePicker({
  hours,
  setHours,
  minutes,
  setMinutes,
  am,
  setAm,
  visible,
  setVisible,
}) {
  const partId = 2;
  let left = 0;
  if (visible > partId) left = 'calc(-100% - 100px)';
  if (visible < partId) left = 'calc(100% + 100px)';
  return (
    <div
      className="time-picker"
      style={{ opacity: visible === partId ? 1 : 0, left: left }}
    >
      <div className="hours">
        <div className="row">
          <div
            className={hours === 1 ? 'cell selected' : 'cell'}
            onClick={() => setHours(1)}
          >
            1:00
          </div>
          <div
            className={hours === 2 ? 'cell selected' : 'cell'}
            onClick={() => setHours(2)}
          >
            2:00
          </div>
          <div
            className={hours === 3 ? 'cell selected' : 'cell'}
            onClick={() => setHours(3)}
          >
            3:00
          </div>
          <div
            className={hours === 4 ? 'cell selected' : 'cell'}
            onClick={() => setHours(4)}
          >
            4:00
          </div>
        </div>
        <div className="row">
          <div
            className={hours === 5 ? 'cell selected' : 'cell'}
            onClick={() => setHours(5)}
          >
            5:00
          </div>
          <div
            className={hours === 6 ? 'cell selected' : 'cell'}
            onClick={() => setHours(6)}
          >
            6:00
          </div>
          <div
            className={hours === 7 ? 'cell selected' : 'cell'}
            onClick={() => setHours(7)}
          >
            7:00
          </div>
          <div
            className={hours === 8 ? 'cell selected' : 'cell'}
            onClick={() => setHours(8)}
          >
            8:00
          </div>
        </div>
        <div className="row">
          <div
            className={hours === 9 ? 'cell selected' : 'cell'}
            onClick={() => setHours(9)}
          >
            9:00
          </div>
          <div
            className={hours === 10 ? 'cell selected' : 'cell'}
            onClick={() => setHours(10)}
          >
            10:00
          </div>
          <div
            className={hours === 11 ? 'cell selected' : 'cell'}
            onClick={() => setHours(11)}
          >
            11:00
          </div>
          <div
            className={hours === 12 ? 'cell selected' : 'cell'}
            onClick={() => setHours(12)}
          >
            12:00
          </div>
        </div>
      </div>
      <hr />
      <div className="minutes">
        <div className="row">
          <div
            className={minutes === 0 ? 'cell selected' : 'cell'}
            onClick={() => setMinutes(0)}
          >
            00
          </div>
          <div
            className={minutes === 15 ? 'cell selected' : 'cell'}
            onClick={() => setMinutes(15)}
          >
            15{' '}
          </div>
          <div
            className={minutes === 30 ? 'cell selected' : 'cell'}
            onClick={() => setMinutes(30)}
          >
            30
          </div>
          <div
            className={minutes === 45 ? 'cell selected' : 'cell'}
            onClick={() => setMinutes(45)}
          >
            45
          </div>
        </div>
      </div>
      <hr />
      <div className="am-pm">
        <div className="row">
          <div
            className={am ? 'cell selected' : 'cell'}
            onClick={() => setAm(true)}
          >
            AM
          </div>
          <div
            className={!am ? 'cell selected' : 'cell'}
            onClick={() => setAm(false)}
          >
            PM
          </div>
        </div>
      </div>
      <hr />
      <div className="done" onClick={() => setVisible(4)}>
        done
      </div>
    </div>
  );
}

export default TimePicker;
