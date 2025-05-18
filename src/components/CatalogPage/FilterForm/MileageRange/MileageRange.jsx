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

  const [isFromFocused, setIsFromFocused] = useState(false);
  const [isToFocused, setIsToFocused] = useState(false);

  useEffect(() => {
    setLocalFrom(mileageFrom);
  }, [mileageFrom]);

  useEffect(() => {
    setLocalTo(mileageTo);
  }, [mileageTo]);

  const handleFromChange = useCallback(
    event => {
      const value = event.target.value.replace(/\s/g, '');
      setLocalFrom(value);
      dispatch(setMileageFromFilter(value));
    },
    [dispatch]
  );

  const handleToChange = useCallback(
    event => {
      const value = event.target.value.replace(/\s/g, '');
      setLocalTo(value);
      dispatch(setMileageToFilter(value));
    },
    [dispatch]
  );

  return (
    <div>
      <label className={css.label}>Car mileage / km</label>
      <div className={css.inputGroup}>
        <input
          id="mileageFrom"
          type="text"
          placeholder="From"
          value={
            isFromFocused
              ? localFrom
              : localFrom !== ''
              ? `From ${formatMileage(localFrom)}`
              : ''
          }
          onChange={handleFromChange}
          onFocus={() => setIsFromFocused(true)}
          onBlur={() => setIsFromFocused(false)}
          className={css.inputFrom}
        />
        <input
          id="mileageTo"
          type="text"
          placeholder="To"
          value={
            isToFocused
              ? localTo
              : localTo !== ''
              ? `To ${formatMileage(localTo)}`
              : ''
          }
          onChange={handleToChange}
          onFocus={() => setIsToFocused(true)}
          onBlur={() => setIsToFocused(false)}
          className={css.inputTo}
        />
      </div>
    </div>
  );
};

export default MileageRange;
