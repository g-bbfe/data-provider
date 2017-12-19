## Data provider

request manager with AOP interceptors.(use fetch)

### Usage

```javascript
import DataProvider from 'data-provider';
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
