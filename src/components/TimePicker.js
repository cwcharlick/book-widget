import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

function createHours(num, hours, setHours, minutes, pm = false) {
  return (
    <div
      className={hours === num ? 'cell selected' : 'cell'}
      onClick={() => setHours(num)}
    >
      <span>
        {pm ? '12' : num}
        <span style={{ opacity: 0.7 }}>:{minutes === 0 ? '00' : minutes}</span>
      </span>
    </div>
  );
}

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
      <span style={{ textAlign: 'center' }}>
        Selected:{' '}
        <b style={{ color: 'var(--blue)' }}>{`${hours}:${
          minutes === 0 ? '00' : minutes
        }${am ? 'am' : 'pm'}`}</b>
      </span>
      <hr />
      <div className="hours">
        <div className="row">
          {createHours(0, hours, setHours, minutes, !am)}
          {createHours(1, hours, setHours, minutes)}
          {createHours(2, hours, setHours, minutes)}
          {createHours(3, hours, setHours, minutes)}
        </div>
        <div className="row">
          {createHours(4, hours, setHours, minutes)}
          {createHours(5, hours, setHours, minutes)}
          {createHours(6, hours, setHours, minutes)}
          {createHours(7, hours, setHours, minutes)}
        </div>
        <div className="row">
          {createHours(8, hours, setHours, minutes)}
          {createHours(9, hours, setHours, minutes)}
          {createHours(10, hours, setHours, minutes)}
          {createHours(11, hours, setHours, minutes)}
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
        {`${hours === 0 && am === false ? '12' : hours}:${
          minutes === 0 ? '00' : minutes
        }${am ? 'am' : 'pm'}`}{' '}
        <CheckRoundedIcon />
      </div>
    </div>
  );
}

export default TimePicker;
