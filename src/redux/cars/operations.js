import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCars,
  fetchCarById,
  fetchCarsByFilter,
  fetchBrands,
} from '../../services/api';

export const fetchAllCars = createAsyncThunk(
  'cars/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const data = await fetchCars(params.page, params.limit);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCarDetails = createAsyncThunk(
  'cars/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchCarById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFilteredCars = createAsyncThunk(
  'cars/fetchByFilter',
  async (filters, { rejectWithValue }) => {
    try {
      const apiFilters = {};

      if (filters.brand && filters.brand !== '') {
        apiFilters.brand = filters.brand;
      }

      if (filters.price && filters.price !== '') {
        const priceValue = filters.price.replace('$', '');
        apiFilters.rentalPrice = Number(priceValue);
      }

      if (filters.mileageFrom && filters.mileageFrom !== '') {
        apiFilters.minMileage = Number(filters.mileageFrom);
      }

      if (filters.mileageTo && filters.mileageTo !== '') {
        apiFilters.maxMileage = Number(filters.mileageTo);
      }

      if (filters.page) {
        apiFilters.page = filters.page;
      }
      if (filters.limit) {
        apiFilters.limit = filters.limit;
      }

      const data = await fetchCarsByFilter(apiFilters);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCarBrands = createAsyncThunk(
  'cars/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchBrands();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
