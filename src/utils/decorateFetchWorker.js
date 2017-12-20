let requestMap = new Map();

export default function(networker) {
  return function(requestId, request) {
    let promise = requestMap.get(requestId);
    if (!(promise instanceof Promise)) {
      promise = networker.fetch(request);
      requestMap.set(requestId, promise);
      promise.then(
        data => {
          requestMap.delete(requestId);
        },
        error => {
          requestMap.delete(requestId);
          return Promise.reject(error);
        }
      );
    }
    return promise;
  };
}
