import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { setPriceFilter } from '../../../../redux/filter/slice';
import { selectPriceFilter } from '../../../../redux/filter/selectors';
import { PRICE_RANGES } from '../../../../utils/constants';
import css from './PriceSelect.module.css';

const PriceSelect = () => {
  const dispatch = useDispatch();
  const selectedPrice = useSelector(selectPriceFilter);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleChange = event => {
    dispatch(setPriceFilter(event.target.value));
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <div className={css.selectWrapper}>
      <label htmlFor="price" className={css.label}>
        Price/1 hour
      </label>
      <div className={css.selectContainer}>
        <select
          id="price"
          ref={selectRef}
          className={css.select}
          value={selectedPrice}
          onChange={handleChange}
          onClick={handleClick}
          onBlur={handleBlur}
        >
          <option value="" disabled hidden className={css.placeholder}>
            Choose a price
          </option>
          {PRICE_RANGES.map(price => (
            <option
              className={css.option}
              key={price.value}
              value={price.value}
            >
              {price.label}
            </option>
          ))}
        </select>
        <div className={`${css.selectIcon} ${isOpen ? css.rotated : ''}`}>
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default PriceSelect;
