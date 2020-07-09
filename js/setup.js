'use strict';

(function () {
  var setupElement = document.querySelector('.setup');
  var formElement = setupElement.querySelector('.setup-wizard-form');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupOpenIconElement = setupOpenElement.querySelector('.setup-open-icon');
  var setupCloseElement = setupElement.querySelector('.setup-close');
  var setupUserNameInputElement = setupElement.querySelector('.setup-user-name');

  var openPopup = function () {
    setupElement.classList.remove('hidden');
    window.wizards.renderWizardsData();
    document.addEventListener('keydown', popupEscPressHandler);
  };

  var closePopup = function () {
    setupElement.classList.add('hidden');
    window.wizards.clearWizardsData();
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE && document.activeElement !== setupUserNameInputElement) {
      closePopup();
    }
  };

  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  setupOpenIconElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupCloseElement.addEventListener('click', function () {
    closePopup();
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      closePopup();
    }
  });

  formElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formElement), function () {
      closePopup();
    }, window.wizards.dataErrorHandler);
    evt.preventDefault();
  });

  window.setup = {
    setupElement: setupElement,
  };
})();
