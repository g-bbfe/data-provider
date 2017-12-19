export default function(options) {
  let url;
  let headers;
  let body;
  let method = options.method || 'GET';
  // Connect baseURL and url.
  if (options.baseURL) {
    url = options.baseURL + options.url;
  } else {
    url = options.url;
  }
  if (options.headers) {
    headers = new Headers(options.headers);
  }
  // GET/DELETE request should not have body
  if (method && !['GET', 'DELETE'].includes(method.toUpperCase())) {
    body = options.data;
  }
  let init = { headers, body, method };

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