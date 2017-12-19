export const render = function render(data) {
  var $code = document.createElement('code');
  var $br = document.createElement('br');
  $code.textContent = JSON.stringify(data);
  document.querySelector('.container').appendChild($code);
  document.querySelector('.container').appendChild($br);
};
