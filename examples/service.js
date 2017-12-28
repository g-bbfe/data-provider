import DataProvider from '../src';
import { isObject } from 'lodash';

let baseURL = 'http://mock.bbfe.group/mock/5a1e89e8d3ef9a75725992d3/snc/api/v1';

let id = 0;
let dataProvider = new DataProvider({
  timeout: 5000,
  requestIdResolver: function(options) {
    return options.method === 'GET' ? JSON.stringify({ options }) : id++;
  }
});

dataProvider.addRequestInterceptor(request => {
  console.log('--------------request:', request);
  return request;
});

dataProvider.addResponseInterceptor(response => {
  console.log('--------------response:', response);
  return response;
});

const request = async (url, method, body, query) => {
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
  let res = await dataProvider.request(options);
  if (res instanceof Error || res.clone().text() === '') {
    return res;
  } else {
    return res.clone().json();
  }
};

export default request;
