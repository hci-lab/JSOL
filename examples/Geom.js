 var Geom;
 function count(temp,ArrayData,propertiesX){ 
var coun=0;
		 for(var t =0 ; t<ArrayData.length;t++)
	     {
		  if(temp==ArrayData[t][propertiesX])
		  {
			  coun=coun+1;
		  }
	     }
   return coun; //to reverse b.date-a.date
}

Geom = (function() {
  function Geom() {}

  return Geom;

})();

Geom.prototype.process = function(obj) {
  var arr, c, geomObj, i, index, j, k, l, len, len1, len2, len3, m, n, pointsArray, ref, ref1, ref2,yStart,xStart,MIN,yHeight;
  for (k = 0, len = obj.length; k < len; k++) {
    i = obj[k];
	var check=lib.Canvas_JSON.Axes.length;
    check-=1;
	if(i.type===""){
		i.type="Point";
	}
    ref = lib.GoG_JSON[i.data];
	 if (i.type === "Picture" ){
    for (l = 0, len1 = ref.length; l < len1; l++) {
      j = ref[l];
      geomObj = {};
    if (i.type === "Picture") {
     if(lib.Canvas_JSON.Axes[check]=="coord_flib") {
        geomObj["x"] = j[i.properties.y];
        geomObj["y"] = j[i.properties.x];
        geomObj["src"] = j[i.properties.src];
        if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
          lib.Canvas_JSON[i.type].push(geomObj);
        } else {
          lib.Canvas_JSON[i.type] = [];
          lib.Canvas_JSON[i.type].push(geomObj);
        }
      }
       else{
		   geomObj["x"] = j[i.properties.x];
        geomObj["y"] = j[i.properties.y];
        geomObj["src"] = j[i.properties.src];
        if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
          lib.Canvas_JSON[i.type].push(geomObj);
        } else {
          lib.Canvas_JSON[i.type] = [];
          lib.Canvas_JSON[i.type].push(geomObj);
        }
	   }
      }
   }
	}
	else if(i.type === "Line"){
		if(lib.Canvas_JSON.Axes[check]==="coord_polar"){
			  ref1 = lib.GoG_JSON[i.data];
    for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
      c = ref1[index];
      if (index > 0) {
        geomObj = {};
        if (i.type === "Line") {
          geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][index - 1][i.properties.color];
          geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][index - 1][i.properties.width];
          geomObj["startX"] = lib.GoG_JSON[i.data][index - 1][i.properties.angle];
          geomObj["startY"] = lib.GoG_JSON[i.data][index - 1][i.properties.distance];
          geomObj["endX"] = lib.GoG_JSON[i.data][index][i.properties.angle];
          geomObj["endY"] = lib.GoG_JSON[i.data][index][i.properties.distance];
          if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(geomObj);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(geomObj);
          }
        }
      }
    }
		}
        else if(lib.Canvas_JSON.Axes[check]=="coord_flib"){
    ref1 = lib.GoG_JSON[i.data];
    for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
      c = ref1[index];
      if (index > 0) {
        geomObj = {};
        if (i.type === "Line") {
          geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][index - 1][i.properties.color];
          geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][index - 1][i.properties.width];
          geomObj["startX"] = lib.GoG_JSON[i.data][index - 1][i.properties.y];
          geomObj["startY"] = lib.GoG_JSON[i.data][index - 1][i.properties.x];
          geomObj["endX"] = lib.GoG_JSON[i.data][index][i.properties.y];
          geomObj["endY"] = lib.GoG_JSON[i.data][index][i.properties.x];
          if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(geomObj);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(geomObj);
          }
        }
      }
    }
  }
		 
		else if(lib.Canvas_JSON.Axes[check]=="coord_parallel"||lib.Canvas_JSON.Axes[check]=="coord_polar_parallel"){
             if(lib.GoG_JSON.hasOwnProperty("facets")&&lib.Canvas_JSON.Axes[check]=="coord_parallel")
		  {
		  geomObj = {};
		  if (i.type === "Line") {
                 geomObj["color"] =i.properties.color;
                 geomObj["width"] = i.properties.width;
				  var temp=[];
		 for(var a=0;a<i.properties.y.length;a++)
			 {
			 var t=i.properties.y[a];
                 temp.push(t);
             }
               geomObj["y"] = temp;
               temp=[];
			 
                 if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
               lib.Canvas_JSON[i.type].push(geomObj);
               } else {
               lib.Canvas_JSON[i.type] = [];
               lib.Canvas_JSON[i.type].push(geomObj);
               }
		  }
		  }
		  else{
			 ref1 = lib.GoG_JSON[i.data];
             for (index = m = 0, len2 = ref1.length; m < len2; index = ++m){
              c = ref1[index];
              geomObj = {};
             if (i.type === "Line") {
                 geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][index ][i.properties.color];
                 geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][index ][i.properties.width];
                 var temp=[];
             for(var a=0;a<i.properties.y.length;a++)
			 {
                 var t=i.properties.y[a];
                 temp.push(lib.GoG_JSON[i.data][index][t]);
             }
               geomObj["y"] = temp;
               temp=[];
               if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
               lib.Canvas_JSON[i.type].push(geomObj);
               } else {
               lib.Canvas_JSON[i.type] = [];
               lib.Canvas_JSON[i.type].push(geomObj);
               }
         }
		 }
    }
  }
		else{
		
             ref1 = lib.GoG_JSON[i.data];
             for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
             c = ref1[index];
             if (index > 0) {
              geomObj = {};
              if (i.type === "Line") {
             geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][index - 1][i.properties.color];
             geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][index - 1][i.properties.width];
             geomObj["startX"] = lib.GoG_JSON[i.data][index - 1][i.properties.x];
             geomObj["startY"] = lib.GoG_JSON[i.data][index - 1][i.properties.y];
             geomObj["endX"] = lib.GoG_JSON[i.data][index][i.properties.x];
             geomObj["endY"] = lib.GoG_JSON[i.data][index][i.properties.y];
             if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
                lib.Canvas_JSON[i.type].push(geomObj);
             } else {
             lib.Canvas_JSON[i.type] = [];
             lib.Canvas_JSON[i.type].push(geomObj);
          }
        }
      }
    }
	}
	}
	else if(i.type === "Bar"){
		var check=lib.Canvas_JSON.Axes.length;
	    check-=1;
		ref1 = lib.GoG_JSON[i.data];
		if(lib.Canvas_JSON.Axes[check]==="coord_polar"){
		
		 ref1 = lib.GoG_JSON[i.data];
	     var startangle=0;
	     for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
         c = ref1[index];
         geomObj = {};
         geomObj["startAngle"] = startangle;
	     geomObj["endAngle"] = lib.GoG_JSON[i.data][index][i.properties.angle];
         geomObj["anticlockwise"] = i.properties.anticlockwise;
		 geomObj["radius"] =lib.GoG_JSON[i.data][index][i.properties.radius];
		 geomObj["color"] =i.properties.color == null || i.properties.color == void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
		 startangle=lib.GoG_JSON[i.data][index][i.properties.angle];
          if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(geomObj);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(geomObj);
          }	
}
	}
	
	else if(lib.Canvas_JSON.Axes[check]==="coord_flib"){
		if(i.properties.dir=="vertical"){
		for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
      c = ref1[index];
       
        geomObj = {};
        if (i.type === "Bar") {
		  geomObj["color"] = i.properties.color == null || i.properties.color == void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
          geomObj["width"] = i.properties.width == null || i.properties.width == void 0 ? 0 : lib.GoG_JSON[i.data][index][i.properties.width];
          geomObj["border"] =lib.GoG_JSON[i.data][index][i.properties.border];
          geomObj["fillColor"]=i.properties.fillColor;         
		  geomObj["startX"] = lib.GoG_JSON[i.data][index][i.properties.x];
		  geomObj["startY"] = lib.GoG_JSON["height"]-lib.GoG_JSON["margin"];
          geomObj["height"] = lib.GoG_JSON[i.data][index][i.properties.y];
		 
          if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(geomObj);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(geomObj);
          }
        }
      
    }
	}
	else if(!(i.properties.hasOwnProperty("dir")) || (i.properties.dir=="horizontal")){
	for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
      c = ref1[index];
        geomObj = {};
        if (i.type === "Bar") {
		  geomObj["color"] = i.properties.color == null || i.properties.color == void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
          geomObj["height"] = i.properties.width == null || i.properties.width == void 0 ? 0 : lib.GoG_JSON[i.data][index][i.properties.width];
          geomObj["border"] =lib.GoG_JSON[i.data][index][i.properties.border];
          geomObj["fillColor"]=i.properties.fillColor;         
		  geomObj["startX"] = lib.GoG_JSON["margin"];
		  geomObj["startY"] =lib.GoG_JSON[i.data][index][i.properties.y];
          geomObj["width"] = lib.GoG_JSON[i.data][index][i.properties.x]-lib.GoG_JSON["margin"];
		  geomObj["dir"] ="vertical";
          if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(geomObj);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(geomObj);
          }
        }
      
    }
		
	}
	}
	else{
    ref1 = lib.GoG_JSON[i.data];
	if(!(i.properties.hasOwnProperty("dir")) || (i.properties.dir=="horizontal")){
		
		if(lib.GoG_JSON.hasOwnProperty("facets"))
		  {
			   
		  geomObj = {};
          geomObj["color"] = i.properties.fillColor;
          geomObj["width"] = i.properties.width;
          geomObj["border"] = i.properties.border;
          geomObj["fillColor"]=i.properties.fillColor;         
		  geomObj["x"] =i.properties.x;
		  geomObj["startY"] =lib.GoG_JSON["height"]-lib.GoG_JSON["margin"];
          geomObj["y"] =i.properties.y;
		 
          if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(geomObj);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(geomObj);
          }
         
		  }
	else{
		for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
          c = ref1[index];
       
        geomObj = {};
        if (i.type === "Bar") {
		  geomObj["color"] = i.properties.color == null || i.properties.color == void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
          geomObj["width"] = i.properties.width == null || i.properties.width == void 0 ? 0 : lib.GoG_JSON[i.data][index][i.properties.width];
          geomObj["border"] =lib.GoG_JSON[i.data][index][i.properties.border];
          geomObj["fillColor"]=i.properties.fillColor;         
		  geomObj["startX"] = lib.GoG_JSON[i.data][index][i.properties.x];
		  geomObj["startY"] = lib.GoG_JSON["height"]-lib.GoG_JSON["margin"];
          geomObj["height"] = lib.GoG_JSON[i.data][index][i.properties.y];
		 
          if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(geomObj);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(geomObj);
          }
        }
      
    }
	}
	}
	else{
		
		
		for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
      c = ref1[index];
       
        geomObj = {};
        if (i.type === "Bar") {
		  geomObj["color"] = i.properties.color == null || i.properties.color == void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
          geomObj["height"] = i.properties.width == null || i.properties.width == void 0 ? 0 : lib.GoG_JSON[i.data][index][i.properties.width];
          geomObj["border"] =lib.GoG_JSON[i.data][index][i.properties.border];
          geomObj["fillColor"]=i.properties.fillColor;         
		  geomObj["startX"] = lib.GoG_JSON["margin"];
		  geomObj["startY"] =lib.GoG_JSON[i.data][index][i.properties.y];
          geomObj["width"] = lib.GoG_JSON[i.data][index][i.properties.x]-lib.GoG_JSON["margin"];
		  geomObj["dir"] ="vertical";
          if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(geomObj);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(geomObj);
          }
        }
      
    }
		
	}
    }
}
	/*else if(i.type === "Bar"){
    ref1 = lib.GoG_JSON[i.data];
	if(!(i.properties.hasOwnProperty("flip")) || (i.properties.flip==false)){
		for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
      c = ref1[index];
       
        geomObj = {};
        if (i.type === "Bar") {
		  geomObj["color"] = i.properties.color == null || i.properties.color == void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
          geomObj["width"] = i.properties.width == null || i.properties.width == void 0 ? 0 : lib.GoG_JSON[i.data][index][i.properties.width];
          geomObj["border"] =lib.GoG_JSON[i.data][index][i.properties.border];
          geomObj["fillColor"]=i.properties.fillColor;         
		  geomObj["startX"] = lib.GoG_JSON[i.data][index][i.properties.x];
		  geomObj["startY"] = lib.GoG_JSON["height"]-lib.GoG_JSON["margin"];
          geomObj["height"] = lib.GoG_JSON[i.data][index][i.properties.y];
		 
          if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(geomObj);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(geomObj);
          }
        }
      
    }
	}
	else{
		var temp=lib.Canvas_JSON["Axes"][0].type;
		lib.Canvas_JSON["Axes"][0].type=lib.Canvas_JSON["Axes"][1].type;
		lib.Canvas_JSON["Axes"][1].type=temp;
		temp=lib.Canvas_JSON["Axes"][0].orientation;
		lib.Canvas_JSON["Axes"][0].orientation=lib.Canvas_JSON["Axes"][1].orientation;
		lib.Canvas_JSON["Axes"][1].orientation=temp;
		
		for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
      c = ref1[index];
       
        geomObj = {};
        if (i.type === "Bar") {
		  geomObj["color"] = i.properties.color == null || i.properties.color == void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
          geomObj["height"] = i.properties.width == null || i.properties.width == void 0 ? i.properties.width  : lib.GoG_JSON[i.data][index][i.properties.width];
          geomObj["border"] =lib.GoG_JSON[i.data][index][i.properties.border];
          geomObj["fillColor"]=i.properties.fillColor;         
		  geomObj["startX"] = lib.GoG_JSON["margin"];
		  geomObj["startY"] =lib.GoG_JSON[i.data][index][i.properties.x];
          geomObj["width"] = lib.GoG_JSON[i.data][index][i.properties.y]+lib.GoG_JSON["margin"];
		  geomObj["flip"] =true;
          if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(geomObj);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(geomObj);
          }
        }
      
    }
		
	}
    
 }*/
 else if(i.type === "Histogram"){
	var range=[],counter=0;
	ref1 = lib.GoG_JSON[i.data];
	    for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
      c = ref1[index];
       
        geomObj = {};
        	// yHeight=lib.GoG_JSON[i.data][index][i.properties.y]-MIN;
          geomObj["color"] = "black";//i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
          geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][index][i.properties.width];
          geomObj["fillColor"]=i.properties.fillColor;         
		  geomObj["startX"] = lib.GoG_JSON[i.data][index][i.properties.x];
		  geomObj["startY"] = lib.GoG_JSON["height"]-lib.GoG_JSON["margin"];//ovearride in canvas 
          geomObj["height"] =lib.GoG_JSON[i.data][index][i.properties.y];
          if (lib.Canvas_JSON.hasOwnProperty("Bar")) {
            lib.Canvas_JSON["Bar"].push(geomObj);
          } else {
            lib.Canvas_JSON["Bar"] = [];
            lib.Canvas_JSON["Bar"].push(geomObj);
          }
        
      
    }
	
    
		 /* var axesObj={};
          range.sort();
          axesObj["values"] = range;
          axesObj["min"] = d3.min(range);
          axesObj["max"] = d3.max(range);
          axesObj["orientation"] = "left";
		  axesObj["grid"] = true;
		  axesObj["margin"] = lib.GoG_JSON["margin"];
		  axesObj["height"] = lib.GoG_JSON["height"];
		  axesObj["width"] = lib.GoG_JSON["width"];
		  axesObj["type"] = "y";

      lib.Canvas_JSON["Axes"].push(axesObj);*/
	  // var axis={};
	 //handel y axis.
	  //lib.Canvas_JSON["Axes"].type="y";  
	  //var axesObj;
        //range.sort();
         //axesObj["values"] = range;
    
          //axesObj["min"] = d3.min(range);
    
          // axesObj["max"] = d3.max(range);
        
 }
 else if(i.type === "StackedBar"){
     ref1 = lib.GoG_JSON[i.data];
	 
	 temp =ref1[0];
    
	 var  sort=  i.properties.sort;
	     // first sort Data .. then you can groupBy by specific field.
	 var myData1=[];
	 var Result=[];
	 myData1.push(ref1[0]);
	 
	   var index=0;
	 /*  for(var j=0 ; j<Result.length;j++){
		 for(var t =0 ;t<Result[j].length;t++)
		 {
		  Result[j][t]["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][t][i.properties.color];
          Result[j][t]["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][t][i.properties.width];
          Result[j][t]["fillColor"]=i.properties.fillColor; 
		  Result[j][t]["startX"] = lib.GoG_JSON[i.data][index][i.properties.x];
		  Result[j][t]["startY"] = 0; // Don't care with value .. canvas handeld it .
          Result[j][t]["height"] = lib.GoG_JSON[i.data][index][i.properties.y];
		  /*if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(Result[j][t]);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(Result[j][t]);
          }*/
		/*  index++;
		 }
	   }
	   */
	  
if(!(i.properties.hasOwnProperty("dir")) || (i.properties.dir=="horizontal")){
	  
	   for(var k =1 ; k<ref1.length;k++)
	   {
		  if(ref1[k][i.properties.x]==ref1[k-1][i.properties.x])
		 {
			myData1.push(ref1[k]);  
		 }
		 else
		 {
			Result.push(myData1); 
			myData1=[];
			myData1.push(ref1[k]);
		 }
	   }
	   Result.push(myData1); 
	   	  for(var j=0; j<Result.length;j++){
		   Result[j].sort(function(a,b){
			   return  b[sort] - a[sort]; 
			   });
		for(var t=0; t<Result[j].length;t++){
		  Result[j][t]["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][t][i.properties.color];
          Result[j][t]["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][t][i.properties.width];
          Result[j][t]["fillColor"]=i.properties.fillColor; 
		  Result[j][t]["startX"] = Result[j][t][i.properties.x];
		  if(t==0){
		  Result[j][t]["startY"] =lib.GoG_JSON["height"]-lib.GoG_JSON["margin"];
		  Result[j][t]["height"] = Result[j][t][i.properties.y];
		  }else
		  {
			  Result[j][t]["startY"] =Result[j][t-1]["height"] ;
			  Result[j][t]["height"] = Result[j][t][i.properties.y];//-Result[j][t-1][i.properties.y]+ Result[j][t]["startY"] ;
		  }
          
			// Result[j][t]["height"] = Result[j][t][i.properties.y];
			 if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(Result[j][t]);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(Result[j][t]);
          }
		  index++;
			
		}   
		   
	   }
	
}else {
	
	
	
	     for(var k =1 ; k<ref1.length;k++)
	   {
		  if(ref1[k][i.properties.y]==ref1[k-1][i.properties.y])
		 {
			myData1.push(ref1[k]);  
		 }
		 else
		 {
			Result.push(myData1); 
			myData1=[];
			myData1.push(ref1[k]);
		 }
	   }
	   Result.push(myData1); 
		 
		  for(var j=0; j<Result.length;j++){
		   Result[j].sort(function(a,b){
			   return  b[sort] - a[sort]; 
			   });
		for(var t=0; t<Result[j].length;t++){
		  Result[j][t]["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][t][i.properties.color];
          Result[j][t]["height"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][t][i.properties.width];
          Result[j][t]["fillColor"]=i.properties.fillColor; 
		  Result[j][t]["startY"] =lib.GoG_JSON[i.data][index][i.properties.y];
		  if(t==0){
		  Result[j][t]["startX"] =lib.GoG_JSON["margin"];
		  Result[j][t]["width"] = lib.GoG_JSON[i.data][index][i.properties.x]-lib.GoG_JSON["margin"];
		  }else
		  {
			  Result[j][t]["startX"] =Result[j][t-1]["width"] ;
			  Result[j][t]["width"] = lib.GoG_JSON[i.data][index][i.properties.x]-lib.GoG_JSON["margin"];//-Result[j][t-1][i.properties.y]+ Result[j][t]["startY"] ;
		  }
		  
		  Result[j][t]["dir"] ="vertical";
          
			// Result[j][t]["height"] = Result[j][t][i.properties.y];
			 if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(Result[j][t]);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(Result[j][t]);
          }
		  index++;
			
		}   
		   
	   }
}

	   
	   
	 
	   
 }
 else if(i.type === "hline"){
		if(lib.Canvas_JSON.Axes[check]==="coord_polar")
		{
			if(Array.isArray(i.properties.intersect))
	         {
		        for( j=0 ;j<i.properties.intersect.length;j++)
		     {	
		         geomObj = {};
                 geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][j][i.properties.color];
                 geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][j][i.properties.width];
                 geomObj["radius"] = i.properties.intersect[j];
				 geomObj["startAngle"] =0;
				 geomObj["endAngle"] = 360;
				 geomObj["type"]="hline";
                if (lib.Canvas_JSON.hasOwnProperty("Line"))
					{
                         lib.Canvas_JSON["Line"].push(geomObj);
                    }
		  
		        else 
				   {
                   lib.Canvas_JSON["Line"] = [];
                   lib.Canvas_JSON["Line"].push(geomObj);
                   }
		     }
	     }
		 else{
			ref1 = lib.GoG_JSON[i.data];
		    for( j=0 ;j<lib.GoG_JSON[i.data].length;j++)
		     {	
		         geomObj = {};
                 geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][j][i.properties.color];
                 geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][j][i.properties.width];
                 geomObj["radius"] = lib.GoG_JSON[i.data][j][i.properties.intersect];
				 geomObj["startAngle"] =0;
				 geomObj["endAngle"] = 360;
				 geomObj["type"]="hline";
                if (lib.Canvas_JSON.hasOwnProperty("Line"))
					{
                         lib.Canvas_JSON["Line"].push(geomObj);
                    }
		  
		        else 
				   {
                   lib.Canvas_JSON["Line"] = [];
                   lib.Canvas_JSON["Line"].push(geomObj);
                   }
		     }
		 }
		}
