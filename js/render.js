'use strict';
(function () {
  var WIZARDS_COUNT = 4;

  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template');
  var setupSimilarElement = document.querySelector('.setup-similar');
  var similarWizardsListElement = document.querySelector('.setup-similar-list');

  var renderSingleSimilarWizard = function (wizard) {
    var wizardElement = similarWizardTemplateElement.content.cloneNode(true);
    var wizardLabel = wizardElement.querySelector('.setup-similar-label');
    var wizardCoat = wizardElement.querySelector('.wizard-coat');
    var wizardEyes = wizardElement.querySelector('.wizard-eyes');
    wizardLabel.textContent = wizard.name;
    wizardCoat.style.fill = wizard.colorCoat;
    wizardEyes.style.fill = wizard.colorEyes;
    return wizardElement;
  };

  window.render = function (arr) {
    var takeNumber = arr.length > WIZARDS_COUNT ? WIZARDS_COUNT : arr.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderSingleSimilarWizard(arr[i]));
    }
    similarWizardsListElement.appendChild(fragment);
    setupSimilarElement.classList.remove('hidden');
  };
})();
