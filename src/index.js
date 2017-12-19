import fetchFactory from './networker';
import checkError from './interceptors/checkError';
import createRequest from './utils/createRequest';
import setRequest from './utils/requestMap';
import makeKey from './utils/makeKey';

export default class DataProvider {
  constructor(options) {
    let netWorker = fetchFactory.createWorker({
      timeout: options.timeout || 1000
    });
    this.netWorker = netWorker;
    if (options.checkHttpStatus) {
      this.addResponseInterceptor(checkError);
    }
  }

  addRequestInterceptor(interceptor) {
    this.netWorker.addRequestInterceptor(interceptor);
  }

  addResponseInterceptor(interceptor) {
    this.netWorker.addResponseInterceptor(interceptor);
  }

  async request(options = {}) {
    let key = makeKey(options);
    const req = createRequest(options);
    let fetch = this.netWorker.fetch(req);
    let response = await setRequest(key, fetch);
    // console.log(response);
    if (response instanceof Error) {
      return Promise.resolve(response);
    } else {
      if (req.method !== 'DELETE') {
        return response.clone().json();
      } else {
        return Promise.resolve();
      }
    }
  }
}
