import createError from '../utils/createError';

// check for timeout
const checkTimeout = t => {
  return new Promise(resolve => setTimeout(resolve, t)).then(function() {
    return Promise.reject(createError(`timeout: ${t}`));
  });
};
// upload progress is not supported here.
// you can find some information from https://github.com/github/fetch/issues/89

export default class FetchWorker {
  constructor(opt = {}) {
    this.options = {
      timeout: opt.timeout || /* istanbul ignore next */ 5000
    };
    this.interceptors = {
      request: [],
      response: []
    };
  }

  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor);
  }

  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor);
  }

  fetch(input, init) {
    const request = new Request(input, init);
    const requestInterceptors = this.interceptors.request;
    const responseInterceptors = this.interceptors.response;

    return new Promise((resolve, reject) => {
      requestInterceptors
        // request interceptors
        .reduce((request, interceptor) => {
          return request.then(interceptor);
        }, Promise.resolve(request))
        // do fetch
        .then(request => {
          if (!(request instanceof Request)) {
            throw createError(
              'Request interceptors may have a wrong return.(Expect a Request object)'
            );
          }
          const res = fetch(request);
          return Promise.race([res, checkTimeout(this.options.timeout)]);
        })
        .then(response => {
          // response interceptors
          return responseInterceptors.reduce((response, interceptor) => {
            return response.then(interceptor);
          }, Promise.resolve(response));
        })
        .then(response => {
          if (!(response instanceof Response)) {
            throw createError(
              'Response interceptors may have a wrong return.(Expect a Response object)'
            );
          }
          resolve(response);
        })
        .catch(error => {
          let errorInstance = error;
          if (!(error instanceof Error)) {
            errorInstance = createError(error);
          }
          reject(errorInstance);
        });
    });
  }
}
