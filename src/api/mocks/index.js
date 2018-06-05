import mockApplications from './applications';
import mockLastArtifacts from './lastArtifacts';
import mockArtifacts from './artifacts';
import mockUser from './user';

import axios from 'axios';
import Cookies from 'js-cookie';


const LATENCY = 1200;

const BACKEND_API = () =>
  axios.create({
    baseURL: process.env.BACKEND_API_URI,
    headers: {
      'token': Cookies.get('token')
    }
  });

const fakeRequest = (mockResult) =>
  new Promise((resolve) =>
    setTimeout(() =>
      resolve({data: mockResult, status: 200 }, LATENCY)))

export default {
	async getApplications () {
    return await fakeRequest({apps: mockApplications});
	},

  async getApplicationById (cb, applicationId) {
    return await fakeRequest({app: mockApplications[0]});
  },

  async getArtifactsByApplicationId (applicationId) {
    return await fakeRequest({versions: mockArtifacts});
  },

  createApplication (application) {
    return BACKEND_API().post('/application', application);
  },

  async login (credentials) {
    return await fakeRequest({"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImVtYWlsIjoiY2lyby5jaGFuZ0B0dmdsb2JvLmNvbS5iciIsIm5hbWUiOiJDaXJvIENoYW5nIn0sImV4cCI6MTUyNDIzMzY2NywiaXNzIjoiZ2xvYm9zdG9yZS5hdXRoZW50aWNhdGlvbiJ9.wGNUf8jAciDb1gxsJA0DPOWMjItvWch8Nrfx6Yczn4s"});
  },

  async getCurrentUser () {
    return await fakeRequest({user: mockUser});
  }
};
