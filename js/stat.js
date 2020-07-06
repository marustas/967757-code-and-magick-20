'use strict';

(function () {

  var renderCloud = function (ctx, x, y, color) {
    var CLOUD_WIDTH = 420;
    var CLOUD_HEIGHT = 270;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  var renderText = function (ctx, color, font, baseline, text, coordX, coordY) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = baseline;
    ctx.fillText(text, coordX, coordY);
  };

  window.renderStatistics = function (ctx, names, times) {
    var CLOUD_X = 100;
    var CLOUD_Y = 10;
    var CLOUD_GAP = 20;
    var CLOUD_SHADOW_GAP = 10;
    var GISTOGRAMMA_HEIGHT = 150;
    var BAR_WIDTH = 40;
    var BAR_GAP = 50;
    var TEXT_HEIGHT = 25;
    var TEXT_COLOR = '#000000';
    var TEXT_FONT = '16px PT Mono';
    var TEXT_BASELINE = 'hanging';
    var BLUE_H = 255;
    var BLUE_S = 100;
    var BLUE_L = 50;
    var COLOR_DEFAULT = 'rgba(255, 0, 0, 1)';
    var barHeight = GISTOGRAMMA_HEIGHT - TEXT_HEIGHT * 2;
    var textX = CLOUD_X + CLOUD_GAP;
    var textY = CLOUD_Y + CLOUD_GAP;
    var textY2 = CLOUD_Y + CLOUD_GAP + TEXT_HEIGHT;
    var timeY = CLOUD_Y + BAR_GAP * 1.7;
    var nameY = timeY + GISTOGRAMMA_HEIGHT;
    var USER_NAME = 'Вы';
    var maxTime = getMaxElement(times);

    renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
    renderText(ctx, TEXT_COLOR, TEXT_FONT, TEXT_BASELINE, 'Ура вы победили!', textX, textY);
    renderText(ctx, TEXT_COLOR, TEXT_FONT, TEXT_BASELINE, 'Список результатов:', textX, textY2);

    for (var i = 0; i < names.length; i++) {
      var barX = CLOUD_X + CLOUD_GAP + (BAR_WIDTH + BAR_GAP) * i;
      var barDynamicHeight = (barHeight * times[i]) / maxTime;
      var barY = GISTOGRAMMA_HEIGHT - barDynamicHeight + timeY - TEXT_HEIGHT;
      var colorRandom = 'hsl(' + BLUE_H + ',' + BLUE_S * Math.random() + '%,' + BLUE_L + '%)';
      ctx.fillText(Math.floor(times[i]), barX, timeY);
      ctx.fillStyle = (names[i] === USER_NAME) ? COLOR_DEFAULT : colorRandom;
      ctx.fillRect(barX, barY, BAR_WIDTH, barDynamicHeight);
      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText(names[i], barX, nameY);
    }
  };

})();
