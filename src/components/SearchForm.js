import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

function SearchForm({
  selectedDate,
  hours,
  minutes,
  am,
  covers,
  visible,
  setVisible,
}) {
  let partId = 4;
  let left = 0;
  if (visible > partId) left = 'calc(-100% - 100px)';
  if (visible < partId) left = 'calc(100% + 100px)';

  return (
    <div
      className="search-form"
      style={{
        opacity: visible === partId ? 1 : 0,
        left: left,
      }}
    >
      <div className="input-container">
        <CalendarMonthRoundedIcon />
        <input
          onClick={() => setVisible(3)}
          type="text"
          name="date"
          readonly
          value={`${selectedDate.toLocaleDateString('en-UK', {
            weekday: 'short',
          })}, ${selectedDate.getDate()} ${selectedDate.toLocaleDateString(
            'en-UK',
            {
              month: 'short',
            }
          )}`}
        />
      </div>
      <div className="input-container">
        <AccessTimeRoundedIcon />
        <input
          onClick={() => setVisible(2)}
          type="text"
          name="time"
          readonly
          value={`${hours}:${minutes === 0 ? '00' : minutes}${
            am ? 'am' : 'pm'
          }`}
        />
      </div>
      <div className="input-container">
        <PersonOutlineRoundedIcon />
        <input
          onClick={() => setVisible(1)}
          type="text"
          name="covers"
          readonly
          value={covers === 1 ? '1 person' : `${covers} people`}
        />
      </div>
      <div className="input-container">
        <button>Check availability</button>
      </div>
    </div>
  );
}

export default SearchForm;
