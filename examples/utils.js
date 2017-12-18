export const makeUrl = (baseUrl, params, queries) => {
  const reg = /(:[a-zA-Z])\w+/;
  const replace = (str, reg, obj) => {
    return str.replace(reg, function(t) {
      const _t = t.slice(1);
      return obj[_t];
    });
  };
  return replace(baseUrl, reg, params);
};

export const render = function render(data) {
  var $code = document.createElement('code');
  var $br = document.createElement('br');
  $code.textContent = JSON.stringify(data);
  document.querySelector('.container').appendChild($code);
  document.querySelector('.container').appendChild($br);
};
