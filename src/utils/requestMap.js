let requestMap = new Map();

export default function(key, request) {
  let promise = requestMap.get(key);
  if (!(promise instanceof Promise)) {
    promise = request;
    requestMap.set(key, promise);
  }
  return promise.then(
    data => {
      requestMap.delete(key);
      return data;
    },
    error => {
      requestMap.delete(key);
      return error;
    }
  );
}
