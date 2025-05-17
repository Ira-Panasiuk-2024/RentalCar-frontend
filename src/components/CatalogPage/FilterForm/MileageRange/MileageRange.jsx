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
import { formatMileage } from '../../../../utils/formatters';

const MileageRange = () => {
  const dispatch = useDispatch();
  const mileageFrom = useSelector(selectMileageFromFilter);
  const mileageTo = useSelector(selectMileageToFilter);
  const [localFrom, setLocalFrom] = useState(mileageFrom);
  const [localTo, setLocalTo] = useState(mileageTo);
  const [displayFrom, setDisplayFrom] = useState(formatMileage(mileageFrom));
  const [displayTo, setDisplayTo] = useState(formatMileage(mileageTo));

  useEffect(() => {
    setLocalFrom(mileageFrom);
    setDisplayFrom(formatMileage(mileageFrom));
  }, [mileageFrom]);

  useEffect(() => {
    setLocalTo(mileageTo);
    setDisplayTo(formatMileage(mileageTo));
  }, [mileageTo]);

  const handleFromChange = useCallback(
    event => {
      const value = event.target.value.replace(/\s/g, '');
      setLocalFrom(value);
      setDisplayFrom(formatMileage(value));
      dispatch(setMileageFromFilter(value));
    },
    [dispatch]
  );

  const handleToChange = useCallback(
    event => {
      const value = event.target.value.replace(/\s/g, '');
      setLocalTo(value);
      setDisplayTo(formatMileage(value));
      dispatch(setMileageToFilter(value));
    },
    [dispatch]
  );

  const handleFromFocus = useCallback(() => {
    const input = document.getElementById('mileageFrom');
    input.value = localFrom;
  }, [localFrom]);

  const handleToFocus = useCallback(() => {
    const input = document.getElementById('mileageTo');
    input.value = localTo;
  }, [localTo]);

  const handleFromBlur = useCallback(() => {
    const input = document.getElementById('mileageFrom');
    input.value = displayFrom;
  }, [displayFrom]);

  const handleToBlur = useCallback(() => {
    const input = document.getElementById('mileageTo');
    input.value = displayTo;
  }, [displayTo]);

  return (
    <div className={css.rangeWrapper}>
      <label className={css.label}>Car mileage / km</label>
      <div className={css.inputGroup}>
        <input
          id="mileageFrom"
          type="text"
          placeholder="From"
          value={displayFrom}
          onChange={handleFromChange}
          onFocus={handleFromFocus}
          onBlur={handleFromBlur}
          className={css.inputFrom}
        />
        <input
          id="mileageTo"
          type="text"
          placeholder="To"
          value={displayTo}
          onChange={handleToChange}
          onFocus={handleToFocus}
          onBlur={handleToBlur}
          className={css.inputTo}
        />
      </div>
    </div>
  );
};

export default MileageRange;
