import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { setPriceFilter } from '../../../../redux/filter/slice';
import { selectPriceFilter } from '../../../../redux/filter/selectors';
import { PRICE_RANGES } from '../../../../utils/constants';
import css from './PriceSelect.module.css';

const PriceSelect = () => {
  const dispatch = useDispatch();
  const selectedPrice = useSelector(selectPriceFilter);
  const [isActive, setIsActive] = useState(false);

  const handleChange = event => {
    dispatch(setPriceFilter(event.target.value));
  };

  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(false);

  return (
    <div className={css.selectWrapper}>
      <label htmlFor="price" className={css.label}>
        Price/1 hour
      </label>
      <div className={css.selectContainer}>
        <select
          id="price"
          className={css.select}
          value={selectedPrice}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <option value="">Choose a price</option>
          {PRICE_RANGES.map(price => (
            <option key={price.value} value={price.value}>
              {price.label}
            </option>
          ))}
        </select>
        <div className={css.selectIcon}>
          {isActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
    </div>
  );
};

export default PriceSelect;
