'use strict';

(function () {
  var userDialog = document.querySelector('.setup');

  var moveButton = document.querySelector('.upload');

  var moveButtonHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var dragged = false;

    var moveButtonMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shiftCoords = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      userDialog.style.top = (userDialog.offsetTop - shiftCoords.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shiftCoords.x) + 'px';
    };

    var moveButtonStopHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', moveButtonMoveHandler);
      document.removeEventListener('mouseup', moveButtonStopHandler);

      if (dragged) {
        var clickPreventDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          moveButton.removeEventListener('click', clickPreventDefaultHandler);
        };
        moveButton.addEventListener('click', clickPreventDefaultHandler);
      }
    };

    document.addEventListener('mousemove', moveButtonMoveHandler);
    document.addEventListener('mouseup', moveButtonStopHandler);
  };

  moveButton.addEventListener('mousedown', moveButtonHandler);

  window.dialog = {
    userDialog: document.querySelector('.setup'),
    getDefaultPosition: function () {
      window.dialog.userDialog.style = '';
    }
  };
})();
