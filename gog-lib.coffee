class Data

Data::process = (obj) ->

  for i in obj
    if i.hasOwnProperty('format') and i.format.type == "csv"
      i.values =  dl.csv(i.values, i.format)
      lib.GoG_JSON[i.name] = i.values
    if i.hasOwnProperty('format') and i.format.type == "json"
      i.values =  dl.json(i.values)
      lib.GoG_JSON[i.name] = i.values
    if i.hasOwnProperty('format') and i.format.type == "tsv"
      i.values =  dl.tsv(i.values, i.format)
      lib.GoG_JSON[i.name] = i.values
    else
      lib.GoG_JSON[i.name] = i.values

class Transform


#             {
#               "lang": "R",    // function language
#               "function": "fibonnaci", // function name
#                "properties": {
#                  "data" : "static",
#                  "length" : 20,
#                  "field" : "x",
#                 "name": "fibonnaci_x"
#                }
#          }

Transform::process = (obj) ->
  for i in obj
    if i.hasOwnProperty("lang") and i.lang == "R"
      Transform.prototype["R_" + i.function](i.properties)
    else
      Transform.prototype[i.function](i.properties)




        #j {log_x: Math.log(j.x)    ,x:5}




Transform::pow = (obj)->
  dataTable = lib.GoG_JSON[obj.data]
  power = obj.power
  field = obj.field
  variable = obj.name

  for j in dataTable
    for key, value of j
      j[variable] = Math.pow(j[field], power)



Transform::R_fibonnaci = (obj) ->
  dataTable = lib.GoG_JSON[obj.data]
  variable = obj.name
  field = obj.field
  length = obj.length
  library = obj.library
  data = {n : length, sequence: true}

  ocpu.seturl "http://localhost:5888/ocpu/library/"+library+"/R"

  ocpu.rpc "fibonacci", data , (output) ->
    m = 0
    for j in dataTable
      j[variable] = output[m]
      m++

  return






class Scale



  ##{
##           "name": "xscale", // scale name
##            "type": "linear", // scale type
##            "range": "width", // chart width
##            "domain": {
##                "data": "static",
##                "field": "x"
##            }
##        }
#  {"type" : "linear", "domain" : [1000,4000], "range" : [35,350]}
  #scale = (obj) ->
  #    scaleobj = d3.scale[obj.type]()
  #    scaleobj = scaleobj["domain"](obj.domain)
  #    scaleobj = scaleobj["range"](obj.range)
  #    console.log scaleobj(2000)


Scale::process = (obj)->

  dataArray = []
  for i in obj
    for j in lib.GoG_JSON[i.domain.data]
      for key,value of j
        if(key == i.domain.field)
          dataArray.push(value)
        else
          continue
    domainArray = [d3.min(dataArray), d3.max(dataArray)]
    rangeArray = []
    if Array.isArray(i.range)
      rangeArray = i.range
    if i.range == "height"
      minRange = lib.GoG_JSON[i.range] - lib.GoG_JSON.margin
      rangeArray.push(minRange)
      maxRange = lib.GoG_JSON.margin
      rangeArray.push(maxRange)
    else
      minRange = lib.GoG_JSON.margin
      rangeArray.push(minRange)
      maxRange = lib.GoG_JSON[i.range] - lib.GoG_JSON.margin
      rangeArray.push(maxRange)

    scaleObj =
      type : i.type
      domain : domainArray
      range : rangeArray

    scaleArray = Scale::scale(scaleObj)

    for c in lib.GoG_JSON[i.domain.data]
      for key1,value1 of c
        c[i.name] = scaleArray(c[i.domain.field])

    dataArray = []
    domainArray = []
  return




Scale::scale = (obj) ->
    scaleobj = d3.scale[obj.type]()
    scaleobj = scaleobj["domain"](obj.domain)
    scaleobj = scaleobj["range"](obj.range)

#"axes": [
#//            {
#//                "type": "x", // x axis
#//                "data": "static"// scale for axis
#//                  "field": "x"
#//         "orient" : "bottom"
#           "grid" : true
#//            },
#//            {
#//                "type": "y", // y axis
#//                "scale": "yscale"// scale for axis
#//            }
#//        ]

class axes




axes::process = (obj) ->
  axesArray = []
  for i in obj
    axesObj = {}
    dataArray = []
    for j in lib.GoG_JSON[i.data]
      for key,value of j
        if(key == i.field)
          dataArray.push(value)
        else
          continue

    dataArray.sort(d3.ascending)
#    dataArray = dataArray.filter( onlyUnique )
    if i.hasOwnProperty("ticks")
      axesObj["values"] = new Array(i.ticks)
    else
      axesObj["values"] = dataArray
    axesObj["min"] = d3.min(dataArray)
    axesObj["max"] = d3.max(dataArray)
    axesObj["orientation"] = i.orient
    axesObj["grid"] = i.grid
    axesObj["margin"] = lib.GoG_JSON["margin"]
    axesObj["height"] = lib.GoG_JSON["height"]
    axesObj["width"] = lib.GoG_JSON["width"]
    axesObj["type"] = i.type
    axesArray.push(axesObj)


  lib.Canvas_JSON["Axes"] = axesArray


