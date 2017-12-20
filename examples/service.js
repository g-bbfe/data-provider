import DataProvider from '../src';
import { isObject } from 'lodash';

let baseURL = 'http://mock.bbfe.group/mock/5a1e89e8d3ef9a75725992d3/snc/api/v1';
let id = 0;

let netWorker = new DataProvider({
  timeout: 5000,
  requestIdResolver: function(options) {
    return options.method === 'GET' ? JSON.stringify({ options }) : id++;
  }
});

netWorker.addRequestInterceptor(request => {
  console.log('--------------request:', request);
  return request;
});

netWorker.addResponseInterceptor(response => {
  console.log('--------------response:', response);
  return response;
});

const request = (url, method, body, query) => {
  let options = {
    url,
    method,
    baseURL: baseURL || '',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (body) {
    options.body = isObject(body) ? JSON.stringify(body) : body;
  }
  if (query) {
    options.query = query;
  }
  return netWorker.request(options);
};

export default request;
