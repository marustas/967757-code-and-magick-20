'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 20;
  var COLUMN_GAP = 50;
  var TEXT_HEIGHT = 40;
  var BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var TEXT_STYLE = '16px PT Mono';
  var TEXT_ALIGN = 'hanging';

  var Color = {
    RED: 'rgba(255, 0, 0, 1)',
    BLACK: '#000',
    WHITE: '#fff',
    GREY: 'rgba(0, 0, 0, 0.7)'
  };

  var Message = {
    WON: 'Ура, вы победили!',
    RESULTS: 'Список результатов:'
  };

  var getRandom = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomColor = function () {
    return 'hsl(240,' + getRandom(0, 100) + '%, 25%)';
  };

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

  var getPlayerColor = function (player) {
    return player === 'Вы'
      ? Color.RED
      : getRandomColor();
  };

  var renderPlayerScore = function (player, time, idx, maxTime, ctx) {
    ctx.fillText(player, CLOUD_X + COLUMN_GAP + (COLUMN_GAP + BAR_WIDTH) * idx, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP - GAP);

    ctx.fillText(Math.round(time),
        CLOUD_X + COLUMN_GAP + (COLUMN_GAP + BAR_WIDTH) * idx,
        CLOUD_Y + CLOUD_HEIGHT - FONT_GAP - GAP - TEXT_HEIGHT - (BAR_HEIGHT * time) / maxTime + GAP);

    ctx.fillStyle = getPlayerColor(player);

    ctx.fillRect(CLOUD_X + COLUMN_GAP + (COLUMN_GAP + BAR_WIDTH) * idx, CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT, BAR_WIDTH, (-BAR_HEIGHT * time) / maxTime);
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, Color.GREY);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, Color.WHITE);

    ctx.fillStyle = Color.BLACK;

    ctx.font = TEXT_STYLE;
    ctx.textBaseline = TEXT_ALIGN;

    ctx.fillText(Message.WON, CLOUD_X + FONT_GAP, CLOUD_Y + GAP);
    ctx.fillText(Message.RESULTS, CLOUD_X + FONT_GAP, CLOUD_Y + GAP + FONT_GAP);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {
      renderPlayerScore(players[i], times[i], i, maxTime, ctx);
      ctx.fillStyle = Color.BLACK;
    }
  };
})();
