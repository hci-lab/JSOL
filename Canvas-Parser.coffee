class Canvas_Geometry

class Line extends Canvas_Geometry


Line::draw = (obj)->
  for i in obj
    color = if (i.color is null || i.color is undefined )
      "#FF0000"
    else
      i.color
    width = if (i.width is null || i.width is undefined )
      1
    else
      i.width

    lib.context.beginPath()
    lib.context.moveTo(i.startX, i.startY)
    lib.context.lineTo(i.endX, i.endY)
    lib.context.strokeStyle = color
    lib.context.lineWidth = width
    lib.context.stroke()
    lib.context.closePath()
    lib.context.strokeStyle = "#000000"
    lib.context.lineWidth = 1



#"Area" : [{
#  "points": [[10,30], [40,150], [70,100]],
#  "color" : "black",
#  "fillColor": "yellow",
#  "margin": 5
#}]

class Area extends Canvas_Geometry

Area::draw = (obj)->
  for i in obj
    color = if (i.color is null || i.color is undefined )
      "#FF0000"
    else
      i.color
    fillColor = if (i.fillColor is null || i.fillColor is undefined )
      "#ffffff"
    else
      i.fillColor

    lib.context.beginPath()
    lib.context.lineCap = "round"
    lib.context.moveTo(i.points[0][0], i.height-i.margin)
    for k in i.points
      lib.context.lineTo(k[0],k[1])
    lib.context.lineTo(i.points[i.points.length-1][0],i.height-i.margin)
    lib.context.fillStyle = fillColor
    lib.context.fill()
    lib.context.strokeStyle = color
    lib.context.stroke()
    lib.context.closePath()
    lib.context.strokeStyle = "#000000"
    lib.context.lineWidth = 1
    lib.context.fillStyle = "#000000"


      



class Background extends Canvas_Geometry

Background::draw = (value)->
  url = "http"
  if value.indexOf(url) > -1
    lib.canvas.style.backgroundImage = 'url('+value+')'
    lib.canvas.style.backgroundSize = '100% 100%'
  else
    lib.canvas.style.backgroundColor = value




class Diamond extends Canvas_Geometry

Diamond::draw = (obj)->
  for i in obj
    color = if (i.color is null || i.color is undefined )
      "#FF0000"
    else
      i.color

    cursorx = 4
    cursory = 4
    lib.context.beginPath()
    lib.context.moveTo(i.x, i.y-cursory)
    lib.context.lineTo(i.x+cursorx, i.y)
    lib.context.lineTo(i.x, i.y+cursory)
    lib.context.lineTo(i.x - cursorx, i.y)
    lib.context.lineTo(i.x, i.y-cursory)
    lib.context.fillStyle = color
    lib.context.fill()
    lib.context.strokeStyle = color
    lib.context.stroke()
    lib.context.closePath()
    lib.context.strokeStyle = "#000000"
    lib.context.lineWidth = 1
    lib.context.fillStyle = "#000000"


class Point extends Canvas_Geometry

Point::draw = (obj) ->
  for i in obj
    color = if (i.color is null || i.color is undefined )
      "#000000"
    else
      i.color
    fillColor = if (i.fillColor is null || i.fillColor is undefined )
      "#ffffff"
    else
      i.fillColor
    linewidth = if (i.linewidth is null || i.linewidth is undefined )
      1
    else
      i.linewidth
    radius = if (i.radius is null || i.radius is undefined )
      7
    else
      i.radius
    anticlockwise = if (i.anticlockwise is null || i.anticlockwise is undefined )
      false
    else
      i.anticlockwise
    startAngle = if (i.startAngle is null || i.startAngle is undefined )
      0
    else
      i.startAngle

    endAngle = if (i.endAngle is null || i.endAngle is undefined )
      360
    else
      i.endAngle

    lib.context.beginPath()
    lib.context.arc(i.x, i.y, radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, anticlockwise)
    lib.context.fillStyle = fillColor
    lib.context.fill()
    lib.context.lineWidth = linewidth
    lib.context.strokeStyle = color
    lib.context.stroke()
    lib.context.strokeStyle = "#000000"
    lib.context.lineWidth = 1
    lib.context.fillStyle = "#000000"


class Picture extends Canvas_Geometry

Picture::draw = (obj) ->
  for i in obj
    Picture.Process(i)


Picture::Process = (obj) ->
  image = new Image()
  image.src = obj.src
  image.onload = ()->
    imageWidth = image.width
    imageHeight = image.height
    lib.context.save()
    lib.context.translate(obj.x - (imageHeight/2), obj.y - (imageWidth/2))
    lib.context.drawImage(image, 0, 0)
    lib.context.restore()


class Text extends Canvas_Geometry


Text::draw = (obj)->
  for i in obj
    lib.context.font = "15px Arial";
    lib.context.fillText(i.text, i.x, i.y)



class Axes extends Canvas_Geometry
  #{type : "x" , orientation: "top", values : [27,54,81,108,135] , min: 5, max: 140, margin: 5, height: 240, width: 180, grid: true}
