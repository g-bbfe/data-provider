import FetchWorker from './workers/Fetch';

export default class networkerFactory {
  static createWorker(options) {
    /**
     * @TODO
     * 能自行添加、选择 worker
     */
    return new FetchWorker(options);
  }
}
