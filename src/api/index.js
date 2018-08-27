import axios from 'axios';

const BACKEND_API = () =>
  axios.create({
    baseURL: process.env.BACKEND_API_URI,
    headers: {
      'X-Api-Key': process.env.BACKEND_API_KEY
    }
  });

export default {

  getState (id) {
    return BACKEND_API().get(`/states/${id}`);
  },

  getCity (id) {
    return BACKEND_API().get(`/cities/${id}`);
  },

  getStates ({term, isReverse}) {
    return BACKEND_API().get(`/states?name=${term}&sort_by=name${isReverse ? ',desc' : ''}`);
  },

  getCities ({term, isReverse}) {
    return BACKEND_API().get(`/cities?name=${term}&sort_by=name${isReverse ? ',desc' : ''}`);
  },

  createState (state) {
    return BACKEND_API().post('/states', state);
  },

  createCity (city) {
    return BACKEND_API().post('/cities', city);
  },

  deleteState (id) {
    return BACKEND_API().delete(`/states/${id}`);
  },

  deleteCity (id) {
    return BACKEND_API().delete(`/cities/${id}`);
  },

  updateCity (id, city) {
    return BACKEND_API().put(`/cities/${id}`, city);
  },

  updateState (id, state) {
    return BACKEND_API().put(`/states/${id}`, state);
  },
};
