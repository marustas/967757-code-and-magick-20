'use strict';

(function () {
  var generateRandomIndex = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  window.common = {
    KeyCode: {
      ENTER: 'Enter',
      ESCAPE: 'Escape'
    },
    getRandomElement: function (arr) {
      return arr[generateRandomIndex(0, arr.length)];
    },
    EYE_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    COAT_COLORS: [
      'rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
    ],
  };
})();
