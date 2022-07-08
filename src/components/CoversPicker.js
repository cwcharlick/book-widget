import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

function CoversPicker({
  covers,
  setCovers,
  visible,
  setVisible,
  restaurantPhone,
}) {
  const options = [1, 2, 3, 4, 5, 6];

  const buttons = options.map((o) => (
    <div
      key={o}
      className={o === covers ? 'option selected' : 'option'}
      onClick={() => setCovers(o)}
    >
      {o === 1 ? `${o} person` : `${o} people`}
      <PersonOutlineRoundedIcon />
    </div>
  ));

  const partId = 1;
  let left = 0;
  if (visible > partId) left = 'calc(-100% - 100px)';
  if (visible < partId) left = 'calc(100% + 100px)';

  return (
    <div
      className="covers-picker"
      style={{ opacity: visible === partId ? 1 : 0, left: left }}
    >
      {buttons}
      <hr />
      <p>
        For groups of more than 6, please call us on{' '}
        <a href={`tel:${restaurantPhone}`}>{restaurantPhone}</a>
      </p>
      <hr />
      <div className="done" onClick={() => setVisible(4)}>
        {covers === 1 ? '1 person' : `${covers} people `} <CheckRoundedIcon />
      </div>
    </div>
  );
}

export default CoversPicker;
