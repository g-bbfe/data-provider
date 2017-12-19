import DataProvider from '../src';

let netWorker = new DataProvider({
  timeout: 2000,
  defaultErrorIntercerptor: true
});

netWorker.addRequestInterceptor(request => {
  console.log('--------------request:', request);
  return request;
});

netWorker.addResponseInterceptor(response => {
  console.log('--------------response:', response);
  return response;
});

netWorker.addErrorInterceptor(error => {
  console.log('--------------error:', error.locale);
  return error;
});

const request = (input, init) => {
  return netWorker.fetch(input, init).then(
    data => data,
    error => {
      // console.warn('I get an error:', error);
      throw error;
    }
  );
};

export default request;
