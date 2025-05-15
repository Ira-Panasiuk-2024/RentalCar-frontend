import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBrandFilter,
  selectPriceFilter,
  selectMileageFromFilter,
  selectMileageToFilter,
} from '../../../redux/filter/selectors';

import { fetchCarBrands } from '../../../redux/cars/operations';
import { selectCarBrands } from '../../../redux/cars/selectors';
import Button from '../../common/Button/Button';
import css from '../FilterForm/FilterForm.module.css';
import { PRICE_RANGES, BUTTON_VARIANTS } from '../../../utils/constants';

// const FilterForm = ({ onFilterChange }) => {
//   const dispatch = useDispatch();
//   const carBrands = useSelector(selectCarBrands);
//   const brandFilter = useSelector(selectBrandFilter);
//   const priceFilter = useSelector(selectPriceFilter);
//   const mileageFromFilter = useSelector(selectMileageFromFilter);
//   const mileageToFilter = useSelector(selectMileageToFilter); // Локальний стан форми, ініціалізується з Redux стану

//   const [localBrand, setLocalBrand] = useState(brandFilter);
//   const [localPrice, setLocalPrice] = useState(priceFilter);
//   const [localMileageFrom, setLocalMileageFrom] = useState(mileageFromFilter);
//   const [localMileageTo, setLocalMileageTo] = useState(mileageToFilter); // Ефект для завантаження брендів при першому монтуванні

//   useEffect(() => {
//     if (carBrands && carBrands.length === 0) {
//       dispatch(fetchCarBrands());
//     }
//   }, [dispatch, carBrands]); // ЕФЕКТ ДЛЯ СИНХРОНІЗАЦІЇ ЛОКАЛЬНОГО СТАНУ З REDUX СТАНОМ ФІЛЬТРІВ

//   useEffect(() => {
//     console.log('FilterForm useEffect: Redux filter state changed', {
//       brandFilter,
//       priceFilter,
//       mileageFromFilter,
//       mileageToFilter,
//     });
//     // Оновлюємо локальний стан, коли Redux стан фільтрів змінюється
//     setLocalBrand(brandFilter);
//     setLocalPrice(priceFilter);
//     setLocalMileageFrom(mileageFromFilter);
//     setLocalMileageTo(mileageToFilter);
//   }, [brandFilter, priceFilter, mileageFromFilter, mileageToFilter]); // Залежності: Redux стан фільтрів

//   const handleBrandChange = e => setLocalBrand(e.target.value);
//   const handlePriceChange = e => setLocalPrice(e.target.value);
//   const handleMileageFromChange = e => setLocalMileageFrom(e.target.value);
//   const handleMileageToChange = e => setLocalMileageTo(e.target.value);

//   const handleApplyFilters = useCallback(() => {
//     // Збираємо поточні значення з локального стану форми
//     const filters = {
//       brand: localBrand,
//       price: localPrice,
//       mileageFrom: localMileageFrom,
//       mileageTo: localMileageTo,
//     }; // Викликаємо onFilterChange, який диспатчить setFilters та resetFilters у CatalogPage
//     onFilterChange(filters);
//   }, [
//     localBrand,
//     localPrice,
//     localMileageFrom,
//     localMileageTo,
//     onFilterChange, // onFilterChange має бути в залежностях useCallback
//   ]);

//   return (
//     <div className={css.filterForm}>
//       <div className={css.filterGroup}>
//         <label htmlFor="brand" className={css.label}>
//           Car brand
//         </label>

//         <select
//           id="brand"
//           value={localBrand} // Значення береться з локального стану
//           onChange={handleBrandChange}
//           className={css.select}
//         >
//           <option value="">Choose a brand</option>
//           {carBrands &&
//             carBrands.map(brand => (
//               <option key={brand} value={brand}>
//                 {brand}
//               </option>
//             ))}
//         </select>
//       </div>

//       <div className={css.filterGroup}>
//         <label htmlFor="price" className={css.label}>
//           Price/1 hour
//         </label>

//         <select
//           id="price"
//           value={localPrice} // Значення береться з локального стану
//           onChange={handlePriceChange}
//           className={css.select}
//         >
//           <option value="">Choose a price</option>
//           {PRICE_RANGES.map(price => (
//             <option key={price.value} value={price.value}>
//               {price.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className={css.filterGroup}>
//         <label className={css.label}>Car mileage / km</label>
//         <div className={css.mileageInputGroup}>
//           <input
//             type="number"
//             placeholder="From"
//             value={localMileageFrom} // Значення береться з локального стану
//             onChange={handleMileageFromChange}
//             className={css.input}
//           />

