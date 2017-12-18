import DataProvider from '../src';

let netWorker = new DataProvider({
  timeout: 2000,
  errorIntercerptor: true
});

// netWorker.addRequestInterceptor(request => {
//   console.log('--------------request:', request);
//   return request;
// });

// netWorker.addResponseInterceptor(response => {
//   console.log('--------------response:', response);
//   return response;
// });

netWorker.addResponseInterceptor(response => {
  if (response.status > 400) {
    return Promise.reject(`Maybe there's something wrong: ${response.status}`);
  }
  return response;
});

const request = (input, init) => {
  return netWorker.fetch(input, init).then(
    data => data,
    error => {
      console.warn('I get an error:', error);
      throw error;
    }
  );
};

export default request;
