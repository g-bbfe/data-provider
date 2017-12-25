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
  /* istanbul ignore if  */
  if (options.headers) {
    headers = new Headers(options.headers);
  }
  let init = { headers, method };

  // GET/DELETE request should not have body
  /* istanbul ignore if  */
  if (method && !['GET', 'DELETE'].includes(method)) {
    init.body = options.body;
  }
  // Other options
  /* istanbul ignore if  */
  if (options.mode) {
    init.mode = options.mode;
  }
  /* istanbul ignore if  */
  if (options.credentials) {
    init.credentials = options.credentials;
  }
  /* istanbul ignore if  */
  if (options.cache) {
    init.cache = options.cache;
  }
  /* istanbul ignore if  */
  if (options.redirect) {
    init.redirect = options.redirect;
  }
  /* istanbul ignore if  */
  if (options.referrer) {
    init.referrer = options.referrer;
  }
  /* istanbul ignore if  */
  if (options.integrity) {
    init.integrity = options.integrity;
  }

  return new Request(url, init);
}
