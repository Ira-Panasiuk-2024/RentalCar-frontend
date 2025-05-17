import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { setBrandFilter } from '../../../../redux/filter/slice';
import { selectBrandFilter } from '../../../../redux/filter/selectors';
import { selectCarBrands } from '../../../../redux/cars/selectors';
import css from './BrandSelect.module.css';

const BrandSelect = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectCarBrands);
  const selectedBrand = useSelector(selectBrandFilter);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleChange = event => {
    dispatch(setBrandFilter(event.target.value));
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
      <label htmlFor="brand" className={css.label}>
        Car brand
      </label>
      <div className={css.selectContainer}>
        <select
          id="brand"
          ref={selectRef}
          className={css.select}
          value={selectedBrand}
          onChange={handleChange}
          onClick={handleClick}
          onBlur={handleBlur}
        >
          <option value="" disabled hidden className={css.placeholder}>
            Choose a brand
          </option>
          {brands.map(brand => (
            <option className={css.option} key={brand} value={brand}>
              {brand}
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

export default BrandSelect;