onlyUnique = ( value, index, self)->
  return self.indexOf(value) is index

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
      if i.type == "Point"
        geomObj["x"] = j[i.properties.x]
        geomObj["y"] = j[i.properties.y]
        geomObj["color"] = if (i.properties.color is null || i.properties.color is undefined )
          "#000000"
        else
          j[i.properties.color]
        geomObj["fillColor"] = if (i.properties.fillColor is null || i.properties.fillColor is undefined )
          "#ffffff"
        else
          j[i.properties.fillColor]
        geomObj["linewidth"] = if (i.properties.linewidth is null || i.properties.linewidth is undefined )
          1
        else
          j[i.properties.linewidth]
        geomObj["radius"] = if (i.properties.radius is null || i.properties.radius is undefined )
          7
        else
          j[i.properties.radius]
        geomObj["anticlockwise"] = if (i.properties.anticlockwise is null || i.properties.anticlockwise is undefined )
          false
        else
          j[i.properties.anticlockwise]
        geomObj["startAngle"] = if (i.properties.startAngle is null || i.properties.startAngle is undefined )
          0
        else
          j[i.properties.startAngle]
        geomObj["endAngle"] = if (i.properties.endAngle is null || i.properties.endAngle is undefined )
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
        geomObj["color"] = if (i.properties.color is null || i.properties.color is undefined )
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
          geomObj["color"] = if (i.properties.color is null || i.properties.color is undefined )
            "#000000"
          else
            lib.GoG_JSON[i.data][index-1][i.properties.color]
          geomObj["width"] = if (i.properties.width is null || i.properties.width is undefined )
            1
          else
            lib.GoG_JSON[i.data][index-1][i.properties.width]

          geomObj["startX"] = lib.GoG_JSON[i.data][index-1][i.properties.x]
          geomObj["startY"] = lib.GoG_JSON[i.data][index-1][i.properties.y]
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
        geomObj["fillColor"] = if (i.properties.fillColor is null || i.properties.fillColor is undefined )
          "rgba(200, 170, 170, 0.8)"
        else
          i.properties.fillColor
        geomObj["color"] = if (i.properties.color is null || i.properties.color is undefined )
          "#000000"
        else
          i.properties.color
        geomObj["margin"] = lib.GoG_JSON["margin"]
        geomObj["height"] = lib.GoG_JSON["height"]
        geomObj["width"] = lib.GoG_JSON["width"]
        if c == lib.GoG_JSON[i.data].length-1
          if lib.Canvas_JSON.hasOwnProperty(i.type)
            lib.Canvas_JSON[i.type].push(geomObj)
          else
            lib.Canvas_JSON[i.type] = []
            lib.Canvas_JSON[i.type].push(geomObj)



  return

class Define



Define::process = (obj)->
  for i in obj
    window.eval i
##{"type" : "linear", "domain" : [1000,4000], "range" : [35,350]}
#scale = (obj) ->
#    scaleobj = d3.scale[obj.type]()
#    scaleobj = scaleobj["domain"](obj.domain)
#    scaleobj = scaleobj["range"](obj.range)
#    console.log scaleobj(2000)



`//specification = {
//    "id" : "canvas_1"
//    "width": 600,
//    "height": 600,
//    "margin" : 35,
//    "background": "transparent",
//    "data": [
//        {
//            "name": "static",
//            "values": [
//                {"x": 10, "y": 20},
//                {"x": 30, "y": 20},
//                {"x": 40, "y": 10},
//                {"x": 20, "y": 30},
//                {"x": 20, "y": 50},
//                {"x": 5, "y": 60}
//            ]
//
//        }, {
//            "name": "fromUrl",
//            "url": "test.csv",
//            "format": "csv"
//        }
//    ],
//    "transform": [
//        {
//            "name": "log_x",    // new variable name
//            "function": "log", // function name
//            "data": "static", // data source
//            "field": "x"     // column name
//        }
//    ],
//    "scales": [
//        {
//            "name": "xscale", // scale name
//            "type": "linear", // scale type
//            "range": "width", // chart width
//            "domain": {
//                "data": "static",
//                "field": "x"
//            }
//        },
//        {
//            "name": "yscale", //scale name
//            "type": "linear", // scale type
//            "range": "height", // chart height
//            "domain": {
//                "data": "static", // data source
//                "field": "y" // data field
//            }
//        }
//    ],
//    "axes": [
//        {
//            "type": "x", // x axis
//            "scale": "xscale"// scale for axis
//        },
//        {
//            "type": "y", // y axis
//            "scale": "yscale"// scale for axis
//        }
//    ]
//
//}`

`var lib = {}`
GoG_Parser = (obj) ->

  lib.GoG_JSON = {}
  lib.Canvas_JSON = {}
  lib.Canvas_JSON.id = obj.id
  lib.Canvas_JSON.Background = obj.background
  lib.GoG_JSON.width = obj.width
  lib.GoG_JSON.height = obj.height
  lib.GoG_JSON.margin = obj.margin
  lib.data = new Data()
  lib.transform = new Transform()
  lib.scales = new Scale()
  lib.axes = new axes()
  lib.geom = new Geom()
  lib.define = new Define()
  for key,value of obj
    if key == "width" || key =="height" || key == "margin" || key == "background" || key == "id"
      continue
    else
      lib[key]["process"](value)


  Canvas_Parse(lib.Canvas_JSON)

