import axios from 'axios';

const BACKEND_API = () =>
  axios.create({
    baseURL: process.env.BACKEND_API_URI,
  });

export default {

  getState (id) {
    return BACKEND_API().get(`/states/${id}`);
  },

  getCity (id) {
    return BACKEND_API().get(`/cities/${id}`);
  },

  getStates () {
    return BACKEND_API().get('/states');
  },  

  getCities () {
    return BACKEND_API().get('/cities');
  },

  getStates () {
    return BACKEND_API().get('/states');
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
