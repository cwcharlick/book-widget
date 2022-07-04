import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function PleaseMove({
  visible,
  setVisible,
  options,
  hours,
  minutes,
  setHours,
  setMinutes,
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
        We're looking a little busy around that time. Could you do a little
        earlier or later?
      </p>
      <hr />
      <div className="row">
        {options.map((o, i) => {
          let css = 'cell';
          if (o.hours === hours && o.minutes === minutes) css = 'cell selected';
          return (
            <div
              key={i}
              className={css}
              onClick={() => {
                setHours(o.hours);
                setMinutes(o.minutes);
                setVisible(8);
              }}
            >
              {o.hours}:{o.minutes}
            </div>
          );
        })}
      </div>
      <hr />
      <div className="link-text" onClick={() => setVisible(7)}>
        I need {hours}:{minutes === 0 ? '00' : minutes} <ArrowRightAltIcon />
      </div>
    </div>
  );
}

export default PleaseMove;
