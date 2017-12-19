## Data provider

request manager with AOP interceptors.(use fetch)

### Usage

```javascript
import DataProvider from '../src';

let netWorker = new DataProvider({
  timeout: 2000,
  defaultErrorIntercerptor: true // default errorIntercerptor
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
  console.log('--------------error:', error.type);
  return error;
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

```


### Development

```shell
git clone git@hqgit01.intra.legendsec.com:fetc/data-provider.git

npm i

npm run dev
# open http://localhost:8011
```
