let id = 0;

export default function(options) {
  let key = options.annexable ? JSON.stringify({ options }) : id++;
  return key;
}
