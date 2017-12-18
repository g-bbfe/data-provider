import FetchWorker from './workers/Fetch';

export default class fetchFactory {
  static createWorker(options) {
    return new FetchWorker(options);
  }
}
