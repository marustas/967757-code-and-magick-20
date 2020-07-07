'use strict';
(function () {
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup');

  var wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
  var coatInput = userDialog.querySelector('input[name="coat-color"]');
  var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var eyesInput = userDialog.querySelector('input[name="eyes-color"]');
  var fireball = userDialog.querySelector('.setup-fireball-wrap');
  var fireballInput = userDialog.querySelector('input[name="fireball-color"]');
  var wizardFull = userDialog.querySelector('.wizard');

  var wizardClickHandler = function (evt) {
    switch (evt.target) {
      case wizardCoat :
        wizardCoat.style.fill = window.common.getRandomElement(window.common.COAT_COLORS);
        coatInput.value = wizardCoat.style.fill;
        break;
      case wizardEyes :
        wizardEyes.style.fill = window.common.getRandomElement(window.common.EYE_COLORS);
        eyesInput.value = wizardEyes.style.fill;
        break;
    }
  };

  var fireballClickHandler = function () {
    var color = window.common.getRandomElement(FIREBALL_COLORS);
    fireball.style.backgroundColor = color;
    fireballInput.value = color;
  };

  wizardFull.addEventListener('click', wizardClickHandler);
  fireball.addEventListener('click', fireballClickHandler);
})();
