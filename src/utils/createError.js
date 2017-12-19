const DEFAULT_ERROR_MSG = 'undefined message';
export default function createError({
  code,
  message = DEFAULT_ERROR_MSG,
  type,
  ...args
}) {
  // need a real Error
  let error = new Error(message);
  error.type = type;
  error.code = code;
  Object.assign(error, args);
  return error;
}
