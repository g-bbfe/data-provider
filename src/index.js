import fetchFactory from './networker';
import createRequest from './utils/createRequest';
import decorateFetchWorker from './utils/decorateFetchWorker';
import defaultRequestIdResolver from './utils/requestIdResolver';

export default class DataProvider {
  constructor(options = {}) {
    this.options = options;
    let netWorker = fetchFactory.createWorker({
      timeout: options.timeout || 1000
    });
    this.netWorker = netWorker;
  }

  addRequestInterceptor(interceptor) {
    this.netWorker.addRequestInterceptor(interceptor);
  }

  addResponseInterceptor(interceptor) {
    this.netWorker.addResponseInterceptor(interceptor);
  }

  _createRequest(options) {
    return createRequest(options);
  }

  async request(options = {}) {
    let requestIdResolver = defaultRequestIdResolver;
    if (this.options.requestIdResolver) {
      requestIdResolver = this.options.requestIdResolver;
    }
    let requestId = requestIdResolver(options);
    const req = this._createRequest(options);
    const fetch = decorateFetchWorker(this.netWorker);
    let response = await fetch(requestId, req);
    if (response instanceof Error) {
      return Promise.resolve(response);
    } else {
      if (response.status !== 204) {
        return response.clone().json();
      } else {
        return Promise.resolve();
      }
    }
  }
}