else if(lib.Canvas_JSON.Axes[check]=="coord_flib"){
	var fieldName ,intersectVariable;
    ref1 = lib.GoG_JSON[i.data];
	yStart=lib.GoG_JSON["height"]- lib.GoG_JSON["margin"];
	 
	var startX ,endX;
	startX=lib.GoG_JSON[i.data][0][i.properties.y];
	endX=lib.GoG_JSON[i.data][0][i.properties.y];
	for( j=1 ;j<lib.GoG_JSON[i.data].length;j++)
	{
	
		if(lib.GoG_JSON[i.data][j][i.properties.y]> startX)
		{
			 
			startX=lib.GoG_JSON[i.data][j][i.properties.y];// i.height - i.margin
		}
		if(lib.GoG_JSON[i.data][j][i.properties.y]< endX)
		{
			 
			endX=lib.GoG_JSON[i.data][j][i.properties.y];// i.height - i.margin
		}
	}
	if(Array.isArray(i.properties.intersect))
	{
	 for(t=0;t< lib.ScaleObject.length;t++){
	     if(lib.ScaleObject[t].name==i.properties.x)
		     { fieldName=lib.ScaleObject[t].domain.field ;
		        break;
		     }
	   }
     for (index = 0; index <i.properties.intersect.length; index++)
	 {//
	  
	     for(k=0;k<lib.GoG_JSON[i.data].length;k++)
		 {
			 if(lib.GoG_JSON[i.data][k][fieldName]==i.properties.intersect[index])
			 { intersectVariable=lib.GoG_JSON[i.data][k][i.properties.x];
	 
          geomObj = {};
		  //->
           geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
          geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][index ][i.properties.width];
          geomObj["startX"] =startX;
          geomObj["startY"] =intersectVariable;//
          geomObj["endX"] =endX ;
          geomObj["endY"] =intersectVariable; //
          if (lib.Canvas_JSON.hasOwnProperty("Line")) {
            lib.Canvas_JSON["Line"].push(geomObj);
          } else {
            lib.Canvas_JSON["Line"] = [];
            lib.Canvas_JSON["Line"].push(geomObj);
          }
		  break;
        }	
	    }
		 
		 }
	}else{
		for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
         c = ref1[index];
          geomObj = {};
          geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
          geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][index][i.properties.width];
		  geomObj["startX"] =startX;
          geomObj["startY"] =lib.GoG_JSON[i.data][index][i.properties.x];//
          geomObj["endX"] =endX ;
          geomObj["endY"] =lib.GoG_JSON[i.data][index][i.properties.x]; //
          if (lib.Canvas_JSON.hasOwnProperty("Line")) {
            lib.Canvas_JSON["Line"].push(geomObj);
          } else {
            lib.Canvas_JSON["Line"] = [];
            lib.Canvas_JSON["Line"].push(geomObj);
          }
    }
		
	} 
	 
 }
		
		else
	 {
	 var fieldName ,intersectVariable;
    ref1 = lib.GoG_JSON[i.data];
	yStart=lib.GoG_JSON["height"]- lib.GoG_JSON["margin"];
	endY=lib.GoG_JSON[i.data][0][i.properties.y];
	for( j=1 ;j<lib.GoG_JSON[i.data].length;j++){
	 
		if(lib.GoG_JSON[i.data][j][i.properties.y]< endY)
		{
			 
			endY=lib.GoG_JSON[i.data][j][i.properties.y];// i.height - i.margin
		}
	}
	if(Array.isArray(i.properties.intersect))
	{
	 for(t=0;t< lib.ScaleObject.length;t++){
	     if(lib.ScaleObject[t].name==i.properties.x)
		     { fieldName=lib.ScaleObject[t].domain.field ;
		        break;
		     }
	   }
     for (index = 0; index <i.properties.intersect.length; index++)
	 {//
	  
	     for(k=0;k<lib.GoG_JSON[i.data].length;k++)
		 {
			 if(lib.GoG_JSON[i.data][k][fieldName]==i.properties.intersect[index])
			 { intersectVariable=lib.GoG_JSON[i.data][k][i.properties.x];
	 
          geomObj = {};
          geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
          geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][index][i.properties.width];
          geomObj["startX"] = intersectVariable;
          geomObj["startY"] =yStart;
          geomObj["endX"] =intersectVariable;
          geomObj["endY"] =endY;
          if (lib.Canvas_JSON.hasOwnProperty("Line")) {
            lib.Canvas_JSON["Line"].push(geomObj);
          }
		  
		  else {
            lib.Canvas_JSON["Line"] = [];
            lib.Canvas_JSON["Line"].push(geomObj);
          }
		  break;
        }	
	    }
		 
		 }
	}else{
    for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
      c = ref1[index];
          geomObj = {};
          geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
          geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][index][i.properties.width];
          geomObj["startX"] = lib.GoG_JSON[i.data][index][i.properties.x];
          geomObj["startY"] =yStart;
          geomObj["endX"] = lib.GoG_JSON[i.data][index][i.properties.x];
          geomObj["endY"] =endY;
          if (lib.Canvas_JSON.hasOwnProperty("Line")) {
            lib.Canvas_JSON["Line"].push(geomObj);
          } else {
            lib.Canvas_JSON["Line"] = [];
            lib.Canvas_JSON["Line"].push(geomObj);
          }
    }
   } 
 }
 }
