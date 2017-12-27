import networkerFactory from './networker';
import createRequest from './utils/createRequest';
import getDecoratedFetch from './utils/getDecoratedFetch';
import defaultRequestIdResolver from './utils/requestIdResolver';

export default class DataProvider {
  constructor(options = {}) {
    this.options = options;
    let netWorker = networkerFactory.createWorker({
      /**
       * @TODO
       * 可指定 worker
       */
      timeout: options.timeout
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
    /* istanbul ignore if  */
    if (this.options.requestIdResolver) {
      requestIdResolver = this.options.requestIdResolver;
    }
    let requestId = requestIdResolver(options);
    const req = this._createRequest(options);
    const fetch = getDecoratedFetch(this.netWorker);
    let response;
    try {
      response = await fetch(requestId, req);
      return response.clone();
    } catch (e) {
      return e;
    }
  }
}
