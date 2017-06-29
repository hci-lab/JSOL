var axes, onlyUnique;

axes = (function() {
  function axes() {}

  return axes;

})();

axes.prototype.process = function(obj) {
  var axesArray, axesObj, dataArray, i, j, k, key, l, len, len1, ref, value;
  axesArray = [];
     sort=function (array,key){
	  return array.sort(function(a,b){
	  var x=a[key];
	  var y=b[key];
	  return ((x<y)?-1:((x>y)?1:0));
	  
	  });
	  }
 
  if(obj.type=="coord_cartesian"||obj.type=="coord_flib"||obj.type=="coord_parallel"||obj.type=="coord_polar_parallel"){
	  for (k = 0, len = obj.properties.length; k < len; k++) {
    i =  obj.properties[k];
    axesObj = {};
    dataArray = [];
	  ref = lib.GoG_JSON[i.data];
    for (l = 0, len1 = ref.length; l < len1; l++) {
      j = ref[l];
      for (key in j) {
        value = j[key];
        if (key === i.field) {
          dataArray.push(value);
		  break;
        } else {
          continue
        }
      }
    }
    dataArray.sort(d3.ascending);
    if (i.hasOwnProperty("ticks")) {
      axesObj["values"] = new Array(i.ticks);
    } else {
      axesObj["values"] = dataArray;
    }
	 if(i.hasOwnProperty("annotation")){
	 annotation={};
	annotation["title"] = i.annotation.title;
	annotation["position"] = i.annotation.position;
	annotation["colour"] = i.annotation.colour;
	annotation["font"] = i.annotation.font;
	axesObj["annotation"] = annotation;
	}
	if(i.hasOwnProperty("text")){
	 text={};
	text["colour"] = i.text.colour;
	text["font"] = i.text.font;
	axesObj["text"] = text;
	}
	if(i.hasOwnProperty("grade")){
		axesObj["grade"] = i.grade;
	}
    axesObj["min"] = d3.min(dataArray);
    axesObj["max"] = d3.max(dataArray);
    axesObj["orientation"] = i.orient;
    axesObj["grid"] = i.grid;
    axesObj["margin"] = lib.GoG_JSON["margin"];
    axesObj["height"] = lib.GoG_JSON["height"];
    axesObj["width"] = lib.GoG_JSON["width"];
    axesObj["type"] = i.type;
	axesObj["data"] = i.data;
	axesObj["field"]=i.field;
    axesArray.push(axesObj);
	
  }

  if(obj.hasOwnProperty("facets")){
	  j=obj.facets;
      facetobj={};	 
	  
	  facetobj["type"]=j.type;
	if(j.properties.hasOwnProperty("x_axis")){
		ref = lib.GoG_JSON[j.properties.x_axis.data];
		sort(ref ,j.properties.x_axis.field);
		Alldata=[];
		temp=[];
		temp.push(ref[0]);
		field=j.properties.x_axis.field
		 facetobj["fieldX"]=field;
		var value=temp[0][field];
    for (l = 1, len1 = ref.length; l < len1; l++) {
		
      r = ref[l];
	
	  if(value==r[field]){
		  temp.push(r);
	  }else{
		  Alldata.push(temp);
		  temp=[];
		  temp.push(r);
		  value=r[field];
	  }
    }
	 Alldata.push(temp);
facetobj["x_axis"]	=Alldata;
	}
	Alldata=[];
	  if(j.properties.hasOwnProperty("y_axis")){
  ref = lib.GoG_JSON[j.properties.y_axis.data];
  sort(ref ,j.properties.y_axis.field);
  Alldata=[];
  temp=[];
  temp.push(ref[0]);
  field=j.properties.y_axis.field;
   facetobj["fieldY"]=field;
  var value=temp[0][field];
    for (l = 1, len1 = ref.length; l < len1; l++) {
  
      r = ref[l];
 
   if(value==r[field]){
    temp.push(r);
   }else{
    Alldata.push(temp);
    temp=[];
    temp.push(r);
    value=r[field];
   }
    }
 Alldata.push(temp);
facetobj["y_axis"] =Alldata; 
 }
	   facetobj["margin"]=j.properties.margin;
	 // axesObj["facets"] =facetobj ;
	 // axesArray.push(facetobj);
	  lib.GoG_JSON["facets"] = facetobj;
	  
  }
  axesArray.push(obj.type);
   return lib.Canvas_JSON["Axes"] = axesArray;
  }
  else if (obj.type=="coord_polar"){/*sara and alaa task*/
   for (k = 0, len = obj.properties.length; k < len; k++) {
    i =  obj.properties[k];
    axesObj = {};
    dataArray = [];
    fieldArray = [];
	radiusArray = [];
	angleArray = [];
    ref = lib.GoG_JSON[i.data];
	if(i.type=="angle"){
		for (l = 0, len1 = ref.length; l < len1; l++) {
			 j = ref[l];
			 for (key in j) {
				 value = j[key]; 
				 if (key === i.field) {
					 fieldArray.push(value);
					 } else if(key === i.angle) {
						 angleArray.push(value);
						 break;
						 }else {
							 continue;
							 }
						 }
		    }
			angleArray.sort(d3.ascending);
			fieldArray.sort(d3.ascending);
			if(i.hasOwnProperty("radius")){
				axesObj["radius"]=i.radius;
				}
			axesObj["grid"] = i.grid;
			axesObj["field"] = fieldArray;
			axesObj["angle"] = angleArray;
			axesObj["type"] = i.type;
			axesObj["clockwise"] = i.clockwise;
			axesObj["font_color"] = i.font_color;
			axesObj["coord_color"] = i.coord_color;
            axesArray.push(axesObj);
		
	}
	else if (i.type=="radius"){
		 for (l = 0, len1 = ref.length; l < len1; l++) {
			 j = ref[l];
			 for (key in j) {
				 value = j[key]; 
				 if (key === i.field) {
					 fieldArray.push(value);
					 } else if(key === i.radius) {
						 radiusArray.push(value);
						 break;
						 }else {
							 continue;
							 }
						 }
		    }
			radiusArray.sort(d3.ascending);
			fieldArray.sort(d3.ascending);
			if(i.hasOwnProperty("position")){
				axesObj["position"]=i.position;
				}
			axesObj["grid"] = i.grid;
			axesObj["field"] = fieldArray;
			axesObj["radius"] = radiusArray;
			axesObj["type"] = i.type;
			axesObj["clockwise"] = i.clockwise;
            axesArray.push(axesObj);
		
		
	}
  }
  axesArray.push(obj.type);
   return lib.Canvas_JSON["Axes"] = axesArray;
  
  
  
    /* for (k = 0, len = obj.properties.length; k < len; k++) {
    i =  obj.properties[k];
    axesObj = {};
    dataArray = [];
    ref = lib.GoG_JSON[i.data];
    for (l = 0, len1 = ref.length; l < len1; l++) {
      j = ref[l];
      for (key in j) {
        value = j[key];
        if (key === i.field) {
          dataArray.push(value);
		  break;
        } else {
          continue;
        }
      }
    }
    dataArray.sort(d3.ascending);
    if (i.hasOwnProperty("ticks")) {
      axesObj["values"] = new Array(i.ticks);
    } else {
      axesObj["values"] = dataArray;
    }
    axesObj["min"] = d3.min(dataArray);
    axesObj["max"] = d3.max(dataArray);
    //axesObj["orientation"] = i.orient;
    axesObj["grid"] = i.grid;
    axesObj["margin"] = lib.GoG_JSON["margin"];
    axesObj["height"] = lib.GoG_JSON["height"];
    axesObj["width"] = lib.GoG_JSON["width"];
  //  axesObj["type"] = i.type;
    axesArray.push(axesObj);
	
  }
  axesArray.push(obj.type);
   return lib.Canvas_JSON["Axes"] = axesArray; */
}
  else if (obj.type=="coord_transformation"){
  for (k = 0, len = obj.properties.length; k < len; k++) {
    i =  obj.properties[k];
    axesObj = {};
    dataArray = [];
	statobj=[];
	annotation={};
    ref = lib.GoG_JSON[i.data];
    for (l = 0, len1 = ref.length; l < len1; l++) {
      j = ref[l];
      for (key in j) {
	    
        value = j[key];
        if (key === i.field|| key==="power") {
		if(key=="power")
		statobj.push(value);
		else
		dataArray.push(value);
		//statobj["value"]=value;
		  
        } 
      }
	 
	 
	  dataArray.push(statobj);
    }
    dataArray.sort(d3.ascending);
    if (i.hasOwnProperty("ticks")) {
      axesObj["values"] = new Array(i.ticks);
    } else {
      axesObj["values"] = dataArray;
	   axesObj["power"] = statobj;
    }
	 if(i.hasOwnProperty("annotation")){
	annotation["title"] = i.annotation.title;
	annotation["position"] = i.annotation.position;
	}
	
    axesObj["min"] = d3.min(dataArray);
    axesObj["max"] = d3.max(dataArray);
    axesObj["orientation"] = i.orient;
    axesObj["grid"] = i.grid;
    axesObj["margin"] = lib.GoG_JSON["margin"];
    axesObj["height"] = lib.GoG_JSON["height"];
    axesObj["width"] = lib.GoG_JSON["width"];
    axesObj["type"] = i.type;
	 axesObj["annotation"] = annotation;
	
    axesArray.push(axesObj);
  }
  axesArray.push(obj.type);
   return lib.Canvas_JSON["Axes"] = axesArray;
}
  else if (obj.type=="coord_equal"){/*nada task*/
    
     for (k = 0, len = obj.properties.length; k < len; k++) {
    i =  obj.properties[k];
    axesObj = {};
    dataArray = [];
    ref = lib.GoG_JSON[i.data];
    for (l = 0, len1 = ref.length; l < len1; l++) {
      j = ref[l];
      for (key in j) {
        value = j[key];
        if (key === i.field) {
          dataArray.push(value);
		  break;
        } else {
          continue;
        }
      }
    }
    dataArray.sort(d3.ascending);
    if (i.hasOwnProperty("ticks")) {
      axesObj["values"] = new Array(i.ticks);
    } else {
      axesObj["values"] = dataArray;
    } 
	if(i.hasOwnProperty("annotation")){
	 annotation={};
	annotation["title"] = i.annotation.title;
	annotation["position"] = i.annotation.position;
	annotation["colour"] = i.annotation.colour;
	annotation["font"] = i.annotation.font;
	axesObj["annotation"] = annotation;
	}
	if(i.hasOwnProperty("text")){
	 text={};
	text["colour"] = i.text.colour;
	text["font"] = i.text.font;
	axesObj["text"] = text;
	}
   
    axesObj["min"] = d3.min(dataArray);
    axesObj["max"] = d3.max(dataArray);
    axesObj["orientation"] = i.orient;
    axesObj["grid"] = i.grid;
    axesObj["margin"] = lib.GoG_JSON["margin"];
    axesObj["height"] = lib.GoG_JSON["height"];
    axesObj["width"] = lib.GoG_JSON["width"];
    axesObj["type"] = i.type;
    axesObj["ratio"] = obj.ratio ; //5 //lib.GoG_JSON["axes"];

    axesArray.push(axesObj);
	
  }
  axesArray.push(obj.type);
   return lib.Canvas_JSON["Axes"] = axesArray;
    }

 
};

onlyUnique = function(value, index, self) {
  return self.indexOf(value) === index;
};

//# sourceMappingURL=Axes.js.map
