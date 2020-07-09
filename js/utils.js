'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomItemFromArray = function (arr) {
    return arr[getRandomInt(0, arr.length - 1)];
  };

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    getRandomItemFromArray: getRandomItemFromArray
  };
})();
