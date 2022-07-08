import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function PleaseMove({
  visible,
  setVisible,
  options,
  hours,
  minutes,
  am,
  setHours,
  setMinutes,
  setAm,
}) {
  const partId = 5;
  let left = 0;
  if (visible > partId) left = 'calc(-100% - 100px)';
  if (visible < partId) left = 'calc(100% + 100px)';
  return (
    <div
      className="please-move"
      style={{
        opacity: visible === partId ? 1 : 0,
        left: left,
      }}
    >
      <p>
        We're looking a little busy around that time. Could you do a slightly
        different time?
      </p>
      <hr />
      <div className="row">
        <p
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          Yes:
        </p>
        {options
          .filter(
            (o) => !(o.hours === hours && o.minutes === minutes && o.am === am)
          )
          .map((o, i) => {
            let css = 'cell';
            if (o.hours === hours && o.minutes === minutes)
              css = 'cell selected';
            return (
              <div
                key={i}
                style={{ borderColor: 'var(--accent)' }}
                className={css}
                onClick={() => {
                  setHours(o.hours);
                  setMinutes(o.minutes);
                  setVisible(8);
                }}
              >
                {o.hours === 0 && o.am === false ? '12' : o.hours}:
                {o.minutes === 0 ? '00' : o.minutes}
              </div>
            );
          })}
      </div>
      <hr />
      <div className="row">
        {' '}
        <p
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          No:
        </p>
        <div
          className="link-text"
          onClick={() => {
            options.find(
              (o) => o.hours === hours && o.minutes === minutes && o.am === am
            )
              ? setVisible(8)
              : setVisible(7);
          }}
        >
          I need {hours === 0 && am === false ? '12' : hours}:
          {minutes === 0 ? '00' : minutes} <ArrowRightAltIcon />
        </div>
      </div>
    </div>
  );
}

export default PleaseMove;
