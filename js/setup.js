'use strict';

var DATA_WIZARDS = {
  COUNT: 4,
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLOR: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

var KEYCODE = {
  ENTER: 13,
  ESC: 27
};

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open'); // кнопка открытия окна
var userDialogClose = userDialog.querySelector('.setup-close'); // кнопка закрытия окна

var userInputName = userDialog.querySelector('.setup-user-name');

var changeCoatColor = userDialog.querySelector('.wizard-coat');
var changeEyesColor = userDialog.querySelector('.wizard-eyes');
var changeFireballColor = userDialog.querySelector('.setup-fireball-wrap');

var setupSimilarWizards = document.querySelector('.setup-similar');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var getNextCoatColor = getIterator(DATA_WIZARDS.COAT_COLOR);
var getNextEyeColor = getIterator(DATA_WIZARDS.EYES_COLOR);
var getNextFireballColor = getIterator(DATA_WIZARDS.FIREBALL_COLOR);

changeCoatColor.addEventListener('click', function () {
  changeCoatColor.style.fill = getNextCoatColor();
});

changeEyesColor.addEventListener('click', function () {
  changeEyesColor.style.fill = getNextEyeColor();
});

changeFireballColor.addEventListener('click', function () {
  changeFireballColor.style.background = getNextFireballColor();
});

// Counter
function getIterator(array) {
  var count = 1;
  return function () {
    if (count >= array.length) {
      count = 0;
    }
    return array[count++];
  };
}

// Form validation
userInputName.addEventListener('invalid', function () {
  var message;
  if (userInputName.validity.tooShort) {
    message = 'Имя должно состоять минимум из 2-х символов';
  } else if (userInputName.validity.tooLong) {
    message = 'Имя не должно превышать 25-ти символов';
  } else if (userInputName.validity.valueMissing) {
    message = 'Введите имя персонажа';
  } else {
    message = '';
  }
  userInputName.setCustomValidity(message);
});

// Input validation for edge
userInputName.addEventListener('input', function (evt) {
  var message;
  var target = evt.target;
  if (target.value.length < 2) {
    message = 'Имя должно состоять минимум из 2-х символов';
  } else {
    message = '';
  }
  target.setCustomValidity(message);
});

// Close the window with the character by pressing Enter button
userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE.ENTER) {
    closeSettingsWizard();
  }
});

// Close the window with the character by pressing the cross
userDialogClose.addEventListener('click', function () {
  closeSettingsWizard();
});


// Open the window with the character by pressing the icon
userDialogOpen.addEventListener('click', function () {
  openSettingsWizard();
  showSimilarWizards();
});

// Open the window with the character by pressing the Enter button
userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE.ENTER) {
    openSettingsWizard();
    showSimilarWizards();
  }
});

// Close the window with the character by pressing  ESC button
function onUserDialogEscPress(evt) {
  if (evt.keyCode === KEYCODE.ESC) {
    closeSettingsWizard();
  }
}

// Opens the window with similar wizards and creates the function for closing it
function openSettingsWizard() {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onUserDialogEscPress);
}

// Closes the window with similar wizards
function closeSettingsWizard() {
  if (document.activeElement !== userInputName) {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onUserDialogEscPress);
  }
}

// Opens the window with similiar wizards
function showSimilarWizards() {
  setupSimilarWizards.classList.remove('hidden');
}

renderWizards();

// Clones the template of the wizard
function renderWizards() {
  var similarWizards = generateWizards();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < similarWizards.length; i++) {
    fragment.appendChild(renderWizard(similarWizards[i]));
  }
  similarListElement.appendChild(fragment);
}

// Creates wizard template
function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.names + '\n ' + wizard.surnames;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

// Returns the massive with wizards
function generateWizards() {
  var shuffleWizardNames = shuffleArray(DATA_WIZARDS.NAMES);
  var shuffleWizardSurnames = shuffleArray(DATA_WIZARDS.SURNAMES);

  var wizards = [];
  for (var i = 0; i < DATA_WIZARDS.COUNT; i++) {
    wizards.push({
      names: shuffleWizardNames[i],
      surnames: shuffleWizardSurnames[i],
      coatColor: getRandomElement(DATA_WIZARDS.COAT_COLOR),
      eyesColor: getRandomElement(DATA_WIZARDS.EYES_COLOR)
    });
  }
  return wizards;
}

// Returns new massive in random order
function shuffleArray(array) {
  var mixedArray = array.slice();
  for (var i = mixedArray.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var tempValue = mixedArray[i];
    mixedArray[i] = mixedArray[randomIndex];
    mixedArray[randomIndex] = tempValue;
  }
  return mixedArray;
}

// returns random massive element
function getRandomElement(array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
    var randomElement = array[randomIndex];
  }
  return randomElement;
}
