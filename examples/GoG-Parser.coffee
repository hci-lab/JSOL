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
  if obj.margin == ""
    obj.margin = 60
  lib.GoG_JSON.margin = obj.margin
  lib.data = new Data()
  lib.transform = new Transform()
  lib.scales = new Scale()
  lib.axes = new axes()
  lib.geom = new Geom()
for key,value of obj
  if key == "width" || key == "height" || key == "margin" || key == "background" || key == "id"
    continue
  else
    lib[key]["process"](value)


 






