'use strict';

(function () {
  var FIRST_NAMES = [
    'Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'
  ];
  var LAST_NAMES = [
    'да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'
  ];

  var WIZARD_COUNT = 4;

  var userDialog = document.querySelector('.setup');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
  var similarListElements = userDialog.querySelector('.setup-similar-list');


  var generateWizards = function () {
    var wizards = [];

    for (var i = 0; i < WIZARD_COUNT; i++) {
      wizards.push({
        name: window.common.getRandomElement(FIRST_NAMES) + ' ' + window.common.getRandomElement(LAST_NAMES),
        coatColor: window.common.getRandomElement(window.common.COAT_COLORS),
        eyesColor: window.common.getRandomElement(window.common.EYE_COLORS)
      });
    }

    return wizards;
  };

  var renderOneWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderWizards = function (arrWizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrWizards.length; i++) {
      fragment.appendChild(renderOneWizard(arrWizards[i]));
    }
    return fragment;
  };

  var wizards = generateWizards();

  similarListElements.appendChild(renderWizards(wizards));
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
