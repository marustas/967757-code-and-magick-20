'use strict';

function getMaxValue(times) {
  var maxTime = times[0];

  for (var i = 1; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }
  return maxTime;
}
window.renderStatistics = function (ctx, names, times) {
  var drawBackground = function (x, y, width, height) {
    var offset = 15;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + offset, y + offset, x + width - offset, y + offset, x + width, y);
    ctx.bezierCurveTo(x + width - offset, y + offset, x + width - offset, y + height - offset, x + width, y + height);
    ctx.bezierCurveTo(x + width - offset, y + height - offset, x + offset, y + height - offset, x, y + height);
    ctx.bezierCurveTo(x + offset, y + height - offset, x + offset, y + offset, x, y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  drawBackground(110, 20, 420, 270);
  ctx.fillStyle = 'white';
  drawBackground(100, 10, 420, 270);

  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 130, 30);
  ctx.fillText('Список результатов:', 130, 50);

  var columnMaxHeight = 150;
  var columnX = 130;
  var columnWidth = 40;
  var columnIndent = 90;


  var step = columnMaxHeight / getMaxValue(times);

  for (var j = 0; j < times.length; j++) {
    var columnHeight = step * times[j];
    var columnY = ctx.canvas.clientHeight - columnHeight - 60;

    ctx.fillStyle = '#000000';
    ctx.fillText(times[j].toFixed(0), columnX + columnIndent * j, columnY - 15);

    if (names[j] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = ['hsl(0, 0, ', (Math.random() * 255).toFixed(0), ')'].join('');
    }

    ctx.fillRect(columnX + columnIndent * j, columnY, columnWidth, columnHeight);
    ctx.fillStyle = '#000000';
    ctx.fillText(names[j], columnX + columnIndent * j, columnY + columnHeight + 5);
  }
};

