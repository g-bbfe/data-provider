import createError from '../utils/createError';
import Const from '../const';
const ERROR_TYPE = Const.ERROR_TYPE;

let isUnValidateStatus = function(httpStatus) {
  return httpStatus >= 300 || httpStatus < 200;
};

let isErrorData = function(data) {
  // code exist and != 0
  return data && (data.error || (data.code && data.code !== 0));
};

export default function(responce) {
  return new Promise((resolve, reject) => {
    let status = responce.status;
    let data = {};
    responce
      .clone()
      .json()
      .then(res => {
        data = res;
      })
      .catch(e => {
        data = {};
      });
    if (isUnValidateStatus(status) || isErrorData(data)) {
      let httpStatusCode = status;
      if (!isUnValidateStatus(status)) {
        // merge old interface
        httpStatusCode = 406;
      }
      let { code, message } = data.error || data;
      let rawError = Object.assign(
        {},
        {
          code,
          message: message || `Get ${httpStatusCode} error`,
          type: ERROR_TYPE.BUSINESS,
          httpStatusCode
        }
      );
      let businessError = createError(rawError);
      reject(businessError);
    } else {
      resolve(responce);
    }
  });
}
