import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCars,
  fetchCarDetails,
  fetchFilteredCars,
  fetchCarBrands,
} from './operations';

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    brands: [],
    car: null,
    isLoading: false,
    error: null,
    totalCars: 0,
    totalPages: 0,
  },
  reducers: {
    resetCarDetails: state => {
      state.car = null;
    },
    resetCars: state => {
      state.items = [];
      state.totalCars = 0;
      state.totalPages = 0;
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
        state.items = Array.isArray(action.payload.cars)
          ? action.payload.cars
          : [];
        state.totalCars = action.payload.totalCars || 0;
        state.totalPages = action.payload.totalPages || 0;
      })
      .addCase(fetchAllCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.totalCars = 0;
        state.totalPages = 0;
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
        const newCars = Array.isArray(action.payload.cars)
          ? action.payload.cars
          : [];
        const currentPage = action.meta.arg.page;

        if (currentPage === 1) {
          state.items = newCars;
        } else {
          state.items = [...state.items, ...newCars];
        }

        state.totalCars = action.payload.totalCars || state.totalCars;
        state.totalPages = action.payload.totalPages || state.totalPages;
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
        state.brands = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCarBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCarDetails, resetCars } = carsSlice.actions;
export default carsSlice.reducer;
