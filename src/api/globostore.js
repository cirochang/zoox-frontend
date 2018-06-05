import axios from 'axios';
import Cookies from 'js-cookie';
import mockApplications from './mocks/applications';
import mockLastArtifacts from './mocks/lastArtifacts';
import mockUser from './mocks/user';

const BACKEND_API = () =>
  axios.create({
    baseURL: process.env.BACKEND_API_URI,
    headers: {
      'token': Cookies.get('token')
    }
  });

export default {

  createApplication (application) {
    return BACKEND_API().post('/application', application);
  },

  updateApplication (application) {
    const {id, ...app} = application;
    return BACKEND_API().put(`/application/${id}`, app);
  },

  deleteApplication (id) {
    return BACKEND_API().delete(`/application/${id}`);
  },

  createArtifact (artifact, onUploadProgress) {
    let formData = new FormData();
    Object.keys(artifact).map(function(objectKey, index) {
      formData.append(objectKey, artifact[objectKey]);
    });
    return BACKEND_API().post('/artifact', formData, {
      'content-type': 'multipart/form-data',
      onUploadProgress
    });
  },

  updateArtifact (artifact, onUploadProgress) {
    const {id, ...art} = artifact;
    let formData = new FormData();
    Object.keys(art).map(function(objectKey, index) {
      formData.append(objectKey, artifact[objectKey]);
    });
    return BACKEND_API().put(`/artifact/${id}`, formData, {
       'content-type': 'multipart/form-data',
       onUploadProgress,
     });
  },

  deleteArtifact (id) {
    return BACKEND_API().delete(`/artifact/${id}`);
  },

  setProductionArtifact ({applicationId, artifactId}) {
    return BACKEND_API().post(`/application/${applicationId}/set_production_artifact`, { artifactId });
  },

	getApplications (query) {
    const search = query.search ? query.search : '';
    const page = query.page ? query.page : 1;
    const os = query.os ? query.os : '';
    const limit = query.limit ? query.limit : 24;
    return BACKEND_API().get(`/application?search=${search}&page=${page}&os=${os}&limit=${limit}`);
	},

  getApplicationById (applicationId) {
    return BACKEND_API().get(`/application/${applicationId}`);
  },

  getMyApplications () {
    return BACKEND_API().get('/my_applications');
  },

  getArtifactsByApplicationId (applicationId) {
    return BACKEND_API().get(`/my_artifacts/${applicationId}`)
  },

  login (credentials) {
    return BACKEND_API().post('/auth', credentials);
  },

  getCurrentUser () {
    return BACKEND_API().get('/current_user');
  },

  seeTutorial() {
    return BACKEND_API().post(`/user/tutorial`);
  }
};