Axes::draw = (obj) ->
  for i in obj
    grid = if (i.grid is null || i.grid is undefined )
      false
    else
      i.grid
    if i.type == "x"
      orientation = if (i.orientation is null || i.orientation is undefined )
        "bottom"
      else
        i.orientation
    else
      orientation = if (i.orientation is null || i.orientation is undefined )
        "left"
      else
        i.orientation

    lib.context.beginPath()

    if i.type == "x"
      lib.context.strokeStyle = "#000000"
      if i.orientation == "top"
        lib.context.moveTo(i.margin, i.margin)
        lib.context.lineTo(i.width - i.margin, i.margin)
      else
        lib.context.moveTo(i.margin, i.height - i.margin)
        lib.context.lineTo(i.width - i.margin, i.height - i.margin)

      lib.context.stroke()
      lib.context.strokeStyle = "rgba(128, 128, 255, 0.5)"
#      j = 0
#      while j <= i.values.length
#        currentY = i.margin + j / i.values.length * (i.height - (2 * i.margin))
#        if i.grid == true
#          lib.context.moveTo i.width - i.margin, currentY
#          lib.context.lineTo i.margin, currentY
#        lib.context.fillText(Math.ceil(i.min + ((i.max - i.min) / i.values.length) * (i.values.length - j)), 10, currentY + 4);
#        j++
      j = 0
      while j <= i.values.length
        currentX = i.margin + j / i.values.length * (i.width - (2 * i.margin))
        if i.grid == true
          lib.context.moveTo currentX, i.margin
          lib.context.lineTo currentX, (i.height - i.margin)
        if i.orientation == "top"
          lib.context.fillText((i.min + ((i.max - i.min) / i.values.length) * (j)).toFixed(2), currentX - 3,
             i.margin / 2)
        else
          lib.context.fillText((i.min + ((i.max - i.min) / i.values.length) * (j)).toFixed(2), currentX - 3,
            (i.height - i.margin) + i.margin / 2)

        j++

      lib.context.stroke()
      lib.context.strokeStyle = "#000000"
    if i.type == "y"

      if i.orientation == "right"
        lib.context.moveTo(i.width - i.margin, i.margin)
        lib.context.lineTo(i.width - i.margin, i.height - i.margin)
      else
        lib.context.moveTo(i.margin, i.margin)
        lib.context.lineTo(i.margin, i.height - i.margin)

      lib.context.stroke()
      lib.context.strokeStyle = "rgba(128, 128, 255, 0.5)"
#      j = 0
#      while j <= i.values.length
#        currentX = i.margin + j / i.values.length * (i.width - (2 * i.margin))
#        if i.grid == true
#          lib.context.moveTo currentX, i.margin
#          lib.context.lineTo currentX, (i.height - i.margin)
#        lib.context.fillText(Math.ceil(i.min + ((i.max - i.min) / i.values.length) * (j)), currentX - 3,
#          (i.height - i.margin) + i.margin / 2)
#        j++
      j = 0
      while j <= i.values.length
        currentY = i.margin + j / i.values.length * (i.height - (2 * i.margin))
        if i.grid == true
          lib.context.moveTo i.width - i.margin, currentY
          lib.context.lineTo i.margin, currentY
        if i.orientation == "right"
          lib.context.fillText((i.min + ((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2), 10  + i.width - i.margin , currentY + 4);
        else
          lib.context.fillText((i.min + ((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2), 10, currentY + 4);
        j++



      lib.context.stroke()
      lib.context.strokeStyle = "#000000"





class Tooltip
  constructor: (@obj) ->


Tooltip::draw = (value) ->

#
#  div = d3.select("body").append("div")
#  .attr("class", "tooltip")
#  .style("opacity", 1e-6)
#
#
#  svglayer = d3.select("svg")
#  .on("mouseover", Tooltip.mouseover)
#  .on("mousemove", Tooltip.mousemove)
#  .on("mouseout", Tooltip.mouseout)








Tooltip::mouseover = ()->
#  d3.select("body").append("div")
#  .attr("class", "tooltip")
#  .style("opacity", 1e-6).transition()
#  .duration(500)
#  .style("opacity", 1)


Tooltip::mousemove = () ->
#  d3.select("body").append("svg:image")
#  .attr("xlink:href", "http://www.e-pint.com/epint.jpg")
#  .attr("width", 150)
#  .attr("height", 200);



Tooltip::mouseout = () ->
#  d3.select("body").append("div")
#  .attr("class", "tooltip")
#  .style("opacity", 1e-6).transition()
#  .duration(500)
#  .style("opacity", 1e-6)

Tooltip::getMousePos = (canvas, evt) ->
#  rect = lib.canvas.getBoundingClientRect()
#  cords =
#    x: evt.clientX - rect.left
#    y: evt.clientY - rect.top
#  return cords




Canvas_Parse = (obj)->
  lib.canvas = document.getElementById(obj.id)
  lib.context = lib.canvas.getContext("2d")
  lib.Line = new Line()
  lib.Point = new Point()
  lib.Picture = new Picture()
  lib.Axes = new Axes()
  lib.Diamond = new Diamond()
  lib.Background = new Background()
  lib.Tooltip = new Tooltip(obj)
  lib.Area = new Area()
  lib.Text = new Text()
  for key,value of obj
    if key == "id"
      continue
    else
      lib[key]["draw"](value)



