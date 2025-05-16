import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { setBrandFilter } from '../../../../redux/filter/slice';
import { selectBrandFilter } from '../../../../redux/filter/selectors';
import { selectCarBrands } from '../../../../redux/cars/selectors';
import css from './BrandSelect.module.css';

const BrandSelect = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectCarBrands);
  const selectedBrand = useSelector(selectBrandFilter);
  const [isActive, setIsActive] = useState(false);

  const handleChange = event => {
    dispatch(setBrandFilter(event.target.value));
  };

  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(false);

  return (
    <div className={css.selectWrapper}>
      <label htmlFor="brand" className={css.label}>
        Car brand
      </label>
      <div className={css.selectContainer}>
        <select
          id="brand"
          className={css.select}
          value={selectedBrand}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <option value="">Choose a brand</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
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

export default BrandSelect;
