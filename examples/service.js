import DataProvider from '../src';
import { isObject } from 'lodash';

let baseURL = 'http://mock.bbfe.group/mock/5a1e89e8d3ef9a75725992d3/snc/api/v1';

let netWorker = new DataProvider({
  timeout: 5000,
  checkHttpStatus: true
});

netWorker.addRequestInterceptor(request => {
  console.log('--------------request:', request);
  return request;
});

netWorker.addResponseInterceptor(response => {
  console.log('--------------response:', response);
  return response;
});

const request = (url, method, payload) => {
  let options = {
    url: url,
    method: method,
    baseURL: baseURL || '',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (method.toUpperCase() === 'GET') {
    options.annexable = true;
  }
  if (isObject(payload)) {
    options.data = JSON.stringify(payload);
  }
  return netWorker.request(options);
};

export default request;
