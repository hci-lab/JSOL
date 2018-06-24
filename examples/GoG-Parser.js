//specification = {
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
//};
var lib = {};;
var GoG_Parser;

GoG_Parser = function(obj) {
  var key, value;
  lib.GoG_JSON = {};
  lib.Canvas_JSON = {};
  /* if(obj.id==""){
	  can=document.createElement("canvas");
	  can.id="dcan";
	  obj.id=can.id;
	  
  } */
  lib.Canvas_JSON.id =obj.id;
  lib.Canvas_JSON.Background = obj.background;
  lib.GoG_JSON.width = obj.width;
  lib.GoG_JSON.height = obj.height;
  if (obj.margin == ""){
	 obj.margin=60; 
  }
     
  lib.GoG_JSON.margin = obj.margin;
  lib.data = new Data();
  lib.transform = new Transform();
  lib.scales = new Scale();
  lib.axes = new axes();
  lib.geom = new Geom();
  lib.define = new Define();
  lib.guides=new guides();
  for (key in obj) {
    value = obj[key];
    if (key === "width" || key === "height" || key === "margin" || key === "background" || key === "id") {
      continue;
    } else {
      lib[key]["process"](value);
    }
  }
  return Canvas_Parse(lib.Canvas_JSON);
};

//# sourceMappingURL=GoG-Parser.js.map
