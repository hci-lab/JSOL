# ------------------------------------------------------------------------------
# Project     |GoGlib
# Module      |geometry
# Author      |FOU2SH
# Description |drawing point in canvas
# ------------------------------------------------------------------------------
class point
  constructor:(@x = 500, @y = 500) ->
    canvas = document.getElementsByTagName("canvas")[0]
    context = canvas.getContext('2d')
    centerX = @x
    centerY = @y
    radius = 2;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'black';
    context.fill();
    context.stroke();


Point = new point()



