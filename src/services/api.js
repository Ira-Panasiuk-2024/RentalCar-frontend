import axios from 'axios';

const BASE_URL = 'https://car-rental-api.goit.global';

const carsAPI = axios.create({
  baseURL: BASE_URL,
});

export const fetchCars = async (page = 1, limit = 12) => {
  const response = await carsAPI.get('/cars', {
    params: { page, limit },
  });
  return response.data;
};

export const fetchCarById = async id => {
  const response = await carsAPI.get(`/cars/${id}`);
  return response.data;
};

export const fetchCarsByFilter = async params => {
  const response = await carsAPI.get('/cars', {
    params: {
      ...params,
    },
  });
  return response.data;
};

export const fetchBrands = async () => {
  const response = await carsAPI.get('/brands');
  return response.data;
};

export default carsAPI;
