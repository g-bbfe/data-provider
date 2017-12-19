export default function createError({
  code,
  message,
  type,
  ...args
}) {
  // need a real Error
  let error = new Error(message || `error ${code} occured`);
  error.type = type;
  error.code = code;
  Object.assign(error, args);
  return error;
}
