'use strict';

(function () {
  var QUANTITY_WIZARDS = 4;
  var WIZARD_COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var WIZARD_EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var WIZARD_FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var setupSimilarElement = document.querySelector('.setup-similar');
  setupSimilarElement.classList.remove('hidden');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var getArrayRandomElement = function (arr) {
    var random = Math.floor(Math.random() * arr.length);

    return arr[random];
  };

  var getArrayRandomElements = function (arr, quantity) {
    var newArr = [];
    var index;

    for (var i = 0; i < quantity; i++) {
      index = Math.floor(Math.random() * arr.length);
      newArr.push(arr[index]);
      arr.splice(index, 1);
    }

    return newArr;
  };

  var getFragmentWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizards.length; i++) {
      var wizardElement = similarWizardTemplate.cloneNode(true);

      wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].colorEyes;

      fragment.appendChild(wizardElement);
    }

    return fragment;
  };

  var successHandler = function (wizards) {
    similarListElement.appendChild(getFragmentWizards(getArrayRandomElements(wizards, QUANTITY_WIZARDS)));
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = '0';
    node.style.right = '0';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var setupWizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = setupWizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = setupWizardElement.querySelector('.wizard-eyes');
  var setupFireballElement = document.querySelector('.setup-fireball-wrap');
  var coatColorInput = document.querySelector('input[name="coat-color"]');
  var eyesColorInput = document.querySelector('input[name="eyes-color"]');
  var fireballColorInput = document.querySelector('input[name="fireball-color"]');

  var selectColorPartsWizard = function (part, color, input) {
    part.style = ((part.matches('div')) ? 'background: ' : 'fill: ') + color + ';';
    input.value = color;
  };

  wizardCoatElement.addEventListener('click', function () {
    selectColorPartsWizard(wizardCoatElement, getArrayRandomElement(WIZARD_COAT_COLORS), coatColorInput);
  });

  wizardEyesElement.addEventListener('click', function () {
    selectColorPartsWizard(wizardEyesElement, getArrayRandomElement(WIZARD_EYES_COLORS), eyesColorInput);
  });

  setupFireballElement.addEventListener('click', function () {
    selectColorPartsWizard(setupFireballElement, getArrayRandomElement(WIZARD_FIREBALL_COLORS), fireballColorInput);
  });

  var form = document.querySelector('.setup-wizard-form');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), function () {
      window.dialog.closePopup();
    }, errorHandler);
  });
})();
