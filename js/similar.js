'use strict';

(function () {
  var similarWizardsListElement = document.querySelector('.setup-similar-list');

  var currentCoatColor;
  var currentEyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === currentCoatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === currentEyesColor) {
      rank += 1;
    }
    return rank;
  };

  window.wizard.eyesChangeHandler = window.debounce(function (color) {
    currentEyesColor = color;
    updateWizards();
  });

  window.wizard.coatChangeHandler = window.debounce(function (color) {
    currentCoatColor = color;
    updateWizards();
  });

  var dataSuccessHandler = function (arr) {
    wizards = arr;
    updateWizards();
  };

  var dataErrorHandler = function (errorMessage) {
    var errorElement = document.createElement('div');
    errorElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    errorElement.style.position = 'absolute';
    errorElement.style.left = 0;
    errorElement.style.right = 0;
    errorElement.style.fontSize = '30px';
    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  var updateWizards = function () {
    clearWizardsData();
    window.render(wizards.slice().
      sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
        }
        return rankDiff;
      }));
  };

  var renderWizardsData = function () {
    window.backend.load(dataSuccessHandler, dataErrorHandler);
  };

  var clearWizardsData = function () {
    while (similarWizardsListElement.firstChild) {
      similarWizardsListElement.removeChild(similarWizardsListElement.firstChild);
    }
  };

  window.wizards = {
    renderWizardsData: renderWizardsData,
    clearWizardsData: clearWizardsData,
    dataErrorHandler: dataErrorHandler
  };
})();
