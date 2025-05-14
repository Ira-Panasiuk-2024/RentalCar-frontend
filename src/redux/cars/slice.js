import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCars,
  fetchCarDetails,
  fetchFilteredCars,
  fetchCarBrands,
} from './operations';

const initialState = {
  items: [],
  car: null,
  brands: [],
  isLoading: false,
  error: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    resetCarDetails: state => {
      state.car = null;
    },
    resetCars: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllCars.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCarDetails.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.car = action.payload;
      })
      .addCase(fetchCarDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilteredCars.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFilteredCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchFilteredCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCarBrands.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchCarBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCarDetails, resetCars } = carsSlice.actions;
export default carsSlice.reducer;
