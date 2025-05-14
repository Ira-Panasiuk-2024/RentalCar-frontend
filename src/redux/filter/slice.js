import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brand: '',
  price: '',
  mileageFrom: '',
  mileageTo: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setBrandFilter: (state, action) => {
      state.brand = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.price = action.payload;
    },
    setMileageFromFilter: (state, action) => {
      state.mileageFrom = action.payload;
    },
    setMileageToFilter: (state, action) => {
      state.mileageTo = action.payload;
    },
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  setBrandFilter,
  setPriceFilter,
  setMileageFromFilter,
  setMileageToFilter,
  setFilters,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
