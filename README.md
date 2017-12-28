# Data provider [NEW]

**基于Fetch规范的请求处理模块**，提供对Request和Response对象的切面，具备请求合并的能力。

## Links
- [Fetch_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)
- [旧版 data-provider](https://github.com/g-bbfe/data-provider/tree/legacy) 

## Install

```shell
npm install @bbfe/data-provider
```

## Quick Start

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
  if (res instanceof Error || res.status === 204) {
    return res;
  } else {
    return res.clone().json();
  }
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

## Options 

### `new DataProvider(options)`

初始化DataProvider 实例需要的参数如下：

| 参数名 | 默认值 | 参数类型 | 说明 |
| :--: | :--: | :--: | :------ |
|timeout|5000|Number|请求超时的时间|
|requestIdResolver|() => id++|Function|用于产生请求id的策略函数，如果多个请求的id相等，则这几个请求会被合并。|

### `dataProvider.request(options)`

DataProvider实例发起请求时需要的参数如下：

|参数名|默认值|参数类型|说明|
| :--: | :--: | :--: | :------ |
|url|-(必传)|string|资源的URL（包含param） |
|headers|{'Accept':'application/json, text/plain, \*/*'}|object|请求头，Accept已经默认加上了。|
|method|'GET'|string|请求的方法|
|baseURL|-|string|提供了这个参数的话，他会被拼接到url的前面|
|body|-|string/object|请求数据，可以是Blob, BufferSource, FormData, URLSearchParams, 或 USVString对象（from [mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request)）|
|query|-|string/object|query参数，会被拼接到url的后面|
|mode|'cors'|string|请求的模式, 比如 cors, no-cors, same-origin, 或 navigate。默认值应该为 cors。（from [mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request)）|
|credentials|'include'|string|想要在请求中使用的credentials：: omit, same-origin, 或 include。data-provider将其默认设为了include，即一直会带上cookie。如果不希望这样，需要自行将其设为omit。|
|cache|'default'|string|请求中想要使用的cache mode。（from [mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request)）|
|redirect|'follow'|string|对重定向处理的模式： follow, error, or manual。（from [mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request)）|
|referrer|'client'|string|可选值no-referrer, client, 或一个 URL的 USVString 。（from [mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request)）|
integrity|-|string|包括请求的 subresource integrity 值（from [mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request)）

除此之外，options也可以是一个**Request对象**，如果直接传入Request对象的话，data-provider会直接以这个Request对象发起请求。

## Noticifications
* 请确保body中的内容与headers里的Content-Type是对应的，否则可能会出现请求发送失败的情况，新版data-provider默认只添加'Accept'的相关headers。
* 如果业务中需要针对不同的Content-Type对body进行序列化处理，如有需求， 可引入[qs](https://www.npmjs.com/package/qs)或[jquery-param](https://www.npmjs.com/package/jquery-param)等包。
* 发送请求时，参数可能会包括param、query、body，其中param应该在传入url时就已经拼接在url里面了，只有query和body才应该以参数的形式传入。
* query应该是个单层对象或字符串，如 { type: 'super', group: 1 } 或 'type=1&group=super' 或 '?type=1&group=super'。
* data-provider.request返回的是一个Response对象，需要按业务需求对其执行json化或者其他操作(详细内容请参考mdn对Response的描述)。
* cookie默认是一直会带上的，如果不希望带cookie，需要自行在options中将'credentials'设为'omit'。




