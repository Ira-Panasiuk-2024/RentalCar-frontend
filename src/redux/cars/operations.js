import { createAsyncThunk } from '@reduxjs/toolkit';
import carsAPI from '../../services/api';

export const fetchAllCars = createAsyncThunk(
  'cars/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const data = await carsAPI.fetchCars(params.page, params.limit);
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
      const data = await carsAPI.fetchCarById(id);
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
      const data = await carsAPI.fetchCarsByFilter(filters);
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
      const data = await carsAPI.fetchBrands();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
