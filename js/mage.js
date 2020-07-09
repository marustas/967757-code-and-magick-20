'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)',
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var wizard = {
    eyesChangeHandler: function () {},
    coatChangeHandler: function () {}
  };

  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  var wizardFireballElement = window.setup.setupElement.querySelector('.setup-fireball-wrap');

  wizardCoatElement.addEventListener('click', function () {
    var newColor = window.utils.getRandomItemFromArray(COAT_COLORS);
    wizardCoatElement.style.fill = newColor;
    wizard.coatChangeHandler(newColor);
  });

  wizardEyesElement.addEventListener('click', function () {
    var newColor = window.utils.getRandomItemFromArray(EYES_COLORS);
    wizardEyesElement.style.fill = newColor;
    wizard.eyesChangeHandler(newColor);
  });

  wizardFireballElement.addEventListener('click', function () {
    wizardFireballElement.style.backgroundColor = window.utils.getRandomItemFromArray(FIREBALL_COLORS);
  });

  window.wizard = wizard;
})();