else if(i.type === "vline"){
	var check=lib.Canvas_JSON.Axes.length;
	    check-=1;
	//var startAngle=0;
		if(lib.Canvas_JSON.Axes[check]==="coord_polar")
		{
			if(Array.isArray(i.properties.intersect))
	         {
		        for( j=0 ;j<i.properties.intersect.length;j++)
		     {	
		         geomObj = {};
                 geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][j][i.properties.color];
                 geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][j][i.properties.width];
                 geomObj["radius"] = 190;
				 //geomObj["startAngle"] =startAngle;
				 geomObj["endAngle"] = i.properties.intersect;
				 geomObj["type"]="vline";
				// startAngle=i.properties.intersect;
                if (lib.Canvas_JSON.hasOwnProperty("Line"))
					{
                         lib.Canvas_JSON["Line"].push(geomObj);
                    }
		  
		        else 
				   {
                   lib.Canvas_JSON["Line"] = [];
                   lib.Canvas_JSON["Line"].push(geomObj);
                   }
		     }
	     }
		 else{
			ref1 = lib.GoG_JSON[i.data];
		    for( j=0 ;j<lib.GoG_JSON[i.data].length;j++)
		     {	
		         geomObj = {};
                 geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][j][i.properties.color];
                 geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][j][i.properties.width];
                 geomObj["radius"] = 190;
				// geomObj["startAngle"] =startAngle;
				 geomObj["endAngle"] =lib.GoG_JSON[i.data][j][i.properties.intersect];
				 geomObj["type"]="vline";
                if (lib.Canvas_JSON.hasOwnProperty("Line"))
					{
                         lib.Canvas_JSON["Line"].push(geomObj);
                    }
		  
		        else 
				   {
                   lib.Canvas_JSON["Line"] = [];
                   lib.Canvas_JSON["Line"].push(geomObj);
                   }
		     }
		 }
		}
		
