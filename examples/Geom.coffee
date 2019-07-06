class Geom

  #"geom" : [
  #  {
  #    "type" : "Point",
  #    "data" : "static",
  #    "properties" : {
  #      "x" : "xscale",
  #      "y" : "yscale",
  #      "fillColor" : "zscale"
  #    }
  #  }
  #]

Geom::process = (obj) ->
  for i in obj
    for j in lib.GoG_JSON[i.data]
      geomObj = {}
  if i.type == ""
  i.type = "Point"

  if i.type == "Point"
    geomObj["x"] = j[i.properties.x]
    geomObj["y"] = j[i.properties.y]
    geomObj["color"] = if (i.properties.color is null || i.properties.color is undefined)
      "#000000"
    else
      j[i.properties.color]
    geomObj["fillColor"] = if (i.properties.fillColor is null || i.properties.fillColor is undefined)
      "#ffffff"
    else
      j[i.properties.fillColor]
    geomObj["linewidth"] = if (i.properties.linewidth is null || i.properties.linewidth is undefined)
      1
    else
      j[i.properties.linewidth]
    geomObj["radius"] = if (i.properties.radius is null || i.properties.radius is undefined)
      7
    else
      j[i.properties.radius]
    geomObj["anticlockwise"] = if (i.properties.anticlockwise is null || i.properties.anticlockwise is undefined)
      false
    else
      j[i.properties.anticlockwise]
    geomObj["startAngle"] = if (i.properties.startAngle is null || i.properties.startAngle is undefined)
      0
    else
      j[i.properties.startAngle]
    geomObj["endAngle"] = if (i.properties.endAngle is null || i.properties.endAngle is undefined)
      360
    else
      j[i.properties.endAngle]

    if lib.Canvas_JSON.hasOwnProperty(i.type)
      lib.Canvas_JSON[i.type].push(geomObj)
    else
      lib.Canvas_JSON[i.type] = []
      lib.Canvas_JSON[i.type].push(geomObj)

  if i.type == "Picture"
    geomObj["x"] = j[i.properties.x]
    geomObj["y"] = j[i.properties.y]
    geomObj["src"] = j[i.properties.src]

    if lib.Canvas_JSON.hasOwnProperty(i.type)
      lib.Canvas_JSON[i.type].push(geomObj)
    else
      lib.Canvas_JSON[i.type] = []
      lib.Canvas_JSON[i.type].push(geomObj)

  if i.type == "Diamond"
    geomObj["color"] = if (i.properties.color is null || i.properties.color is undefined)
      "#000000"
    else
      j[i.properties.color]
    geomObj["x"] = j[i.properties.x]
    geomObj["y"] = j[i.properties.y]

    if lib.Canvas_JSON.hasOwnProperty(i.type)
      lib.Canvas_JSON[i.type].push(geomObj)
    else
      lib.Canvas_JSON[i.type] = []
      lib.Canvas_JSON[i.type].push(geomObj)

  if i.type == "Text"
    geomObj["x"] = j[i.properties.x]
    geomObj["y"] = j[i.properties.y]
    geomObj["text"] = j[i.properties.text]

    if lib.Canvas_JSON.hasOwnProperty(i.type)
      lib.Canvas_JSON[i.type].push(geomObj)
    else
      lib.Canvas_JSON[i.type] = []
      lib.Canvas_JSON[i.type].push(geomObj)


  for c, index in lib.GoG_JSON[i.data]
    if index > 0
      geomObj = {}
      if i.type == "Line"
        geomObj["color"] = if (i.properties.color is null || i.properties.color is undefined)
          "#000000"
        else
          lib.GoG_JSON[i.data][index - 1][i.properties.color]
        geomObj["width"] = if (i.properties.width is null || i.properties.width is undefined)
          1
        else
          lib.GoG_JSON[i.data][index - 1][i.properties.width]

        geomObj["startX"] = lib.GoG_JSON[i.data][index - 1][i.properties.x]
        geomObj["startY"] = lib.GoG_JSON[i.data][index - 1][i.properties.y]
        geomObj["endX"] = lib.GoG_JSON[i.data][index][i.properties.x]
        geomObj["endY"] = lib.GoG_JSON[i.data][index][i.properties.y]

        if lib.Canvas_JSON.hasOwnProperty(i.type)
          lib.Canvas_JSON[i.type].push(geomObj)
        else
          lib.Canvas_JSON[i.type] = []
          lib.Canvas_JSON[i.type].push(geomObj)


  pointsArray = []
  geomObj = {}
  for j, c in lib.GoG_JSON[i.data]
    if i.type == "Area"
      arr = []
      arr.push(j[i.properties.x])
      arr.push(j[i.properties.y])
      pointsArray.push(arr)
      geomObj["points"] = pointsArray
      geomObj["fillColor"] = if (i.properties.fillColor is null || i.properties.fillColor is undefined)
        "rgba(200, 170, 170, 0.8)"
      else
        i.properties.fillColor
      geomObj["color"] = if (i.properties.color is null || i.properties.color is undefined)
        "#000000"
      else
        i.properties.color
      geomObj["margin"] = lib.GoG_JSON["margin"]
      geomObj["height"] = lib.GoG_JSON["height"]
      geomObj["width"] = lib.GoG_JSON["width"]
      if c == lib.GoG_JSON[i.data].length - 1
        if lib.Canvas_JSON.hasOwnProperty(i.type)
          lib.Canvas_JSON[i.type].push(geomObj)
        else
          lib.Canvas_JSON[i.type] = []
          lib.Canvas_JSON[i.type].push(geomObj)


  return