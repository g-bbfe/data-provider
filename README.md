## Data provider

request manager with AOP interceptors.(use fetch)

### Usage

```javascript
import DataProvider from 'data-provider';
import pathToRegexp from 'path-to-regexp';
import { isObject } from 'lodash';

let baseURL = 'http://mock.bbfe.group/mock/5a1e89e8d3ef9a75725992d3/snc/api/v1';
let id = 0;

const urlCompiler = (path, params) => {
  let url = pathToRegexp.compile(path)(params);
  return url;
};

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


async getAdmin({ path, params }) {
  let url = urlCompiler(path, params);
  let data = await request(url, 'GET');
  return data;
}

getAdmin({ path: '/admins/:adminId', params: { adminId: 1 } })
.then(data => {
  if (data instanceof Error) {
    console.log(data.toString());
  } else {
    conselo.log(data);
  }
});

```

### Development

```shell
git clone git@hqgit01.intra.legendsec.com:fetc/data-provider.git

npm i

npm run dev
# open http://localhost:8011
```
