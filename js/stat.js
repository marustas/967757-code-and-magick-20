'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_OFFSET = 10;
var CLOUD_PADDING_HORIZONTAL = 20;
var CLOUD_PADDING_VERTICAL = 30;
var TEXT_HEIGHT = 16;
var BAR_WIDTH = 40;
var BAR_MARGIN_TOP = 10;
var CHART_HEIGHT = 150;
var CHART_MARGIN_LEFT = 10;
var GAP = 50;

var barMaxHeight = CHART_HEIGHT - TEXT_HEIGHT * 2 - BAR_MARGIN_TOP;
var cloudShadowX = CLOUD_X + CLOUD_OFFSET;
var cloudShadowY = CLOUD_Y + CLOUD_OFFSET;
var chartLeftX = CLOUD_X + CLOUD_PADDING_HORIZONTAL + CHART_MARGIN_LEFT;
var chartBottomY = CLOUD_Y + CLOUD_HEIGHT - CLOUD_PADDING_VERTICAL;

var renderCloud = function (ctx, x, y, color) {
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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloudShadowX, cloudShadowY, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = TEXT_HEIGHT + 'px ' + 'PT Mono';
  ctx.fillText(
      'Ура вы победили!',
      CLOUD_X + CLOUD_PADDING_HORIZONTAL,
      CLOUD_Y + CLOUD_PADDING_VERTICAL
  );
  ctx.fillText(
      'Список результатов:',
      CLOUD_X + CLOUD_PADDING_HORIZONTAL,
      CLOUD_Y + CLOUD_PADDING_VERTICAL + TEXT_HEIGHT
  );

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgb(255,0,0)';
    } else {
      ctx.fillStyle = 'hsl(240,100%,' + Math.floor(Math.random() * 100) + '%)';
    }

    ctx.fillRect(
        chartLeftX + (BAR_WIDTH + GAP) * i,
        chartBottomY - TEXT_HEIGHT,
        BAR_WIDTH,
        -(barMaxHeight * times[i]) / maxTime
    );

    ctx.fillStyle = '#000';
    ctx.fillText(
        names[i],
        chartLeftX + (BAR_WIDTH + GAP) * i,
        chartBottomY
    );
    ctx.fillText(
        Math.round(times[i]),
        chartLeftX + (BAR_WIDTH + GAP) * i,
        chartBottomY - TEXT_HEIGHT - (barMaxHeight * times[i]) / maxTime - BAR_MARGIN_TOP
    );
  }
};
