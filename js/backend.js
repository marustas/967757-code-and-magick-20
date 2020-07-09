'use strict';

(function () {
  var URL_GET = 'https://javascript.pages.academy/code-and-magick/data';
  var URL_SET = 'https://javascript.pages.academy/code-and-magick';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var handleRequest = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    if (method === 'POST') {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  var load = function (onLoad, onError) {
    handleRequest('GET', URL_GET, onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    handleRequest('POST', URL_SET, onLoad, onError, data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
