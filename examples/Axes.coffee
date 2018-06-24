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
		  break
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