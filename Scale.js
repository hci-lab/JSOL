
var Scale;

Scale = (function() {
  function Scale() {}

  return Scale;

})();

Scale.prototype.process = function(obj) {
	lib.ScaleObject=obj; // global object we uesed in Geom " vline -hline "
  var c, dataArray, domainArray, i, j, k, key, key1, l, len, len1, len2, m, maxRange, minRange, rangeArray, ref, ref1, scaleArray, scaleObj, value, value1;
  dataArray = [];
  for (k = 0, len = obj.length; k < len; k++) {
    i = obj[k];
    ref = lib.GoG_JSON[i.domain.data];
    for (l = 0, len1 = ref.length; l < len1; l++) {
      j = ref[l];
      for (key in j) {
        value = j[key];
        if (key === i.domain.field) {
          dataArray.push(value);
		  break;
        } else {
          continue;
        }
      }
    }
	var o = d3.scale.ordinal()
    .domain(dataArray)
    .rangePoints([0, 360]);
	//console.log(o.range());
	if(i.type==="ordinal"){
		 domainArray=dataArray;
	 }
	 else{
		domainArray = [d3.min(dataArray), d3.max(dataArray)];
		 }
     rangeArray = [];
    /* if (Array.isArray(i.range)) {
      rangeArray = i.range;
    }
    else */ 
	if (!i.range.hasOwnProperty("value")){
		var temp;
		temp= d3.scale[i.type]();
       rangeArray = temp[i.range.type]();
	}
	else if (i.range.value === "height") {
      minRange = lib.GoG_JSON[i.range.value] - lib.GoG_JSON.margin;
      rangeArray.push(minRange);
      maxRange = lib.GoG_JSON.margin;
      rangeArray.push(maxRange);
    } else if (i.range.value === "width") { 
	     minRange = lib.GoG_JSON.margin;
         rangeArray.push(minRange);
         maxRange = lib.GoG_JSON[i.range.value] - lib.GoG_JSON.margin;
         rangeArray.push(maxRange);
	}
	else  {
    rangeArray=i.range.value;

    } 
	scaleObj = {
      type: i.type,
      domain: domainArray,
	  range_type:i.range.type,
      range_value: rangeArray
    };
	
    
    scaleArray = Scale.prototype.scale(scaleObj);
	console.log(scaleArray.range());
    ref1 = lib.GoG_JSON[i.domain.data];
    for (m = 0, len2 = ref1.length; m < len2; m++) {
      c = ref1[m];
      for (key1 in c) {
        value1 = c[key1];
		if(key === i.domain.field ){
			c[i.name] = scaleArray(c[i.domain.field]);
			break;
		}
        
      }
    }
    dataArray = [];
    domainArray = [];
  }
};

Scale.prototype.scale = function(obj) {
  var scaleobj;
  scaleobj = d3.scale[obj.type]();
  scaleobj = scaleobj["domain"](obj.domain);
 return scaleobj = scaleobj[ obj.range_type](obj.range_value);
};

//# sourceMappingURL=Scale.js.map
