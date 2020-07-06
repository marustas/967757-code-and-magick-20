'use strict';

(function () {

  window.util = {
    showElement: function (el) {
      el.classList.remove('hidden');
    },

    hideElement: function (el) {
      el.classList.add('hidden');
    }
  };

})();
