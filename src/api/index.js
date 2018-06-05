import mockRequests from './mocks';
import globoStoreRequests from './globostore';

const requests = (process.env.MOCK_REQUESTS) ? mockRequests : globoStoreRequests;

export default requests;
