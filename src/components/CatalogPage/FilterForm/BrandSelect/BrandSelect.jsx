import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setBrandFilter } from '../../../../redux/filter/slice';
import { selectBrandFilter } from '../../../../redux/filter/selectors';
import { fetchCarBrands } from '../../../../redux/cars/operations';
import { selectCarBrands } from '../../../../redux/cars/selectors';
import css from './BrandSelect.module.css';

const BrandSelect = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectCarBrands);
  const selectedBrand = useSelector(selectBrandFilter);

  useEffect(() => {
    if (brands.length === 0) {
      dispatch(fetchCarBrands());
    }
  }, [dispatch, brands.length]);

  const handleChange = event => {
    dispatch(setBrandFilter(event.target.value));
  };

  return (
    <div className={css.selectWrapper}>
      <label htmlFor="brand" className={css.label}>
        Car brand
      </label>
      <select
        id="brand"
        className={css.select}
        value={selectedBrand}
        onChange={handleChange}
      >
        <option value="">All brands</option>
        {brands.map(brand => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BrandSelect;
