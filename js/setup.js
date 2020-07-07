'use strict';

// открытие и закрытие модального окна настройки волшебника - setup.js

(function () {
  var userDialog = document.querySelector('.setup');

  var setupOpen = document.querySelector('.setup-open');
  var setupIcon = document.querySelector('.setup-open-icon');
  var setupClose = userDialog.querySelector('.setup-close');
  var setupUserInput = userDialog.querySelector('.setup-user-name');


  var togglePopupHandler = function (openPopup) {
    if (openPopup) {
      userDialog.classList.remove('hidden');
      window.dialog.getDefaultPosition();
      document.addEventListener('keydown', escapeKeyHandler);
    } else {
      userDialog.classList.add('hidden');
      document.removeEventListener('keydown', escapeKeyHandler);
    }
  };

  var escapeKeyHandler = function (evt) {
    if (evt.key === window.common.KeyCode.ESCAPE && evt.target !== setupUserInput) {
      evt.preventDefault();
      togglePopupHandler(false);
    }
  };

  setupOpen.addEventListener('click', function () {
    togglePopupHandler(true);
  });

  setupClose.addEventListener('click', function () {
    togglePopupHandler(false);
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === window.common.KeyCode.ENTER) {
      togglePopupHandler(false);
    }
  });

  setupIcon.addEventListener('keydown', function (evt) {
    if (evt.key === window.common.KeyCode.ENTER) {
      togglePopupHandler(true);
    }
  });

})();
