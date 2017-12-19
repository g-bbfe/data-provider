// check for timeout
const checkTimeout = t => {
  return new Promise(resolve => setTimeout(resolve, t)).then(function() {
    return Promise.reject(`timeout: ${t}`);
  });
};
// upload progress is not supported here.
// you can find some information from https://github.com/github/fetch/issues/89

export default class FetchWorker {
  constructor(opt = {}) {
    this.options = {
      timeout: opt.timeout || 1000
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
        // throw request interceptors' errors
        .catch(
          error => {
            throw error;
          }
        )
        // do fetch
        .then(request => {
          const res = fetch(request);
          if (this.options.timeout) {
            return Promise.race([res, checkTimeout(this.options.timeout)]);
          } else {
            return res;
          }
        })
        .then(response => {
          // response interceptors
          return (
            responseInterceptors
              .reduce((response, interceptor) => {
                return response.then(interceptor);
              }, Promise.resolve(response))
              // throw response interceptors' errors
              .catch(
                error => {
                  throw error;
                }
              )
          );
        })
        .then(response => resolve(response))
        .catch(error => {
          reject(error);
        });
    });
  }
}
