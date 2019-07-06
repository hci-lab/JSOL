//create by eman and shorouk ^_^ 
var guides, onlyUnique;
guides = (function () {
    function guides() {
    }

    return guides;

})();

guides.prototype.process = function (obj) {
    var c, dataArray, domainArray, i, j, k, key, key1, l1, l, s, len, len1, len3, m, check,
        GuidesArray = [];

    for (l = 0, len1 = obj.length; l < len1; l++) {
        j = obj[l];
        if (j.type == "legend") {
            fields = {};
            position = {};
            propertise = {};
            symboles = [];
            legendobj = {};
            title = {};
            data = {};
            legendobj["type_guide"] = j.type;
            if (j.hasOwnProperty("domain")) {
                ref1 = lib.GoG_JSON[j.domain.data];
                if (j.domain.type == "colour" || j.domain.type == "width") {
                    feildobj = [];
                    subobj = {};
                    exist = function (objarr, val) {
                        for (var s = 0; s < objarr.length; s++) {
                            if (objarr[s].value === val) {
                                check = 1;
                                break;
                            } else
                                check = 0;
                        }
                        return check;
                    };
                    sort = function (array, key) {
                        return array.sort(function (a, b) {
                            var x = a[key];
                            var y = b[key];
                            return ((x < y) ? -1 : ((x > y) ? 1 : 0));

                        });
                    };
                    if (!Array.isArray(j.domain.data)) {
                        if (!Array.isArray(j.domain.field)) {
                            for (t = 0; t < lib.ScaleObject.length; t++) {
                                if (lib.ScaleObject[t].name == j.domain.field) {
                                    fields["field"] = lib.ScaleObject[t].domain.field;
                                    break;
                                }
                            }
                            for (k = 0, len = ref1.length; k < len; k++) {
                                subobj = {};
                                if (!exist(feildobj, ref1[k][j.domain.field])) {
                                    subobj["value"] = ((ref1[k][j.domain.field]));
                                    if (j.domain.hasOwnProperty("name")) {
                                        subobj["name"] = (j.domain.name[k]);
                                    } else {
                                        subobj["name"] = ((ref1[k][fields.field]));
                                    }
                                    feildobj.push(subobj);
                                }
                            }
                        } else if (Array.isArray(j.domain.field)) {
                            for (k = 0, len = j.domain.name.length; k < len; k++) {
                                subobj = {};
                                //if(!exist(feildobj,ref1[k][j.domain.field])){

                                subobj["value"] = (j.domain.field[k]);
                                if (j.domain.hasOwnProperty("name")) {
                                    subobj["name"] = (j.domain.name[k]);
                                }

                                feildobj.push(subobj);
                            }
                        }
                    }
                    /* else if(Array.isArray(j.domain.data)){
                      if(!Array.isArray(j.domain.field)){
                       for (k = 0, len = ref1.length; k < len; k++) {
                           subobj={};
                           if(!exist(feildobj,ref1[k][j.domain.field])){
                                subobj["value"]=((ref1[k][j.domain.field]));
                                subobj["name"]=(j.domain.data[k]);
                                feildobj.push(subobj);
                              }
                              }
                              }

                     } */
                }
                /* else if(j.domain.type=="shape"){
                 for (k = 0, len = j.domain.data.length; k < len; k++) {
                       subobj={};
                       //if(!exist(feildobj,ref1[k][j.domain.field])){
                            subobj["value"]=(j.domain.field[k]);
                            subobj["name"]=(j.domain.data[k]);
                            feildobj.push(subobj);
                          }
                          } */

                symbole = {};
                symbole["gome_type"] = j.domain.symbols.gome_type;
                if (j.domain.symbols.hasOwnProperty("line_weight")) {
                    symbole["line_weight"] = j.domain.symbols.line_weight;
                }
                if (j.domain.symbols.hasOwnProperty("radius")) {
                    symbole["radius"] = j.domain.symbols.radius;
                }
                if (j.domain.symbols.hasOwnProperty("line_lenght")) {
                    symbole["line_lenght"] = j.domain.symbols.line_lenght;
                }
                if (j.domain.symbols.hasOwnProperty("width")) {
                    symbole["width"] = j.domain.symbols.width;

                }
                if (j.domain.symbols.hasOwnProperty("height")) {
                    symbole["height"] = j.domain.symbols.height;
                }
                feildobj = sort(feildobj, "value");
                data["type"] = j.domain.type;
                data["feildobj"] = feildobj;
                data["fields"] = fields;
                data["symbole"] = symbole;
                legendobj["data"] = data;

            }
            title["name"] = j.properties.title.name;
            title["title_position"] = j.properties.title.title_position;
            title["title_color"] = j.properties.title.title_color;
            title["title_font"] = j.properties.title.title_font;
            propertise["title"] = title;
            position["X"] = j.properties.position.x;
            position["Y"] = j.properties.position.y;
            position["stroke_width"] = j.properties.position.stroke_width;
            position["stroke_height"] = j.properties.position.stroke_height;
            propertise["position"] = position;
            legendobj["properties"] = propertise;

            if (j.hasOwnProperty("shape")) {
                shapes = [];
                for (k = 0, len = j.shape.length; k < len; k++) {
                    symbole = {};
                    symbole["gome_type"] = j.shape[k].gome_type;

                    if (j.shape[k].hasOwnProperty("width")) {
                        symbole["width"] = j.shape[k].width;
                    }
                    if (j.shape[k].hasOwnProperty("height")) {
                        symbole["height"] = j.shape[k].height;
                    }
                    if (j.shape[k].hasOwnProperty("radius")) {
                        symbole["radius"] = j.shape[k].radius;
                    }
                    if (j.shape[k].hasOwnProperty("line_weight")) {
                        symbole["line_weight"] = j.shape[k].line_weight;
                    }
                    if (j.shape[k].hasOwnProperty("line_lenght")) {
                        symbole["line_lenght"] = j.shape[k].line_lenght;
                    }

                    symbole["name"] = j.shape[k].name;
                    symbole["colour"] = j.shape[k].colour;
                    shapes.push(symbole);
                }
                legendobj["shapes"] = shapes;
            }
            GuidesArray.push(legendobj);
        }

        if (j.type == "text") {
            textobj = {};
            textobj["type_guide"] = j.type;
            textobj["label"] = j.properties.label;
            //textobj["type"]=j.properties.type;
            textobj["colour"] = j.properties.colour;
            textobj["X"] = j.properties.position.x;
            textobj["Y"] = j.properties.position.y;
            textobj["font"] = j.properties.font;
            textobj["margin"] = lib.GoG_JSON["margin"];
            textobj["height"] = lib.GoG_JSON["height"];
            textobj["width"] = lib.GoG_JSON["width"];
            GuidesArray.push(textobj);
        }
        if (j.type == "form") {
            formobj = {};
            formobj["type_guide"] = j.type;
            formobj["label"] = j.properties.label;
            formobj["type"] = j.properties.type;
            formobj["position"] = j.properties.position;
            GuidesArray.push(formobj);
        }
        if (j.type == "image") {
            imageobj = {};
            imageobj["type_guide"] = j.type;
            imageobj["position"] = j.properties.position;
            imageobj["label"] = j.properties.label;
            GuidesArray.push(imageobj);
        }

    }
    return lib.Canvas_JSON["Guides"] = GuidesArray;
};
onlyUnique = function (value, index, self) {
    return self.indexOf(value) === index;
};
	
	