else if(lib.Canvas_JSON.Axes[check]=="coord_flib"){
	 var fieldName ,intersectVariable;
    ref1 = lib.GoG_JSON[i.data];
	yStart=lib.GoG_JSON["height"]- lib.GoG_JSON["margin"];
	endY=lib.GoG_JSON[i.data][0][i.properties.y];
	for( j=1 ;j<lib.GoG_JSON[i.data].length;j++){
	 
		if(lib.GoG_JSON[i.data][j][i.properties.y]< endY)
		{
			 
			endY=lib.GoG_JSON[i.data][j][i.properties.y];// i.height - i.margin
		}
	}
	if(Array.isArray(i.properties.intersect))
	{
	 for(t=0;t< lib.ScaleObject.length;t++){
	     if(lib.ScaleObject[t].name==i.properties.y)
		     { fieldName=lib.ScaleObject[t].domain.field ;
		        break;
		     }
	   }
     for (index = 0; index <i.properties.intersect.length; index++)
	 {//
	  
	     for(k=0;k<lib.GoG_JSON[i.data].length;k++)
		 {
			 if(lib.GoG_JSON[i.data][k][fieldName]==i.properties.intersect[index])
			 { intersectVariable=lib.GoG_JSON[i.data][k][i.properties.y];
	 
          geomObj = {};
		  //->
        geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
          geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][index][i.properties.width];
          geomObj["startX"] = intersectVariable;
          geomObj["startY"] =yStart;
          geomObj["endX"] =intersectVariable;
          geomObj["endY"] =endY;
          if (lib.Canvas_JSON.hasOwnProperty("Line")) {
            lib.Canvas_JSON["Line"].push(geomObj);
          }
		  
		  else {
            lib.Canvas_JSON["Line"] = [];
            lib.Canvas_JSON["Line"].push(geomObj);
          }
		  break;
        }	
	    }
		 
		 }
	}else{
    for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
      c = ref1[index];
          geomObj = {};
          geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
          geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][index][i.properties.width];
          geomObj["startX"] = lib.GoG_JSON[i.data][index][i.properties.y];
          geomObj["startY"] =yStart;
          geomObj["endX"] = lib.GoG_JSON[i.data][index][i.properties.y];
          geomObj["endY"] =endY;
          if (lib.Canvas_JSON.hasOwnProperty("Line")) {
            lib.Canvas_JSON["Line"].push(geomObj);
          } else {
            lib.Canvas_JSON["Line"] = [];
            lib.Canvas_JSON["Line"].push(geomObj);
          }
    }
   } 
 }
		else{
	var fieldName ,intersectVariable;
    ref1 = lib.GoG_JSON[i.data];
	yStart=lib.GoG_JSON["height"]- lib.GoG_JSON["margin"];
	 
	var startX ,endX;
	startX=lib.GoG_JSON[i.data][0][i.properties.x];
	endX=lib.GoG_JSON[i.data][0][i.properties.x];
	for( j=1 ;j<lib.GoG_JSON[i.data].length;j++)
	{
	
		if(lib.GoG_JSON[i.data][j][i.properties.x]> startX)
		{
			 
			startX=lib.GoG_JSON[i.data][j][i.properties.x];// i.height - i.margin
		}
		if(lib.GoG_JSON[i.data][j][i.properties.x]< endX)
		{
			 
			endX=lib.GoG_JSON[i.data][j][i.properties.x];// i.height - i.margin
		}
	}
	if(Array.isArray(i.properties.intersect))
	{
	 for(t=0;t< lib.ScaleObject.length;t++){
	     if(lib.ScaleObject[t].name==i.properties.y)
		     { fieldName=lib.ScaleObject[t].domain.field ;
		        break;
		     }
	   }
     for (index = 0; index <i.properties.intersect.length; index++)
	 {//
	  
	     for(k=0;k<lib.GoG_JSON[i.data].length;k++)
		 {
			 if(lib.GoG_JSON[i.data][k][fieldName]==i.properties.intersect[index])
			 { intersectVariable=lib.GoG_JSON[i.data][k][i.properties.y];
	 
          geomObj = {};
		  //->
           geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
          geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][index ][i.properties.width];
          geomObj["startX"] =startX;
          geomObj["startY"] =intersectVariable;//
          geomObj["endX"] =endX ;
          geomObj["endY"] =intersectVariable; //
          if (lib.Canvas_JSON.hasOwnProperty("Line")) {
            lib.Canvas_JSON["Line"].push(geomObj);
          } else {
            lib.Canvas_JSON["Line"] = [];
            lib.Canvas_JSON["Line"].push(geomObj);
          }
		  break;
        }	
	    }
		 
		 }
	}else{
		for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
         c = ref1[index];
          geomObj = {};
          geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
          geomObj["width"] = i.properties.width === null || i.properties.width === void 0 ? 1 : lib.GoG_JSON[i.data][index][i.properties.width];
		  geomObj["startX"] =startX;
          geomObj["startY"] =lib.GoG_JSON[i.data][index][i.properties.y];//
          geomObj["endX"] =endX ;
          geomObj["endY"] =lib.GoG_JSON[i.data][index][i.properties.y]; //
          if (lib.Canvas_JSON.hasOwnProperty("Line")) {
            lib.Canvas_JSON["Line"].push(geomObj);
          } else {
            lib.Canvas_JSON["Line"] = [];
            lib.Canvas_JSON["Line"].push(geomObj);
          }
    }
		
	} 
}
} 
else if(i.type === "Pie"){
	ref1 = lib.GoG_JSON[i.data];
	var startangle=0;
	for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
      c = ref1[index];
       
        geomObj = {};
      
		  
		  geomObj["startAngle"] = startangle;
		  geomObj["endAngle"] = lib.GoG_JSON[i.data][index][i.properties.angle];
          geomObj["anticlockwise"] = i.properties.anticlockwise;
		  geomObj["color"] =i.properties.color == null || i.properties.color == void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
		  startangle=lib.GoG_JSON[i.data][index][i.properties.angle];
		 
          if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(geomObj);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(geomObj);
          }	
}
}
else if(i.type === "Arc"){
	ref1 = lib.GoG_JSON[i.data];
	var startangle=0;
	for (index = m = 0, len2 = ref1.length; m < len2; index = ++m) {
      c = ref1[index];
       
        geomObj = {};
      
		  
		  geomObj["startAngle"] = startangle;
		  geomObj["endAngle"] = lib.GoG_JSON[i.data][index][i.properties.angle];
          geomObj["anticlockwise"] = i.properties.anticlockwise;
		  geomObj["radius"] =lib.GoG_JSON[i.data][index][i.properties.radius];
		  geomObj["color"] =i.properties.color == null || i.properties.color == void 0 ? "#000000" : lib.GoG_JSON[i.data][index][i.properties.color];
		  startangle=lib.GoG_JSON[i.data][index][i.properties.angle];
		 
          if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(geomObj);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(geomObj);
          }	
}
}
else if(i.type === "Area"){
    pointsArray = [];
    geomObj = {};
    ref2 = lib.GoG_JSON[i.data];
    for (c = n = 0, len3 = ref2.length; n < len3; c = ++n) {
      j = ref2[c];
      if (i.type === "Area") {
        arr = [];
        arr.push(j[i.properties.x]);
        arr.push(j[i.properties.y]);
        pointsArray.push(arr);
        geomObj["points"] = pointsArray;
        geomObj["fillColor"] = i.properties.fillColor === null || i.properties.fillColor === void 0 ? "rgba(200, 170, 170, 0." : i.properties.fillColor;
        geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : i.properties.color;
        geomObj["margin"] = lib.GoG_JSON["margin"];
        geomObj["height"] = lib.GoG_JSON["height"];
        geomObj["width"] = lib.GoG_JSON["width"];
        if (c === lib.GoG_JSON[i.data].length - 1) {
          if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
            lib.Canvas_JSON[i.type].push(geomObj);
          } else {
            lib.Canvas_JSON[i.type] = [];
            lib.Canvas_JSON[i.type].push(geomObj);
          }
        }
      }
    }
  }else if (i.type === "Text") {
		if(lib.Canvas_JSON.Axes[check]==="coord_polar"){
			for (l = 0, len1 = ref.length; l < len1; l++) {
      j = ref[l];
      geomObj = {};
	  geomObj["x"] = j[i.properties.angle];
        geomObj["y"] = j[i.properties.distance];
        geomObj["text"] = j[i.properties.text];
        if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
          lib.Canvas_JSON[i.type].push(geomObj);
        } else {
          lib.Canvas_JSON[i.type] = [];
          lib.Canvas_JSON[i.type].push(geomObj);
        }
	  
	  
		}
		}
		else if (lib.Canvas_JSON.Axes[check]=="coord_flib") {
        geomObj["x"] = j[i.properties.y];
        geomObj["y"] = j[i.properties.x];
        geomObj["text"] = j[i.properties.text];
        if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
          lib.Canvas_JSON[i.type].push(geomObj);
        } else {

          lib.Canvas_JSON[i.type].push(geomObj);
        }
      }
		else{
        
		for (l = 0, len1 = ref.length; l < len1; l++) {
      j = ref[l];
      geomObj = {};
	  geomObj["x"] = j[i.properties.x];
        geomObj["y"] = j[i.properties.y];
        geomObj["text"] = j[i.properties.text];
        if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
          lib.Canvas_JSON[i.type].push(geomObj);
        } else {
          lib.Canvas_JSON[i.type] = [];
          lib.Canvas_JSON[i.type].push(geomObj);
        }
	  
	  
		}
      }
      }
