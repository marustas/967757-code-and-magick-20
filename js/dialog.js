'use strict';

(function () {

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var setupClose = setup.querySelector('.setup-close');

  function documentKeydownHandler(evt) {
    if (evt.key === ESC_KEY) {
      window.util.hideElement(setup);
    }
  }

  function openbtnClickHandler() {
    window.util.showElement(setup);
    document.addEventListener('keydown', documentKeydownHandler);
  }

  function closebtnClickHandler() {
    window.util.hideElement(setup);
    document.removeEventListener('keydown', documentKeydownHandler);
  }

  function openbtnKeydownHandler(evt) {
    if (evt.key === ENTER_KEY) {
      window.util.showElement(setup);
    }
  }

  function closebtnKeydownHandler(evt) {
    if (evt.key === ENTER_KEY) {
      window.util.hideElement(setup);
    }
  }

  window.util.showElement(setup);

  document.addEventListener('keydown', documentKeydownHandler);
  setupOpen.addEventListener('click', openbtnClickHandler);
  setupOpen.addEventListener('keydown', openbtnKeydownHandler);
  setupClose.addEventListener('click', closebtnClickHandler);
  setupClose.addEventListener('keydown', closebtnKeydownHandler);

})();
