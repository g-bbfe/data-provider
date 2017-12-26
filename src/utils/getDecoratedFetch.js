let requestMap = new Map();

export default function(networker) {
  return function(requestId, request) {
    let promise = requestMap.get(requestId);
    if (!(promise instanceof Promise)) {
      promise = networker.fetch(request).then(
        data => {
          requestMap.delete(requestId);
          return data;
        },
        error => {
          requestMap.delete(requestId);
          throw error;
        }
      );
      requestMap.set(requestId, promise);
    }
    return promise;
  };
}
