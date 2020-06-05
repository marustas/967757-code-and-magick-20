'use strict';

// Function, that returns mages' names
function generateWizards() {
  var DataWizards = {
    COUNT: 4,
    NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green']
  };

  var shuffleWizardNames = shuffleArray(DataWizards.NAMES);
  var shuffleWizardSurnames = shuffleArray(DataWizards.SURNAMES);

  var wizards = [];
  for (var i = 0; i < DataWizards.COUNT; i++) {
    wizards.push({
      names: shuffleWizardNames[i],
      surnames: shuffleWizardSurnames[i],
      coatColor: getRandomElement(DataWizards.COAT_COLOR),
      eyesColor: getRandomElement(DataWizards.EYES_COLOR)
    });
  }
  return wizards;

  // Function, that returns random number in this range
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function, that returns random element from massive
  function getRandomElement(array) {
    var randomIndex = getRandomNumber(1, array.length - 1);
    var randomElement = array[randomIndex];
    return randomElement;
  }

  // Function, that returns new massive from the old in random order
  function shuffleArray(array) {
    for (var j = array.length - 1; j > 0; j--) {
      var randomIndex = getRandomNumber(1, array.length - 1);
      var tempValue = array[j];
      array[j] = array[randomIndex];
      array[randomIndex] = tempValue;
    }
    return array;
  }
}

var userDialog = document.querySelector('.setup');
var setupSimilarWizards = document.querySelector('.setup-similar');

// Function, that clones wizard's template
function renderWizards() {
  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var similarWizards = generateWizards();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < similarWizards.length; i++) {
    fragment.appendChild(renderWizard(similarWizards[i]));
  }
  similarListElement.appendChild(fragment);

  // Function, that creates wizard's template
  function renderWizard(wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.names + '\n ' + wizard.surnames;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  }
}

renderWizards();

// Function, that opens a window with similar wizards
function openPopup() {
  userDialog.classList.remove('hidden');
  setupSimilarWizards.classList.remove('hidden');
}

openPopup();
