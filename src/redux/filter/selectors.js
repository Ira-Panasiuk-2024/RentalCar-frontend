import { createSelector } from '@reduxjs/toolkit';

const selectFilterState = state => state.filter;

export const selectBrandFilter = state => state.filter.brand;
export const selectPriceFilter = state => state.filter.price;
export const selectMileageFromFilter = state => state.filter.mileageFrom;
export const selectMileageToFilter = state => state.filter.mileageTo;

export const selectFilters = createSelector([selectFilterState], filter => ({
  brand: filter.brand,
  price: filter.price,
  mileageFrom: filter.mileageFrom,
  mileageTo: filter.mileageTo,
}));
