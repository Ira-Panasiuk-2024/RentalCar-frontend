import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  selectBrandFilter,
  selectPriceFilter,
  selectMileageFromFilter,
  selectMileageToFilter,
} from '../../../redux/filter/selectors';
import BrandSelect from '../../CatalogPage/FilterForm/BrandSelect/BrandSelect';
import PriceSelect from '../../CatalogPage/FilterForm/PriceSelect/PriceSelect';
import MileageRange from '../../CatalogPage/FilterForm/MileageRange/MileageRange';
import Button from '../../common/Button/Button';
import css from '../FilterForm/FilterForm.module.css';
import { BUTTON_VARIANTS } from '../../../utils/constants';

const FilterForm = ({ onFilterChange }) => {
  const brandFilter = useSelector(selectBrandFilter);
  const priceFilter = useSelector(selectPriceFilter);
  const mileageFromFilter = useSelector(selectMileageFromFilter);
  const mileageToFilter = useSelector(selectMileageToFilter);

  const handleApplyFilters = useCallback(() => {
    onFilterChange({
      brand: brandFilter,
      price: priceFilter,
      mileageFrom: mileageFromFilter,
      mileageTo: mileageToFilter,
    });
  }, [
    brandFilter,
    priceFilter,
    mileageFromFilter,
    mileageToFilter,
    onFilterChange,
  ]);

  return (
    <div className={css.filterForm}>
      <BrandSelect />
      <PriceSelect />
      <MileageRange />

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
