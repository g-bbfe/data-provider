import { isObject } from 'lodash';

/**
 * @param {object} options - 创建 Request 对象所需的参数，详见README
 * @param {string} options.url
 * @param {string} options.baseURL
 * @param {object} options.headers
 * @param {string} options.method
 * @param {(string|object)} options.body
 * @param {object} options.query
 * @param {string} options.mode
 * @param {string} options.credentials
 * @param {string} options.cache
 * @param {string} options.redirect
 * @param {string} options.referrer
 * @param {string} options.integrity
 */

export default function(options) {
  if (options instanceof Request) {
    return options;
  }
  let url;
  let headers;
  let method = (options.method || 'GET').toUpperCase();
  // Connect baseURL and url.
  if (options.baseURL) {
    url = options.baseURL + options.url;
  } else {
    url = options.url;
  }
  if (options.query) {
    if (isObject(options.query)) {
      let query = options.query;
      let keys = Object.keys(query);
      keys.forEach((key, index) => {
        index === 0
          ? (url = `${url}?${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
          : (url = `${url}&${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`);
      });
    } else if (typeof options.query === 'string') {
      let query = options.query;
      query[0] == '?' ? (url = `${url}${query}`) : (url = `${url}?${query}`);
    }
  }
  /* istanbul ignore if  */
  if (options.headers) {
    headers = new Headers(options.headers);
  } else {
    headers = new Headers();
  }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
   */
  headers.append('Accept', 'application/json, text/plain, */*');
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
  } else {
    init.mode = 'cors';
  }
  /* istanbul ignore if  */
  if (options.credentials) {
    init.credentials = options.credentials;
  } else {
    // 默认带上cookie
    init.credentials = 'include';
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
