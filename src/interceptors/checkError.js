import createError from '../utils/createError';

let isErrorHttpStatusCode = function(httpStatus) {
  return httpStatus >= 300 || httpStatus < 200;
};

export default function(responce) {
  let result = responce;
  if (isErrorHttpStatusCode(responce.status)) {
    // 交换 status 和 code ,  status => businessError.code, code =>  businessError.subcode
    let { code, message, error } = responce.clone().json();
    let rawError = Object.assign({}, {
      code: responce.status,
      subcode: code,
      message,
      error
    });

    result = createError(rawError);
  }
  return Promise.resolve(result);
}
