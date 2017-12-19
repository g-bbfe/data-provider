import fetchFactory from './networker';
import Const from './const';
import errorInterceptor from './interceptors/errorInterceptor';
import errorLocaleInterceptor from './interceptors/errorLocaleInterceptor';
import { isEqual } from 'lodash';
import createError from './utils/createError';

export default class DataProvider {
  constructor(options) {
    let netWorker = fetchFactory.createWorker({
      timeout: options.timeout || 1000
    });
    this.netWorker = netWorker;
    this.errorInterceptors = [];
    this.ErrorType = Const.ERROR_TYPE;
    this.requests = {};
    this.responses = {};
    if (options.errorIntercerptor) {
      this.addResponseInterceptor(errorInterceptor);
      this.addErrorInterceptor(errorLocaleInterceptor);
    }
  }

  addRequestInterceptor(interceptor) {
    this.netWorker.addRequestInterceptor(interceptor);
  }

  addResponseInterceptor(interceptor) {
    this.netWorker.addResponseInterceptor(interceptor);
  }

  addErrorInterceptor(interceptor) {
    this.errorInterceptors.push(interceptor);
  }

  // Decorate the fetch, make it can merge identical requests.
  fetch(input, init) {
    const request = new Request(input, init);
    let equal = false;
    // 'DELETE' is idempotent, but may get different response.
    if (['GET', 'PUT'].includes(request.method)) {
      equal = true;
      // If two requests' [method, url, body] are equal, we think they are identical requests.
      ['method', 'url', 'body'].forEach(attr => {
        const value = request[attr];
        const sameRequest =
          this.requests[request.url] &&
          this.requests[request.url][request.method];
        if (!sameRequest || !isEqual(value, sameRequest[attr])) {
          equal = false;
        }
      });
      if (!this.requests[request.url]) {
        this.requests[request.url] = {};
      }
      this.requests[request.url][request.method] = request;
    } else {
      // When an idempotent request has been initiated, the cache may be already obsolete.
      this.requests[request.url] = {};
      this.responses[request.url] = {};
    }
    if (equal === true && this.responses[request.url][request.method]) {
      return Promise.resolve(
        // We should keep the cache be a clone.
        // Otherwise it may cause a TypeError(Already read).
        this.responses[request.url][request.method].clone()
      );
    } else {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await this.netWorker.fetch(request);
          if (['GET', 'PUT'].includes(request.method)) {
            if (!this.responses[request.url]) {
              this.responses[request.url] = {};
            }
            // The response we cached should be a clone.
            // Otherwise it may cause a TypeError(Already read).
            this.responses[request.url][request.method] = response.clone();
          }
          resolve(response);
        } catch (error) {
          let transformedError;
          if (error instanceof Error) {
            transformedError = error;
          } else {
            transformedError = createError({
              message: error
            });
          }
          this.errorInterceptors
            .reduce((errorPromise, interceptor) => {
              return errorPromise.then(error => {
                return interceptor(error);
              });
            }, Promise.resolve(transformedError))
            .then(error => {
              reject(error);
            });
        }
      });
    }
  }
}
