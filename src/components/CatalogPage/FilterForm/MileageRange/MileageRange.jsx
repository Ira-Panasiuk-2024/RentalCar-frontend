import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMileageFromFilter,
  setMileageToFilter,
} from '../../../../redux/filter/slice';
import {
  selectMileageFromFilter,
  selectMileageToFilter,
} from '../../../../redux/filter/selectors';
import css from './MileageRange.module.css';

const MileageRange = () => {
  const dispatch = useDispatch();
  const mileageFrom = useSelector(selectMileageFromFilter);
  const mileageTo = useSelector(selectMileageToFilter);
  const [localFrom, setLocalFrom] = useState(mileageFrom);
  const [localTo, setLocalTo] = useState(mileageTo);

  useEffect(() => {
    setLocalFrom(mileageFrom);
  }, [mileageFrom]);

  useEffect(() => {
    setLocalTo(mileageTo);
  }, [mileageTo]);

  const handleFromChange = useCallback(
    event => {
      const value = event.target.value;
      setLocalFrom(value);
      dispatch(setMileageFromFilter(value));
    },
    [dispatch]
  );

  const handleToChange = useCallback(
    event => {
      const value = event.target.value;
      setLocalTo(value);
      dispatch(setMileageToFilter(value));
    },
    [dispatch]
  );

  return (
    <div className={css.rangeWrapper}>
      <label className={css.label}>Car mileage / km</label>
      <div className={css.inputGroup}>
        <input
          type="number"
          placeholder="From"
          value={localFrom}
          onChange={handleFromChange}
          className={css.input}
          min="0"
        />
        <input
          type="number"
          placeholder="To"
          value={localTo}
          onChange={handleToChange}
          className={css.input}
          min="0"
        />
      </div>
    </div>
  );
};

export default MileageRange;