else if (i.type === "Point") {
if(lib.GoG_JSON.hasOwnProperty("facets"))
		  {
			  geomObj = {}; 
	    geomObj["x"] =i.properties.x;
        geomObj["y"] =i.properties.y;
		geomObj["xField"] = i.properties.x;
        geomObj["yField"] = i.properties.y;
        geomObj["color"] =i.properties.color;
        geomObj["fillColor"] = i.properties.fillColor;
        geomObj["linewidth"] =i.properties.linewidth;
        geomObj["radius"] = i.properties.radius;
        geomObj["anticlockwise"] = i.properties.anticlockwise;
        geomObj["startAngle"] = i.properties.startAngle;
        geomObj["endAngle"] = i.properties.endAngle;
        if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
          lib.Canvas_JSON[i.type].push(geomObj);
        } else {
          lib.Canvas_JSON[i.type] = [];
          lib.Canvas_JSON[i.type].push(geomObj);
        }
		  
		  }
	else{	
	for (l = 0, len1 = ref.length; l < len1; l++) {
      j = ref[l];
      geomObj = {}; 	  
		  if(lib.Canvas_JSON.Axes[check]==="coord_polar"){
        geomObj["angle"] = j[i.properties.angle];
        geomObj["distance"] = j[i.properties.distance];
        geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : j[i.properties.color];
        geomObj["fillColor"] = i.properties.fillColor === null || i.properties.fillColor === void 0 ? "#ffffff" : j[i.properties.fillColor];
        geomObj["linewidth"] = i.properties.linewidth === null || i.properties.linewidth === void 0 ? 1 : j[i.properties.linewidth];
        geomObj["radius"] = i.properties.radius === null || i.properties.radius === void 0 ? 7 : j[i.properties.radius];
        geomObj["anticlockwise"] = i.properties.anticlockwise === null || i.properties.anticlockwise === void 0 ? false : j[i.properties.anticlockwise];
        geomObj["startAngle"] = i.properties.startAngle === null || i.properties.startAngle === void 0 ? 0 : j[i.properties.startAngle];
        geomObj["endAngle"] = i.properties.endAngle === null || i.properties.endAngle === void 0 ? 360 : j[i.properties.endAngle];
        if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
          lib.Canvas_JSON[i.type].push(geomObj);
        } else {
          lib.Canvas_JSON[i.type] = [];
          lib.Canvas_JSON[i.type].push(geomObj);
        }
		
      }
	      else if (lib.Canvas_JSON.Axes[check]=="coord_flib") {
        geomObj["x"] = j[i.properties.y];
        geomObj["y"] = j[i.properties.x];
        geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : j[i.properties.color];
        geomObj["fillColor"] = i.properties.fillColor === null || i.properties.fillColor === void 0 ? "#ffffff" : j[i.properties.fillColor];
        geomObj["linewidth"] = i.properties.linewidth === null || i.properties.linewidth === void 0 ? 1 : j[i.properties.linewidth];
        geomObj["radius"] = i.properties.radius === null || i.properties.radius === void 0 ? 7 : j[i.properties.radius];
        geomObj["anticlockwise"] = i.properties.anticlockwise === null || i.properties.anticlockwise === void 0 ? false : j[i.properties.anticlockwise];
        geomObj["startAngle"] = i.properties.startAngle === null || i.properties.startAngle === void 0 ? 0 : j[i.properties.startAngle];
        geomObj["endAngle"] = i.properties.endAngle === null || i.properties.endAngle === void 0 ? 360 : j[i.properties.endAngle];
        if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
          lib.Canvas_JSON[i.type].push(geomObj);
        } else {
          lib.Canvas_JSON[i.type] = [];
          lib.Canvas_JSON[i.type].push(geomObj);
        }
      }
	       else{
		  // Defult  cartisam coordinate 
		 
		geomObj["x"] = j[i.properties.x];
        geomObj["y"] = j[i.properties.y];
		geomObj["xField"] = i.properties.x;
        geomObj["yField"] = i.properties.y;
        geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : j[i.properties.color];
        geomObj["fillColor"] = i.properties.fillColor === null || i.properties.fillColor === void 0 ? "#ffffff" : j[i.properties.fillColor];
        geomObj["linewidth"] = i.properties.linewidth === null || i.properties.linewidth === void 0 ? 1 : j[i.properties.linewidth];
        geomObj["radius"] = i.properties.radius === null || i.properties.radius === void 0 ? 7 : j[i.properties.radius];
        geomObj["anticlockwise"] = i.properties.anticlockwise === null || i.properties.anticlockwise === void 0 ? false : j[i.properties.anticlockwise];
        geomObj["startAngle"] = i.properties.startAngle === null || i.properties.startAngle === void 0 ? 0 : j[i.properties.startAngle];
        geomObj["endAngle"] = i.properties.endAngle === null || i.properties.endAngle === void 0 ? 360 : j[i.properties.endAngle];
        if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
          lib.Canvas_JSON[i.type].push(geomObj);
        } else {
          lib.Canvas_JSON[i.type] = [];
          lib.Canvas_JSON[i.type].push(geomObj);
        }
		  
	  }
	  
	  }
	}
}
else if (i.type === "Diamond"){
	
    
	   if(lib.GoG_JSON.hasOwnProperty("facets"))
		  {
			  geomObj = {}; 
		geomObj["color"] = i.properties.color;
        geomObj["x"] =i.properties.x;
        geomObj["y"] =i.properties.y;
        if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
          lib.Canvas_JSON[i.type].push(geomObj);
        } else {
          lib.Canvas_JSON[i.type] = [];
          lib.Canvas_JSON[i.type].push(geomObj);
        } 
		  }
		  else{
			  
      if (lib.Canvas_JSON.Axes[check]=="coord_flib") {
		  for (l = 0, len1 = ref.length; l < len1; l++) {
      j = ref[l];
      geomObj = {}; 	
        geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : j[i.properties.color];
        geomObj["x"] = j[i.properties.y];
        geomObj["y"] = j[i.properties.x];
        if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
          lib.Canvas_JSON[i.type].push(geomObj);
        } else {
          lib.Canvas_JSON[i.type] = [];
          lib.Canvas_JSON[i.type].push(geomObj);
        }
      }
      }
	else{
		for (l = 0, len1 = ref.length; l < len1; l++) {
      j = ref[l];
      geomObj = {}; 	
        geomObj["color"] = i.properties.color === null || i.properties.color === void 0 ? "#000000" : j[i.properties.color];
        geomObj["x"] = j[i.properties.x];
        geomObj["y"] = j[i.properties.y];
        if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
          lib.Canvas_JSON[i.type].push(geomObj);
        } else {
          lib.Canvas_JSON[i.type] = [];
          lib.Canvas_JSON[i.type].push(geomObj);
        }
        }
      }
	  
        
 }
 }
 else if (i.type === "Image"){
	 for (l = 0, len1 = ref.length; l < len1; l++) {
      j = ref[l];
	  geomObj = {}; 
      //pixelArray=[];
     Allpixel=[];	  
        geomObj["height"] = j[i.properties.height];
        geomObj["width"] = j[i.properties.width];
        geomObj["x"] = j[i.properties.x];
        geomObj["y"] = j[i.properties.y];
	 for(var a=0; a<i.properties.pixels.length;a++){
		 pixelArray=[];
		var temp=i.properties.pixels[a];
		for(var k=0;k<temp.length;k++){
			
			pixelArray.push(j[i.properties.pixels[a][k]]);
		}
		    Allpixel.push(pixelArray);
		}
		
		geomObj["pixels"] =Allpixel ;
		 if (lib.Canvas_JSON.hasOwnProperty(i.type)) {
          lib.Canvas_JSON[i.type].push(geomObj);
        } else {
          lib.Canvas_JSON[i.type] = [];
          lib.Canvas_JSON[i.type].push(geomObj);
        }
 }
 }
  } 
  
};

//# sourceMappingURL=Geom.js.map