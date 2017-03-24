'use strict';

function __$styleInject(css) {
  if(!(css || window)) {
    return;
  }

  var style = document.createElement('style');
  style.setAttribute('media', 'screen');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}
__$styleInject("body p {\n  font: 12px/1.5 Sans-serif;\n}\nbody p.red {\n  color: red;\n}\nh2 {\n  font: bold 16px/2 Sans-serif;\n  color: gray;\n}\n");