//           <input
//             type="number"
//             placeholder="To"
//             value={localMileageTo} // Значення береться з локального стану
//             onChange={handleMileageToChange}
//             className={css.input}
//           />
//         </div>
//       </div>

//       <div className={css.buttonGroup}>
//         <Button
//           type="button"
//           variant={BUTTON_VARIANTS.search}
//           onClick={handleApplyFilters}
//         >
//           Search
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default FilterForm;

const FilterForm = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const carBrands = useSelector(selectCarBrands);
  const brandFilter = useSelector(selectBrandFilter);
  const priceFilter = useSelector(selectPriceFilter);
  const mileageFromFilter = useSelector(selectMileageFromFilter);
  const mileageToFilter = useSelector(selectMileageToFilter); // Локальний стан форми, ініціалізується з Redux стану

  const [localBrand, setLocalBrand] = useState(brandFilter);
  const [localPrice, setLocalPrice] = useState(priceFilter);
  const [localMileageFrom, setLocalMileageFrom] = useState(mileageFromFilter);
  const [localMileageTo, setLocalMileageTo] = useState(mileageToFilter); // Ефект для завантаження брендів при першому монтуванні

  useEffect(() => {
    if (carBrands && carBrands.length === 0) {
      dispatch(fetchCarBrands());
    }
  }, [dispatch, carBrands]); // ЕФЕКТ ДЛЯ СИНХРОНІЗАЦІЇ ЛОКАЛЬНОГО СТАНУ З REDUX СТАНОМ ФІЛЬТРІВ

  useEffect(() => {
    console.log('FilterForm useEffect: Redux filter state changed', {
      brandFilter,
      priceFilter,
      mileageFromFilter,
      mileageToFilter,
    });
    // Оновлюємо локальний стан, коли Redux стан фільтрів змінюється
    setLocalBrand(brandFilter);
    setLocalPrice(priceFilter);
    setLocalMileageFrom(mileageFromFilter);
    setLocalMileageTo(mileageToFilter);
  }, [brandFilter, priceFilter, mileageFromFilter, mileageToFilter]); // Залежності: Redux стан фільтрів

  const handleBrandChange = e => setLocalBrand(e.target.value);
  const handlePriceChange = e => setLocalPrice(e.target.value);
  const handleMileageFromChange = e => setLocalMileageFrom(e.target.value);
  const handleMileageToChange = e => setLocalMileageTo(e.target.value);

  const handleApplyFilters = useCallback(() => {
    // Додаємо логування перед відправкою фільтрів
    console.log('Applying filters from form:', {
      brand: localBrand,
      price: localPrice,
      mileageFrom: localMileageFrom,
      mileageTo: localMileageTo,
    });

    // Збираємо поточні значення з локального стану форми
    const filters = {
      brand: localBrand,
      price: localPrice,
      mileageFrom: localMileageFrom,
      mileageTo: localMileageTo,
    }; // Викликаємо onFilterChange, який диспатчить setFilters та resetFilters у CatalogPage
    onFilterChange(filters);
  }, [
    localBrand,
    localPrice,
    localMileageFrom,
    localMileageTo,
    onFilterChange, // onFilterChange має бути в залежностях useCallback
  ]);

  return (
    <div className={css.filterForm}>
      <div className={css.filterGroup}>
        <label htmlFor="brand" className={css.label}>
          Car brand
        </label>

        <select
          id="brand"
          value={localBrand} // Значення береться з локального стану
          onChange={handleBrandChange}
          className={css.select}
        >
          <option value="">Choose a brand</option>
          {carBrands &&
            carBrands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
        </select>
      </div>

      <div className={css.filterGroup}>
        <label htmlFor="price" className={css.label}>
          Price/1 hour
        </label>

        <select
          id="price"
          value={localPrice} // Значення береться з локального стану
          onChange={handlePriceChange}
          className={css.select}
        >
          <option value="">Choose a price</option>
          {PRICE_RANGES.map(price => (
            <option key={price.value} value={price.value}>
              {price.label}
            </option>
          ))}
        </select>
      </div>

      <div className={css.filterGroup}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileageInputGroup}>
          <input
            type="number"
            placeholder="From"
            value={localMileageFrom} // Значення береться з локального стану
            onChange={handleMileageFromChange}
            className={css.input}
          />

          <input
            type="number"
            placeholder="To"
            value={localMileageTo} // Значення береться з локального стану
            onChange={handleMileageToChange}
            className={css.input}
          />
        </div>
      </div>

      <div className={css.buttonGroup}>
        <Button
          type="button"
          variant={BUTTON_VARIANTS.search}
          onClick={handleApplyFilters}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default FilterForm;
