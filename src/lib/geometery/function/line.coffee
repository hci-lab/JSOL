# ------------------------------------------------------------------------------
# Project     |GoGlib
# Module      |geometry
# Author      |FOU2SH
# Description |drawing line in canvas
# ------------------------------------------------------------------------------
class line
  constructor: (@from_x = 0, @from_y = 0 , @to_x = 100, @to_y = 100)->

    canvas = document.getElementsByTagName("canvas")[0]
    c = canvas.getContext('2d')
    c.beginPath()
    c.moveTo(@from_x , @from_y)
    c.lineTo(@to_x , @to_y)
    c.stroke()

Line = new line()
