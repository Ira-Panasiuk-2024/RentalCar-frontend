import { useDispatch, useSelector } from 'react-redux';
import { setPriceFilter } from '../../../../redux/filter/slice';
import { selectPriceFilter } from '../../../../redux/filter/selectors';
import { PRICE_RANGES } from '../../../../utils/constants';
import css from './PriceSelect.module.css';

const PriceSelect = () => {
  const dispatch = useDispatch();
  const selectedPrice = useSelector(selectPriceFilter);

  const handleChange = event => {
    dispatch(setPriceFilter(event.target.value));
  };

  return (
    <div className={css.selectWrapper}>
      <label htmlFor="price" className={css.label}>
        Price/1 hour
      </label>
      <select
        id="price"
        className={css.select}
        value={selectedPrice}
        onChange={handleChange}
      >
        <option value="">Choose a price</option>
        {PRICE_RANGES.map(price => (
          <option key={price.value} value={price.value}>
            {price.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceSelect;
