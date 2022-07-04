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
      <div className="input-container" onClick={() => setVisible(3)}>
        <CalendarMonthRoundedIcon />
        {selectedDate.toLocaleDateString('en-UK', {
          weekday: 'short',
        })}
        , {selectedDate.getDate()}{' '}
        {selectedDate.toLocaleDateString('en-UK', {
          month: 'short',
        })}
      </div>
      <div className="input-container" onClick={() => setVisible(2)}>
        <AccessTimeRoundedIcon />
        {hours}:{minutes === 0 ? '00' : minutes}
        {am ? 'am' : 'pm'}
      </div>
      <div className="input-container" onClick={() => setVisible(1)}>
        <PersonOutlineRoundedIcon />
        {covers === 1 ? '1 person' : `${covers} people`}
      </div>
      <div className="input-container">
        <button type="button" onClick={() => setVisible(5)}>
          Check availability
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
