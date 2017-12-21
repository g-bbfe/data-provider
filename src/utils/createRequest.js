import { isObject } from 'lodash';

export default function(options) {
  let url;
  let headers;
  let method = (options.method || 'GET').toUpperCase();
  // Connect baseURL and url.
  if (options.baseURL) {
    url = options.baseURL + options.url;
  } else {
    url = options.url;
  }
  if (options.query && isObject(options.query)) {
    let query = options.query;
    let keys = Object.keys(query);
    keys.forEach((key, index) => {
      index === 0
        ? (url = `${url}?${key}=${query[key]}`)
        : (url = `${url}&${key}=${query[key]}`);
    });
  }
  if (options.headers) {
    headers = new Headers(options.headers);
  }
  let init = { headers, method };

  // GET/DELETE request should not have body
  if (method && !['GET', 'DELETE'].includes(method)) {
    init.body = options.body;
  }
  // Other options
  if (options.mode) {
    init.mode = options.mode;
  }
  if (options.credentials) {
    init.credentials = options.credentials;
  }
  if (options.cache) {
    init.cache = options.cache;
  }
  if (options.redirect) {
    init.redirect = options.redirect;
  }
  if (options.referrer) {
    init.referrer = options.referrer;
  }
  if (options.integrity) {
    init.integrity = options.integrity;
  }

  return new Request(url, init);
}
