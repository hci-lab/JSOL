# ------------------------------------------------------------------------------
# Project     |GoGlib
# Module      |geometry
# Author      |FOU2SH
# Description |drawing point in canvas
# ------------------------------------------------------------------------------

class circle

  constructor:(@x = 500 , @y = 500, @radius = 70 ) ->
    canvas = document.getElementsByTagName("canvas")[0]
    context = canvas.getContext('2d')

    context.beginPath()
    context.arc(@x, @y, @radius, 0, 2 * Math.PI, false)

    context.lineWidth = 5
    context.stroke()


Circle = new circle()