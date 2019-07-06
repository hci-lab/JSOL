var Area, Axes, Background, Canvas_Geometry, Canvas_Parse, Diamond, Line, Picture, Point, Text, Tooltip, Bar,
    StackedBar, Pie, Arc, Guides, Image;
extend = function (child, parent) {
    for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
    }

    function ctor() {
        this.constructor = child;
    }

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
},
    hasProp = {}.hasOwnProperty;
var global_currentY, global_currentX, global_startY, global_clockwise = true;
Canvas_Geometry = (function () {
    function Canvas_Geometry() {
    }

    return Canvas_Geometry;

})();

Line = (function (superClass) {
    extend(Line, superClass);

    function Line() {
        return Line.__super__.constructor.apply(this, arguments);
    }

    return Line;

})(Canvas_Geometry);
Line.prototype.draw = function (obj) {
    var color, i, l, len, results, width;
    results = [];
    var check = lib.Canvas_JSON.Axes.length;
    check -= 1;
    if (lib.Canvas_JSON.Axes[check] === "coord_polar") {
        i = obj[0];
        if (i.type == "hline") {
            for (l = 0, len = obj.length; l < len; l++) {
                i = obj[l];
                color = i.color === null || i.color === void 0 ? "#FF0000" : i.color;
                width = i.width === null || i.width === void 0 ? 1 : i.width;
                lib.context.beginPath();
                lib.context.arc(0, 0, i.radius, i.startAngle, -i.endAngle, true);
                lib.context.strokeStyle = color;
                lib.context.stroke();
            }
        } else if (i.type == "vline") {
            for (l = 0, len = obj.length; l < len; l++) {
                i = obj[l];
                color = i.color === null || i.color === void 0 ? "#FF0000" : i.color;
                width = i.width === null || i.width === void 0 ? 1 : i.width;
                lib.context.beginPath();
                lib.context.moveTo(0, 0);
                // lib.context.lineTo(0,0,i.radius,i.startAngle,-i.endAngle, true);
                lib.context.lineTo(i.radius * Math.cos(Math.PI * i.endAngle / 180.0), i.radius * Math.sin(Math.PI * i.endAngle / 180.0));
                lib.context.strokeStyle = color;
                lib.context.stroke();
            }
        } else {
            for (l = 0, len = obj.length; l < len; l++) {
                i = obj[l];
                color = i.color === null || i.color === void 0 ? "#FF0000" : i.color;
                width = i.width === null || i.width === void 0 ? 1 : i.width;
                lib.context.beginPath();
                lib.context.moveTo(i.startY * Math.cos(Math.PI * i.startX / 180.0), i.startY * Math.sin(Math.PI * i.startX / 180.0));
                lib.context.lineTo(i.endY * Math.cos(Math.PI * i.endX / 180.0), i.endY * Math.sin(Math.PI * i.endX / 180.0));
                lib.context.strokeStyle = color;
                lib.context.lineWidth = width;
                lib.context.stroke();
                lib.context.closePath();
                lib.context.strokeStyle = "#000000";
                results.push(lib.context.lineWidth = 1);
            }
        }
    } else if (lib.Canvas_JSON.Axes[check] === "coord_parallel") {
        if (lib.GoG_JSON.hasOwnProperty("facets")) {
            if ((lib.GoG_JSON["facets"].hasOwnProperty("y_axis")) && !(lib.GoG_JSON["facets"].hasOwnProperty("x_axis"))) {
                ylenth = lib.GoG_JSON["facets"].y_axis.length;
                var Len = Math.round((lib.GoG_JSON["width"] - 2 * lib.GoG_JSON["margin"]) / (obj[0].y.length - 1));
                //Math.round((lib.GoG_JSON["width"]-2*lib.GoG_JSON["margin"])/(obj[0].y.length-1));
                for (var s = 0; s < ylenth; s++) {	//obj1.length
                    var obj1 = lib.GoG_JSON["facets"].y_axis[s];
                    for (l = 0, len = obj1.length; l < len; l++) {
                        i = obj1[l];
                        color = obj[0].color === null || obj[0].color === void 0 ? "#000000" : i[obj[0].color];
                        width = obj[0].width === null || obj[0].width === void 0 ? 1 : i[obj[0].width];
                        LL = 0;
                        j = 0;
                        for (var ss = 1; ss < obj[0].y.length; ss++) {
                            lib.context.beginPath();
                            //lib.context.rect(i[obj[0].x]+lib.GoG_JSON["margin"],
                            //lib.GoG_JSON["height"]-lib.GoG_JSON["margin"]-i[obj[0].y]-s*lib.GoG_JSON["facets"].height, width,
                            //(obj[0].startY-s*lib.GoG_JSON["facets"].height)-(lib.GoG_JSON["height"]- lib.GoG_JSON["margin"]-i[obj[0].y]-s*lib.GoG_JSON["facets"].height));

                            lib.context.moveTo(lib.GoG_JSON["margin"] + LL, i[obj[0].y[ss - 1]] + lib.GoG_JSON["margin"] + lib.GoG_JSON["facets"].margin + (lib.GoG_JSON["facets"].height * s));
                            LL += Len;//+((lib.GoG_JSON["facets"].height+lib.GoG_JSON["margin"])*j)
                            lib.context.lineTo(lib.GoG_JSON["margin"] + LL, i[obj[0].y[ss]] + lib.GoG_JSON["facets"].margin + lib.GoG_JSON["margin"] + (lib.GoG_JSON["facets"].height * s));
                            lib.context.strokeStyle = color;//+lib.GoG_JSON["facets"].height+lib.GoG_JSON["margin"]
                            lib.context.lineWidth = width;
                            lib.context.stroke();
                            lib.context.closePath();
                            lib.context.strokeStyle = "#000000";
                            results.push(lib.context.lineWidth = 1);
                            j++;
                        }
                    }
                }
            }
        } else {
            i = obj[0];
            var Le = Math.round((lib.GoG_JSON["width"] - 2 * lib.GoG_JSON["margin"]) / (i.y.length - 1));
            var L;
            for (l = 0, len = obj.length; l < len; l++) {
                i = obj[l];
                color = i.color === null || i.color === void 0 ? "#FF0000" : i.color;
                width = i.width === null || i.width === void 0 ? 1 : i.width;
                LL = 0;
                for (var s = 1; s < i.y.length; s++) {
                    lib.context.beginPath();
                    lib.context.moveTo(lib.GoG_JSON["margin"] + LL, i.y[s - 1]);
                    LL += Le;
                    lib.context.lineTo(lib.GoG_JSON["margin"] + LL, i.y[s]);

                    lib.context.strokeStyle = color;
                    lib.context.lineWidth = width;
                    lib.context.stroke();
                    lib.context.closePath();
                    lib.context.strokeStyle = "#000000";
                    results.push(lib.context.lineWidth = 1);
                }


            }

        }
    } else if (lib.Canvas_JSON.Axes[check] === "coord_polar_parallel") {
        i = obj[0];
        var Le = 360 / (lib.Canvas_JSON.Axes.length - 1);
        var L;
        var rad = ((lib.GoG_JSON["height"] - (lib.GoG_JSON["margin"])) / 2) * (1 / 8);
        for (l = 0, len = obj.length; l < len; l++) {
            i = obj[l];
            color = i.color === null || i.color === void 0 ? "#FF0000" : i.color;
            width = i.width === null || i.width === void 0 ? 1 : i.width;
            LL = Le;
            for (var s = 1; s < i.y.length; s++) {
                lib.context.beginPath();
                lib.context.moveTo((rad + i.y[s - 1]) * Math.cos(Math.PI * -1 * LL / 180.0), (rad + i.y[s - 1]) * Math.sin(Math.PI * -1 * LL / 180.0));
                LL += Le;
                lib.context.lineTo((rad + i.y[s]) * Math.cos(Math.PI * -1 * LL / 180.0), (rad + i.y[s]) * Math.sin(Math.PI * -1 * LL / 180.0));
                lib.context.strokeStyle = color;
                lib.context.lineWidth = width;
                lib.context.stroke();
                lib.context.closePath();
                lib.context.strokeStyle = "#000000";
                results.push(lib.context.lineWidth = 1);
            }
            lib.context.beginPath();
            lib.context.moveTo((rad + i.y[i.y.length - 1]) * Math.cos(Math.PI * -1 * LL / 180.0), (rad + i.y[i.y.length - 1]) * Math.sin(Math.PI * -1 * LL / 180.0));
            LL += Le;
            lib.context.lineTo((rad + i.y[0]) * Math.cos(Math.PI * -1 * LL / 180.0), (rad + i.y[0]) * Math.sin(Math.PI * -1 * LL / 180.0));
            lib.context.strokeStyle = color;
            lib.context.lineWidth = width;
            lib.context.stroke();
            lib.context.closePath();
            lib.context.strokeStyle = "#000000";
            results.push(lib.context.lineWidth = 1);


        }

    } else {
        for (l = 0, len = obj.length; l < len; l++) {
            i = obj[l];
            color = i.color === null || i.color === void 0 ? "#FF0000" : i.color;
            width = i.width === null || i.width === void 0 ? 1 : i.width;
            lib.context.beginPath();
            lib.context.moveTo(i.startX, i.startY);
            lib.context.lineTo(i.endX, i.endY);
            lib.context.strokeStyle = color;
            lib.context.lineWidth = width;
            lib.context.stroke();
            lib.context.closePath();
            lib.context.strokeStyle = "#000000";
            results.push(lib.context.lineWidth = 1);
        }

    }
    return results;
};

StackedBar = (function (superClass) {
    extend(StackedBar, superClass);

    function StackedBar() {
        return StackedBar.__super__.constructor.apply(this, arguments);
    }

    return StackedBar;

})(Canvas_Geometry);
StackedBar.prototype.draw = function (obj) {
    var color, i, l, len, results, width, fillColor, height;
    results = [];
    for (l = 0, len = obj.length; l < len; l++) {
        i = obj[l];
        color = i.color === null || i.color === void 0 ? "#FF0000" : i.color;
        fillColor = i.fillColor === null || i.fillColor === void 0 ? i.fillColor : i.fillColor;
        if (i.dir == "vertical") {
            height = -(i.height === null || i.height === void 0 ? 10 : i.height);
            width = i.width;
            /* if(i.width>i.startX){
		    width=(i.startX-i.width);
	    }
	    else{
            width=(i.width-i.startX);
	    } */
        } else {
            width = i.width === null || i.width === void 0 ? 10 : i.width;
            if (i.height > i.startY) {
                height = (i.startY - i.height);
            } else {
                height = (i.height - i.startY);
            }
        }


        lib.context.beginPath();
        lib.context.rect(i.startX, i.startY, width, height);

        /*lib.context.fillStyle = fillColor;
    lib.context.fill();
    lib.context.strokeStyle = color;
    lib.context.stroke();
    lib.context.closePath();
    lib.context.strokeStyle = "#000000";
    lib.context.lineWidth = 10;
    results.push(lib.context.fillStyle = "#000000");*/
        //lib.context.fillRect=color;
        lib.context.fillStyle = color;
        lib.context.fill();
        lib.context.lineWidth = 2;
        lib.context.strokeStyle = color;
        lib.context.stroke();
        //results.push(lib.context.fillStyle=fillColor);
    }
    return results;
};

Bar = (function (superClass) {
    extend(Bar, superClass);

    function Bar() {
        return Bar.__super__.constructor.apply(this, arguments);
    }

    return Bar;

})(Canvas_Geometry);
Bar.prototype.draw = function (obj) {
    var check = lib.Canvas_JSON.Axes.length;
    check -= 1;
    if (lib.Canvas_JSON.Axes[check] === "coord_polar") {
        var i, l, len, results;
        results = [];
        for (l = 0, len = obj.length; l < len; l++) {
            i = obj[l];
            color = i.color === null || i.color === void 0 ? "#FF0000" : i.color;
            if (!i.hasOwnProperty("anticlockwise") || i.anticlockwise == null) {
                lib.context.beginPath();
                var startAngle = (Math.PI * (360 - i.startAngle)) / 180; // Starting point on circle
                var endAngle = (Math.PI * (360 - i.endAngle)) / 180; // End point on circle
                var anticlockwise = true; // clockwise or anticlockwise
                //lib.context.arc(0,0,i.radius, startAngle, endAngle, global_clockwise);
                lib.context.moveTo(0, 0);
                lib.context.lineTo(i.radius * Math.cos(Math.PI * -i.startAngle / 180.0), i.radius * Math.sin(Math.PI * -i.startAngle / 180.0));
                lib.context.lineTo(i.radius * Math.cos(Math.PI * -i.endAngle / 180.0), i.radius * Math.sin(Math.PI * -i.endAngle / 180.0));
                lib.context.moveTo(i.radius * Math.cos(Math.PI * -i.startAngle / 180.0), i.radius * Math.sin(Math.PI * -i.startAngle / 180.0));
                lib.context.lineTo(i.radius * Math.cos(Math.PI * -i.endAngle / 180.0), i.radius * Math.sin(Math.PI * -i.endAngle / 180.0));

            } else {
                lib.context.beginPath();
                var startAngle = (Math.PI * (360 - i.startAngle)) / 180; // Starting point on circle
                var endAngle = (Math.PI * (360 - i.endAngle)) / 180; // End point on circle
                var anticlockwise = true; // clockwise or anticlockwise
                lib.context.moveTo(0, 0);
                lib.context.lineTo(i.radius * Math.cos(Math.PI * -i.startAngle / 180.0), i.radius * Math.sin(Math.PI * -i.startAngle / 180.0));
                lib.context.lineTo(i.radius * Math.cos(Math.PI * -i.endAngle / 180.0), i.radius * Math.sin(Math.PI * -i.endAngle / 180.0));
                lib.context.moveTo(i.radius * Math.cos(Math.PI * -i.startAngle / 180.0), i.radius * Math.sin(Math.PI * -i.startAngle / 180.0));
                lib.context.lineTo(i.radius * Math.cos(Math.PI * -i.endAngle / 180.0), i.radius * Math.sin(Math.PI * -i.endAngle / 180.0));

            }
            /* if(l % 2 == 0){
	 lib.context.fillStyle="red";
	}
	else{
		lib.context.fillStyle="black";
	}	  */
            lib.context.fillStyle = i.color;
            lib.context.fill();
            results.push(lib.context);
        }
    } else {
        var color, i, l, len, results, width, fillColor, height;
        results = [];
        if (lib.GoG_JSON.hasOwnProperty("facets")) {
            var xlenth, ylenth;

            if (!(lib.GoG_JSON["facets"].hasOwnProperty("y_axis")) && lib.GoG_JSON["facets"].hasOwnProperty("x_axis")) {
                xlenth = lib.GoG_JSON["facets"].x_axis.length;
                for (var s = 0; s < xlenth; s++) {
                    var obj1 = lib.GoG_JSON["facets"].x_axis[s];
                    for (l = 0, len = obj1.length; l < len; l++) {
                        i = obj1[l];
                        color = obj[0].color === null || obj[0].color === void 0 ? "#FF0000" : i[obj[0].color];
                        fillColor = obj[0].fillColor === null || obj[0].fillColor === void 0 ? "#ffffff" : i[obj[0].fillColor];
                        border = obj[0].border === null || obj[0].border === void 0 ? 5 : i[obj[0].border];
                        width = obj[0].width === null || obj[0].width === void 0 ? 10 : i[obj[0].width];
                        lib.context.beginPath();
                        //lib.context.fillText(lib.GoG_JSON["facets"].x_axis[i],lib.GoG_JSON["margin"]*2+i*lib.GoG_JSON["facets"].width,lib.GoG_JSON["margin"]/2);
                        lib.context.rect(i[obj[0].x] + lib.GoG_JSON["margin"] + s * lib.GoG_JSON["facets"].width, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y], width, obj[0].startY - (lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y]));
                        lib.context.fillStyle = fillColor;
                        lib.context.fill();
                        lib.context.lineWidth = 2;
                        lib.context.strokeStyle = color;
                        lib.context.stroke();
                        results.push(lib.context);
                    }
                }
            } else if ((lib.GoG_JSON["facets"].hasOwnProperty("y_axis")) && !(lib.GoG_JSON["facets"].hasOwnProperty("x_axis"))) {
                ylenth = lib.GoG_JSON["facets"].y_axis.length;
                for (var s = 0; s < ylenth; s++) {
                    var obj1 = lib.GoG_JSON["facets"].y_axis[s];
                    for (l = 0, len = obj1.length; l < len; l++) {
                        i = obj1[l];
                        color = obj[0].color === null || obj[0].color === void 0 ? "#FF0000" : i[obj[0].color];
                        fillColor = obj[0].fillColor === null || obj[0].fillColor === void 0 ? "#ffffff" : i[obj[0].fillColor];
                        border = obj[0].border === null || obj[0].border === void 0 ? 5 : i[obj[0].border];
                        width = obj[0].width === null || obj[0].width === void 0 ? 10 : i[obj[0].width];
                        lib.context.beginPath();
                        lib.context.rect(i[obj[0].x] + lib.GoG_JSON["margin"], lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height, width, (obj[0].startY - s * lib.GoG_JSON["facets"].height) - (lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height));
                        lib.context.fillStyle = fillColor;
                        lib.context.fill();
                        lib.context.lineWidth = 2;
                        lib.context.strokeStyle = color;
                        lib.context.stroke();
                        results.push(lib.context);
                    }
                }

            } else {
                var xlenth = lib.GoG_JSON["facets"].x_axis.length;
                var ylenth = lib.GoG_JSON["facets"].y_axis.length;
                for (var a = 0; a < xlenth; a++) {

                    for (var s = 0; s < ylenth; s++) {
                        var obj1 = lib.GoG_JSON["facets"].y_axis[s];
                        for (l = 0, len = obj1.length; l < len; l++) {
                            i = obj1[l];
                            color = obj[0].color === null || obj[0].color === void 0 ? "#FF0000" : i[obj[0].color];
                            fillColor = obj[0].fillColor === null || obj[0].fillColor === void 0 ? "#ffffff" : i[obj[0].fillColor];
                            border = obj[0].border === null || obj[0].border === void 0 ? 5 : i[obj[0].border];
                            width = obj[0].width === null || obj[0].width === void 0 ? 10 : i[obj[0].width];
                            lib.context.beginPath();
                            lib.context.rect(i[obj[0].x] + lib.GoG_JSON["margin"] + a * lib.GoG_JSON["facets"].width, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height, width, (obj[0].startY - s * lib.GoG_JSON["facets"].height) - (lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height));
                            lib.context.fillStyle = fillColor;
                            lib.context.fill();
                            lib.context.lineWidth = 2;
                            lib.context.strokeStyle = color;
                            lib.context.stroke();
                            results.push(lib.context);
                        }
                    }


                }


                for (var a = 0; a < ylenth; a++) {
                    for (var s = 0; s < xlenth; s++) {
                        var obj1 = lib.GoG_JSON["facets"].x_axis[s];
                        for (l = 0, len = obj1.length; l < len; l++) {
                            i = obj1[l];
                            color = obj[0].color === null || obj[0].color === void 0 ? "#FF0000" : i[obj[0].color];
                            fillColor = obj[0].fillColor === null || obj[0].fillColor === void 0 ? "#ffffff" : i[obj[0].fillColor];
                            border = obj[0].border === null || obj[0].border === void 0 ? 5 : i[obj[0].border];
                            width = obj[0].width === null || obj[0].width === void 0 ? 10 : i[obj[0].width];
                            lib.context.beginPath();
                            //lib.context.fillText(lib.GoG_JSON["facets"].x_axis[i],lib.GoG_JSON["margin"]*2+i*lib.GoG_JSON["facets"].width,lib.GoG_JSON["margin"]/2);
                            lib.context.rect(i[obj[0].x] + lib.GoG_JSON["margin"] + s * lib.GoG_JSON["facets"].width, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - a * lib.GoG_JSON["facets"].height, width, (obj[0].startY - a * lib.GoG_JSON["facets"].height) - (lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - a * lib.GoG_JSON["facets"].height));
                            lib.context.fillStyle = fillColor;
                            lib.context.fill();
                            lib.context.lineWidth = 2;
                            lib.context.strokeStyle = color;
                            lib.context.stroke();
                            results.push(lib.context);
                        }
                    }

                }
            }
        } else {
            for (l = 0, len = obj.length; l < len; l++) {
                i = obj[l];
                color = i.color === null || i.color === void 0 ? "#FF0000" : i.color;
                fillColor = i.fillColor === null || i.fillColor === void 0 ? i.fillColor : i.fillColor;

                border = i.border === null || i.border === void 0 ? 5 : i.border;
                lib.context.beginPath();
                if (i.dir == "vertical") {
                    height = -(i.height === null || i.height === void 0 ? 10 : i.height);
                    width = i.width;
                    lib.context.rect(i.startX, i.startY, width, height);
                } else {

                    width = i.width === null || i.width === void 0 ? 10 : i.width;
                    lib.context.rect(i.startX, i.startY - i.height, width, i.height);
                }
                lib.context.fillStyle = fillColor;
                lib.context.fill();
                lib.context.lineWidth = 2;
                lib.context.strokeStyle = i.color;
                lib.context.stroke();
                results.push(lib.context);
                //lib.context.rect(60, 440, 1080, -10);

                /*lib.context.fillStyle = fillColor;
    lib.context.fill();
    lib.context.strokeStyle = color;
    lib.context.stroke();
    lib.context.closePath();
    lib.context.strokeStyle = "#000000";
    lib.context.lineWidth = border;
    results.push(lib.context.fillStyle = "#000000");*/
                //////lib.context.fillRect=fillColor;


            }
        }
    }
    return results;
};

Area = (function (superClass) {
    extend(Area, superClass);

    function Area() {
        return Area.__super__.constructor.apply(this, arguments);
    }

    return Area;

})(Canvas_Geometry);
Area.prototype.draw = function (obj) {
    var color, fillColor, i, k, l, len, len1, m, ref, results;
    results = [];
    for (l = 0, len = obj.length; l < len; l++) {
        i = obj[l];
        color = i.color === null || i.color === void 0 ? "#FF0000" : i.color;
        fillColor = i.fillColor === null || i.fillColor === void 0 ? "#ffffff" : i.fillColor;
        lib.context.beginPath();
        lib.context.lineCap = "round";
        lib.context.moveTo(i.points[0][0], i.height - i.margin);
        ref = i.points;
        for (m = 0, len1 = ref.length; m < len1; m++) {
            k = ref[m];
            lib.context.lineTo(k[0], k[1]);
        }
        lib.context.lineTo(i.points[i.points.length - 1][0], i.height - i.margin);
        lib.context.fillStyle = fillColor;
        lib.context.fill();
        lib.context.strokeStyle = color;
        lib.context.stroke();
        lib.context.closePath();
        lib.context.strokeStyle = "#000000";
        lib.context.lineWidth = 1;
        results.push(lib.context.fillStyle = "#000000");
    }
    return results;
};

Background = (function (superClass) {
    extend(Background, superClass);

    function Background() {
        return Background.__super__.constructor.apply(this, arguments);
    }

    return Background;

})(Canvas_Geometry);
Background.prototype.draw = function (value) {
    var url;
    url = "http";
    if (value.indexOf(url) > -1) {
        lib.canvas.style.backgroundImage = 'url(' + value + ')';
        return lib.canvas.style.backgroundSize = '100% 100%';
    } else {
        return lib.canvas.style.backgroundColor = value;
    }
};

Diamond = (function (superClass) {
    extend(Diamond, superClass);

    function Diamond() {
        return Diamond.__super__.constructor.apply(this, arguments);
    }

    return Diamond;

})(Canvas_Geometry);
Diamond.prototype.draw = function (obj) {
    var color, cursorx, cursory, i, l, len, results;
    results = [];
    if (lib.GoG_JSON.hasOwnProperty("facets")) {
        var xlenth, ylenth;

        if (!(lib.GoG_JSON["facets"].hasOwnProperty("y_axis")) && lib.GoG_JSON["facets"].hasOwnProperty("x_axis")) {
            xlenth = lib.GoG_JSON["facets"].x_axis.length;
            for (var s = 0; s < xlenth; s++) {
                var obj1 = lib.GoG_JSON["facets"].x_axis[s];
                for (l = 0, len = obj1.length; l < len; l++) {
                    i = obj1[l];
                    color = i[obj[0].color] === null || i[obj[0].color] === void 0 ? "#FF0000" : i[obj[0].color];
                    cursorx = 15;
                    cursory = 15;
                    lib.context.beginPath();
                    lib.context.moveTo(i[obj[0].x] + lib.GoG_JSON["margin"] + s * lib.GoG_JSON["facets"].width, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - cursory);
                    lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"] + s * lib.GoG_JSON["facets"].width + cursorx, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y]);
                    lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"] + s * lib.GoG_JSON["facets"].width, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] + cursory);
                    lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"] + s * lib.GoG_JSON["facets"].width - cursorx, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y]);
                    lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"] + s * lib.GoG_JSON["facets"].width, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - cursory);
                    lib.context.fillStyle = color;
                    lib.context.fill();
                    lib.context.strokeStyle = color;
                    lib.context.stroke();
                    lib.context.closePath();
                    lib.context.strokeStyle = "#000000";
                    lib.context.lineWidth = 1;
                    results.push(lib.context.fillStyle = "#000000");

                    //   lib.context.arc(i[obj[0].x]+lib.GoG_JSON["margin"]+s*lib.GoG_JSON["facets"].width , lib.GoG_JSON["height"]- lib.GoG_JSON["margin"]-i[obj[0].y], radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, anticlockwise);

                }
            }
        } else if ((lib.GoG_JSON["facets"].hasOwnProperty("y_axis")) && !(lib.GoG_JSON["facets"].hasOwnProperty("x_axis"))) {
            ylenth = lib.GoG_JSON["facets"].y_axis.length;
            for (var s = 0; s < ylenth; s++) {
                var obj1 = lib.GoG_JSON["facets"].y_axis[s];
                for (l = 0, len = obj1.length; l < len; l++) {
                    i = obj1[l];
                    color = i[obj[0].color] === null || i[obj[0].color] === void 0 ? "#FF0000" : i[obj[0].color];
                    cursorx = 4;
                    cursory = 4;
                    lib.context.beginPath();
                    lib.context.moveTo(i[obj[0].x] + lib.GoG_JSON["margin"], (lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height) - cursory);
                    lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"] + cursorx, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height);

                    lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"], (lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height) + cursory);

                    lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"] - cursorx, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height);
                    lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"], (lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height) - cursory);
                    lib.context.fillStyle = color;
                    lib.context.fill();
                    lib.context.strokeStyle = color;
                    lib.context.stroke();
                    lib.context.closePath();
                    lib.context.strokeStyle = "#000000";
                    lib.context.lineWidth = 1;
                    results.push(lib.context.fillStyle = "#000000");


                }
            }
        } else {
            var xlenth = lib.GoG_JSON["facets"].x_axis.length;
            var ylenth = lib.GoG_JSON["facets"].y_axis.length;
            for (var a = 0; a < xlenth; a++) {
                for (var s = 0; s < ylenth; s++) {
                    var obj1 = lib.GoG_JSON["facets"].y_axis[s];
                    for (l = 0, len = obj1.length; l < len; l++) {
                        i = obj1[l];
                        color = i[obj[0].color] === null || i[obj[0].color] === void 0 ? "#FF0000" : i[obj[0].color];
                        cursorx = 4;
                        cursory = 4;
                        lib.context.beginPath();
                        lib.context.moveTo(i[obj[0].x] + lib.GoG_JSON["margin"] + a * lib.GoG_JSON["facets"].width, (lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height) - cursory);
                        lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"] + a * lib.GoG_JSON["facets"].width + cursorx, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height);

                        lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"] + a * lib.GoG_JSON["facets"].width, (lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height) + cursory);

                        lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"] + a * lib.GoG_JSON["facets"].width - cursorx, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height);
                        lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"] + a * lib.GoG_JSON["facets"].width, (lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height) - cursory);
                        lib.context.fillStyle = color;
                        lib.context.fill();
                        lib.context.strokeStyle = color;
                        lib.context.stroke();
                        lib.context.closePath();
                        lib.context.strokeStyle = "#000000";
                        lib.context.lineWidth = 1;
                        results.push(lib.context.fillStyle = "#000000");


                    }
                }


            }


            for (var a = 0; a < ylenth; a++) {
                for (var s = 0; s < xlenth; s++) {
                    var obj1 = lib.GoG_JSON["facets"].x_axis[s];
                    for (l = 0, len = obj1.length; l < len; l++) {
                        i = obj1[l];
                        color = i[obj[0].color] === null || i[obj[0].color] === void 0 ? "#FF0000" : i[obj[0].color];
                        cursorx = 10;
                        cursory = 10;
                        lib.context.beginPath();
                        lib.context.moveTo(i[obj[0].x] + lib.GoG_JSON["margin"] + s * lib.GoG_JSON["facets"].width, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - a * lib.GoG_JSON["facets"].height - cursory);
                        lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"] + s * lib.GoG_JSON["facets"].width + cursorx, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - a * lib.GoG_JSON["facets"].height);
                        lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"] + s * lib.GoG_JSON["facets"].width, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - a * lib.GoG_JSON["facets"].height + cursory);
                        lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"] + s * lib.GoG_JSON["facets"].width - cursorx, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - a * lib.GoG_JSON["facets"].height);
                        lib.context.lineTo(i[obj[0].x] + lib.GoG_JSON["margin"] + s * lib.GoG_JSON["facets"].width, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - a * lib.GoG_JSON["facets"].height - cursory);
                        lib.context.fillStyle = color;
                        lib.context.fill();
                        lib.context.strokeStyle = color;
                        lib.context.stroke();
                        lib.context.closePath();
                        lib.context.strokeStyle = "#000000";
                        lib.context.lineWidth = 1;
                        results.push(lib.context.fillStyle = "#000000");

                        //   lib.context.arc(i[obj[0].x]+lib.GoG_JSON["margin"]+s*lib.GoG_JSON["facets"].width , lib.GoG_JSON["height"]- lib.GoG_JSON["margin"]-i[obj[0].y], radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, anticlockwise);

                    }
                }


            }
        }

    } else {
        for (l = 0, len = obj.length; l < len; l++) {
            i = obj[l];
            color = i.color === null || i.color === void 0 ? "#FF0000" : i.color;
            cursorx = 4;
            cursory = 4;
            lib.context.beginPath();
            lib.context.moveTo(i.x, i.y - cursory);
            lib.context.lineTo(i.x + cursorx, i.y);
            lib.context.lineTo(i.x, i.y + cursory);
            lib.context.lineTo(i.x - cursorx, i.y);
            lib.context.lineTo(i.x, i.y - cursory);
            lib.context.fillStyle = color;
            lib.context.fill();
            lib.context.strokeStyle = color;
            lib.context.stroke();
            lib.context.closePath();
            lib.context.strokeStyle = "#000000";
            lib.context.lineWidth = 1;
            results.push(lib.context.fillStyle = "#000000");
        }
    }
    return results;
};
Point = (function (superClass) {
    extend(Point, superClass);

    function Point() {
        return Point.__super__.constructor.apply(this, arguments);
    }

    return Point;

})(Canvas_Geometry);
Point.prototype.draw = function (obj) {
    var anticlockwise, color, endAngle, fillColor, i, l, len, linewidth, radius, results, startAngle;
    results = [];
    var check = lib.Canvas_JSON.Axes.length;
    check -= 1;
    if (lib.Canvas_JSON.Axes[check] === "coord_polar") {

        for (l = 0, len = obj.length; l < len; l++) {
            i = obj[l];
            color = i.color === null || i.color === void 0 ? "#000000" : i.color;
            fillColor = i.fillColor === null || i.fillColor === void 0 ? "#ffffff" : i.fillColor;
            linewidth = i.linewidth === null || i.linewidth === void 0 ? 1 : i.linewidth;
            radius = i.radius === null || i.radius === void 0 ? 7 : i.radius;
            anticlockwise = i.anticlockwise === null || i.anticlockwise === void 0 ? false : i.anticlockwise;
            startAngle = i.startAngle === null || i.startAngle === void 0 ? 0 : i.startAngle;
            endAngle = i.endAngle === null || i.endAngle === void 0 ? 360 : i.endAngle;
            lib.context.beginPath();
            lib.context.arc(i.distance * Math.cos(Math.PI * i.angle / 180.0), i.distance * Math.sin(Math.PI * i.angle / 180.0), radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, anticlockwise);
            lib.context.fillStyle = fillColor;
            lib.context.fill();
            lib.context.lineWidth = linewidth;
            lib.context.strokeStyle = color;
            lib.context.stroke();
            lib.context.strokeStyle = "#000000";
            lib.context.lineWidth = 1;
            results.push(lib.context.fillStyle = "#000000");

        }

    } else {
        if (lib.GoG_JSON.hasOwnProperty("facets")) {
            var xlenth, ylenth;

            if (!(lib.GoG_JSON["facets"].hasOwnProperty("y_axis")) && lib.GoG_JSON["facets"].hasOwnProperty("x_axis")) {
                xlenth = lib.GoG_JSON["facets"].x_axis.length;
                for (var s = 0; s < xlenth; s++) {
                    var obj1 = lib.GoG_JSON["facets"].x_axis[s];
                    for (l = 0, len = obj1.length; l < len; l++) {
                        i = obj1[l];

                        color = obj[0].color === null || obj[0].color === void 0 ? "#000000" : i[obj[0].color];
                        fillColor = obj[0].fillColor === null || obj[0].fillColor === void 0 ? "#ffffff" : i[obj[0].fillColor];
                        linewidth = obj[0].linewidth === null || obj[0].linewidth === void 0 ? 1 : i[obj[0].linewidth];
                        radius = obj[0].radius === null || obj[0].radius === void 0 ? 7 : i[obj[0].radius];
                        anticlockwise = obj[0].anticlockwise === null || obj[0].anticlockwise === void 0 ? false : i[obj[0].anticlockwise];
                        startAngle = obj[0].startAngle === null || obj[0].startAngle === void 0 ? 0 : i[obj[0].startAngle];
                        endAngle = obj[0].endAngle === null || obj[0].endAngle === void 0 ? 360 : i[obj[0].endAngle];
                        lib.context.beginPath();
                        lib.context.arc(i[obj[0].x] + lib.GoG_JSON["margin"] + s * lib.GoG_JSON["facets"].width, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y], radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, anticlockwise);
                        lib.context.fillStyle = fillColor;
                        lib.context.fill();
                        lib.context.lineWidth = linewidth;
                        lib.context.strokeStyle = color;
                        lib.context.stroke();
                        lib.context.strokeStyle = "#000000";
                        lib.context.lineWidth = 1;
                        results.push(lib.context.fillStyle = "#000000");
                    }
                }
            } else if ((lib.GoG_JSON["facets"].hasOwnProperty("y_axis")) && !(lib.GoG_JSON["facets"].hasOwnProperty("x_axis"))) {

                ylenth = lib.GoG_JSON["facets"].y_axis.length;
                for (var s = 0; s < ylenth; s++) {
                    var obj1 = lib.GoG_JSON["facets"].y_axis[s];
                    for (l = 0, len = obj1.length; l < len; l++) {
                        i = obj1[l];

                        color = obj[0].color === null || obj[0].color === void 0 ? "#000000" : i[obj[0].color];
                        fillColor = obj[0].fillColor === null || obj[0].fillColor === void 0 ? "#ffffff" : i[obj[0].fillColor];
                        linewidth = obj[0].linewidth === null || obj[0].linewidth === void 0 ? 1 : i[obj[0].linewidth];
                        radius = obj[0].radius === null || obj[0].radius === void 0 ? 7 : i[obj[0].radius];
                        anticlockwise = obj[0].anticlockwise === null || obj[0].anticlockwise === void 0 ? false : i[obj[0].anticlockwise];
                        startAngle = obj[0].startAngle === null || obj[0].startAngle === void 0 ? 0 : i[obj[0].startAngle];
                        endAngle = obj[0].endAngle === null || obj[0].endAngle === void 0 ? 360 : i[obj[0].endAngle];
                        lib.context.beginPath();
                        lib.context.arc(i[obj[0].x] + lib.GoG_JSON["margin"], lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height
                            , radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, anticlockwise);
                        lib.context.fillStyle = fillColor;
                        lib.context.fill();
                        lib.context.lineWidth = linewidth;
                        lib.context.strokeStyle = color;
                        lib.context.stroke();
                        lib.context.strokeStyle = "#000000";
                        lib.context.lineWidth = 1;
                        results.push(lib.context.fillStyle = "#000000");
                    }
                }

            } else {
                var xlenth = lib.GoG_JSON["facets"].x_axis.length;
                var ylenth = lib.GoG_JSON["facets"].y_axis.length;
                for (var a = 0; a < xlenth; a++) {
                    for (var s = 0; s < ylenth; s++) {
                        var obj1 = lib.GoG_JSON["facets"].y_axis[s];
                        for (l = 0, len = obj1.length; l < len; l++) {
                            i = obj1[l];

                            color = obj[0].color === null || obj[0].color === void 0 ? "#000000" : i[obj[0].color];
                            fillColor = obj[0].fillColor === null || obj[0].fillColor === void 0 ? "#ffffff" : i[obj[0].fillColor];
                            linewidth = obj[0].linewidth === null || obj[0].linewidth === void 0 ? 1 : i[obj[0].linewidth];
                            radius = obj[0].radius === null || obj[0].radius === void 0 ? 7 : i[obj[0].radius];
                            anticlockwise = obj[0].anticlockwise === null || obj[0].anticlockwise === void 0 ? false : i[obj[0].anticlockwise];
                            startAngle = obj[0].startAngle === null || obj[0].startAngle === void 0 ? 0 : i[obj[0].startAngle];
                            endAngle = obj[0].endAngle === null || obj[0].endAngle === void 0 ? 360 : i[obj[0].endAngle];
                            lib.context.beginPath();
                            lib.context.arc(i[obj[0].x] + lib.GoG_JSON["margin"] + a * lib.GoG_JSON["facets"].width, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - s * lib.GoG_JSON["facets"].height
                                , radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, anticlockwise);
                            lib.context.fillStyle = fillColor;
                            lib.context.fill();
                            lib.context.lineWidth = linewidth;
                            lib.context.strokeStyle = color;
                            lib.context.stroke();
                            lib.context.strokeStyle = "#000000";
                            lib.context.lineWidth = 1;
                            results.push(lib.context.fillStyle = "#000000");
                        }
                    }


                }


                for (var a = 0; a < ylenth; a++) {
                    for (var s = 0; s < xlenth; s++) {
                        var obj1 = lib.GoG_JSON["facets"].x_axis[s];
                        for (l = 0, len = obj1.length; l < len; l++) {
                            i = obj1[l];

                            color = obj[0].color === null || obj[0].color === void 0 ? "#000000" : i[obj[0].color];
                            fillColor = obj[0].fillColor === null || obj[0].fillColor === void 0 ? "#ffffff" : i[obj[0].fillColor];
                            linewidth = obj[0].linewidth === null || obj[0].linewidth === void 0 ? 1 : i[obj[0].linewidth];
                            radius = obj[0].radius === null || obj[0].radius === void 0 ? 7 : i[obj[0].radius];
                            anticlockwise = obj[0].anticlockwise === null || obj[0].anticlockwise === void 0 ? false : i[obj[0].anticlockwise];
                            startAngle = obj[0].startAngle === null || obj[0].startAngle === void 0 ? 0 : i[obj[0].startAngle];
                            endAngle = obj[0].endAngle === null || obj[0].endAngle === void 0 ? 360 : i[obj[0].endAngle];
                            lib.context.beginPath();
                            lib.context.arc(i[obj[0].x] + lib.GoG_JSON["margin"] + s * lib.GoG_JSON["facets"].width, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i[obj[0].y] - a * lib.GoG_JSON["facets"].height, radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, anticlockwise);
                            lib.context.fillStyle = fillColor;
                            lib.context.fill();
                            lib.context.lineWidth = linewidth;
                            lib.context.strokeStyle = color;
                            lib.context.stroke();
                            lib.context.strokeStyle = "#000000";
                            lib.context.lineWidth = 1;
                            results.push(lib.context.fillStyle = "#000000");
                        }
                    }

                }
            }
        } else {

            for (l = 0, len = obj.length; l < len; l++) {
                i = obj[l];
                color = i.color === null || i.color === void 0 ? "#000000" : i.color;
                fillColor = i.fillColor === null || i.fillColor === void 0 ? "#ffffff" : i.fillColor;
                linewidth = i.linewidth === null || i.linewidth === void 0 ? 1 : i.linewidth;
                radius = i.radius === null || i.radius === void 0 ? 7 : i.radius;
                anticlockwise = i.anticlockwise === null || i.anticlockwise === void 0 ? false : i.anticlockwise;
                startAngle = i.startAngle === null || i.startAngle === void 0 ? 0 : i.startAngle;
                endAngle = i.endAngle === null || i.endAngle === void 0 ? 360 : i.endAngle;
                lib.context.beginPath();
                lib.context.arc(i.x, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - i.y, radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, anticlockwise);
                lib.context.fillStyle = fillColor;
                lib.context.fill();
                lib.context.lineWidth = linewidth;
                lib.context.strokeStyle = color;
                lib.context.stroke();
                lib.context.strokeStyle = "#000000";
                lib.context.lineWidth = 1;
                results.push(lib.context.fillStyle = "#000000");
            }
        }
    }
    return results;
};
Picture = (function (superClass) {
    extend(Picture, superClass);

    function Picture() {
        return Picture.__super__.constructor.apply(this, arguments);
    }

    return Picture;

})(Canvas_Geometry);
Picture.prototype.draw = function (obj) {
    var i, l, len, results;
    results = [];
    for (l = 0, len = obj.length; l < len; l++) {
        i = obj[l];
        results.push(Picture.Process(i));
    }
    return results;
};
Picture.prototype.Process = function (obj) {
    var image;
    image = new Image();
    image.src = obj.src;
    return image.onload = function () {
        var imageHeight, imageWidth;
        imageWidth = image.width;
        imageHeight = image.height;
        lib.context.save();
        lib.context.translate(obj.x - (imageHeight / 2), obj.y - (imageWidth / 2));
        lib.context.drawImage(image, 0, 0);
        return lib.context.restore();
    };
};
Image = (function (superClass) {
    extend(Image, superClass);

    function Image() {
        return Image.__super__.constructor.apply(this, arguments);
    }

    return Image;

})(Canvas_Geometry);
Image.prototype.draw = function (obj) {
    results = [];

    for (l = 0, len = obj.length; l < len; l++) {
        i = obj[l];
        var width = i.width / i.pixels[0].length;
        var height = i.height / i.pixels.length;
        for (var a = 0; a < i.pixels.length; a++) {
            var temp = i.pixels[a];
            for (var k = 0; k < temp.length; k++) {
                lib.context.beginPath();
                lib.context.rect(lib.GoG_JSON["margin"] + i.x + (k * width), lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - (i.y + (a * height)), width, height);
                lib.context.fillStyle = temp[k];
                lib.context.fill();
                results.push(lib.context);
            }
        }

    }
    return results;

};
Text = (function (superClass) {
    extend(Text, superClass);

    function Text() {
        return Text.__super__.constructor.apply(this, arguments);
    }

    return Text;

})(Canvas_Geometry);
Text.prototype.draw = function (obj) {
    var i, l, len, results;
    results = [];
    var check = lib.Canvas_JSON.Axes.length;
    check -= 1;
    if (lib.Canvas_JSON.Axes[check] === "coord_polar") {
        for (l = 0, len = obj.length; l < len; l++) {
            i = obj[l];
            lib.context.font = "15px Arial";

            results.push(lib.context.fillText(i.text, i.y * Math.cos(Math.PI * i.x / 180.0), i.y * Math.sin(Math.PI * i.x / 180.0)));

        }
    } else {
        for (l = 0, len = obj.length; l < len; l++) {
            i = obj[l];
            lib.context.font = "15px Arial";
            results.push(lib.context.fillText(i.text, i.x, i.y));
        }
    }

    return results;

};

Pie = (function (superClass) {
    extend(Pie, superClass);

    function Pie() {
        return Pie.__super__.constructor.apply(this, arguments);
    }

    return Pie;

})(Canvas_Geometry);
Pie.prototype.draw = function (obj) {
    var i, l, len, results;
    //var startPointx =lib.GoG_JSON["width"]/2;
    //var startPointy =lib.GoG_JSON["height"]/2;
    //lib.context.translate(startPointx, startPointy);
    results = [];
    var radius = (lib.GoG_JSON["height"] - (2 * lib.GoG_JSON["margin"])) / 2;
    for (l = 0, len = obj.length; l < len; l++) {
        i = obj[l];
        color = i.color === null || i.color === void 0 ? "#FF0000" : i.color;
        if (!i.hasOwnProperty("anticlockwise") || i.anticlockwise == null) {
            //lib.context.arc(0, 0, radius, i.startAngle, i.endAngle, global_clockwise);
            lib.context.beginPath();
            var startAngle = (Math.PI * (360 - i.startAngle)) / 180; // Starting point on circle
            var endAngle = (Math.PI * (360 - i.endAngle)) / 180; // End point on circle
            var anticlockwise = true; // clockwise or anticlockwise
            lib.context.arc(0, 0, radius, startAngle, endAngle, global_clockwise);
            lib.context.moveTo(0, 0);
            lib.context.lineTo(radius * Math.cos(Math.PI * -i.startAngle / 180.0), radius * Math.sin(Math.PI * -i.startAngle / 180.0));
            lib.context.lineTo(radius * Math.cos(Math.PI * -i.endAngle / 180.0), radius * Math.sin(Math.PI * -i.endAngle / 180.0));

        } else {
            lib.context.beginPath();
            var startAngle = (Math.PI * (360 - i.startAngle)) / 180; // Starting point on circle
            var endAngle = (Math.PI * (360 - i.endAngle)) / 180; // End point on circle
            var anticlockwise = true; // clockwise or anticlockwise
            lib.context.arc(0, 0, radius, startAngle, endAngle, i.anticlockwise);
            lib.context.moveTo(0, 0);
            lib.context.lineTo(radius * Math.cos(Math.PI * -i.startAngle / 180.0), radius * Math.sin(Math.PI * -i.startAngle / 180.0));
            lib.context.lineTo(radius * Math.cos(Math.PI * -i.endAngle / 180.0), radius * Math.sin(Math.PI * -i.endAngle / 180.0));

            //lib.context.arc(0, 0, radius, (i.startAngle*(22/7))/180, (i.endAngle*(22/7))/180, i.anticlockwise);
            /*lib.context.beginPath();
		lib.context.moveTo(0, 0);
        lib.context.lineTo(radius * Math.cos(Math.PI * -i.startAngle / 180.0), radius* Math.sin(Math.PI * -i.startAngle / 180.0));
		lib.context.moveTo(0, 0);
        lib.context.lineTo(radius* Math.cos(Math.PI * -i.endAngle / 180.0), radius* Math.sin(Math.PI * -i.endAngle / 180.0));
		// lib.context.closePath();
		//Draw  curve between the two end point of two line
		//middle angle
		midAngle=(i.endAngle-i.startAngle)/2;
		lib.context.moveTo(0, 0);
		x=radius * Math.cos(Math.PI * -midAngle / 180.0);
		y=radius* Math.sin(Math.PI * -midAngle / 180.0);
		//lib.context.lineTo(x,y);
	    lib.context.moveTo(radius* Math.cos(Math.PI * -i.startAngle / 180.0), radius* Math.sin(Math.PI * -i.startAngle / 180.0));
        lib.context.quadraticCurveTo(x, y, radius* Math.cos(Math.PI * -i.endAngle / 180.0), radius * Math.sin(Math.PI * -i.endAngle / 180.0));
      // 	lib.context.bezierCurveTo(x, y,x,y, radius* Math.cos(Math.PI * -i.endAngle / 180.0), radius * Math.sin(Math.PI * -i.endAngle / 180.0));
        lib.context.stroke();*/


        }
        /* if(l % 2 == 0){
	 lib.context.fillStyle="red";
	}
	else{
		lib.context.fillStyle="black";
	} */
        lib.context.fillStyle = i.color;
        lib.context.fill();

        results.push(lib.context);
    }
    return results;
};
Arc = (function (superClass) {
    extend(Arc, superClass);

    function Arc() {
        return Arc.__super__.constructor.apply(this, arguments);
    }

    return Arc;

})(Canvas_Geometry);
Arc.prototype.draw = function (obj) {
    var i, l, len, results;
    results = [];
    for (l = 0, len = obj.length; l < len; l++) {
        i = obj[l];
        color = i.color === null || i.color === void 0 ? "#FF0000" : i.color;
        if (!i.hasOwnProperty("anticlockwise") || i.anticlockwise == null) {
            lib.context.beginPath();
            var startAngle = (Math.PI * (360 - i.startAngle)) / 180; // Starting point on circle
            var endAngle = (Math.PI * (360 - i.endAngle)) / 180; // End point on circle
            var anticlockwise = true; // clockwise or anticlockwise
            lib.context.arc(0, 0, i.radius, startAngle, endAngle, global_clockwise);
            lib.context.moveTo(0, 0);
            lib.context.lineTo(i.radius * Math.cos(Math.PI * -i.startAngle / 180.0), i.radius * Math.sin(Math.PI * -i.startAngle / 180.0));
            lib.context.lineTo(i.radius * Math.cos(Math.PI * -i.endAngle / 180.0), i.radius * Math.sin(Math.PI * -i.endAngle / 180.0));

        } else {
            lib.context.beginPath();
            var startAngle = (Math.PI * (360 - i.startAngle)) / 180; // Starting point on circle
            var endAngle = (Math.PI * (360 - i.endAngle)) / 180; // End point on circle
            var anticlockwise = true; // clockwise or anticlockwise
            lib.context.arc(0, 0, i.radius, startAngle, endAngle, i.anticlockwise);
            lib.context.moveTo(0, 0);
            lib.context.lineTo(i.radius * Math.cos(Math.PI * -i.startAngle / 180.0), i.radius * Math.sin(Math.PI * -i.startAngle / 180.0));
            lib.context.lineTo(i.radius * Math.cos(Math.PI * -i.endAngle / 180.0), i.radius * Math.sin(Math.PI * -i.endAngle / 180.0));

        }
        /* if(l % 2 == 0){
	 lib.context.fillStyle="red";
	}
	else{
		lib.context.fillStyle="black";
	}	 */
        lib.context.fillStyle = i.color;
        lib.context.fill();

        results.push(lib.context);
    }
    return results;
};
Guides = (function (superClass) {
    extend(Guides, superClass);

    function Guides() {
        return Guides.__super__.constructor.apply(this, arguments);
    }

    return Guides;

})(Canvas_Geometry);
Guides.prototype.draw = function (obj) {
    var color, i, l, j, k, len1, len, results, width = 0, fillColor, height = 0, ref1, x, y;
    results = [];
    //x=80;//we will change
    //y=90;//we will change
    for (l = 0, len = obj.length; l < len; l++) {
        i = obj[l];


        if (i.type_guide == "legend") {
            x = i.properties.position.X;
            y = i.properties.position.Y;

            if (i.hasOwnProperty("data")) {
                if (i.data.symbole.hasOwnProperty("width") && i.data.symbole.hasOwnProperty("height")) {
                    width = i.data.symbole.width;
                    height = i.data.symbole.height;
                }
                if (i.data.type == "colour") {
                    if (i.data.symbole.gome_type == "line" || i.data.symbole.gome_type == "Area") {
                        lib.context.strokeRect(x - 15, y - 25, i.properties.position.stroke_width, i.properties.position.stroke_height);
                        lib.context.beginPath();
                        lib.context.fillStyle = i.properties.title.title_color;
                        lib.context.font = i.properties.title.title_font;
                        //lib.context.textAlign=i.properties.title.title_position;
                        lib.context.fillText(i.properties.title.name, (x - 10), (y - 10));
                        lib.context.fill();
                        lib.context.stroke();
                        for (k = 0, len2 = i.data.feildobj.length; k < len2; k++) {
                            lib.context.beginPath();
                            lib.context.moveTo(x, y + (width * k));
                            lib.context.lineTo(x + i.data.symbole.line_lenght, (y + (width * k)));
                            lib.context.fillStyle = i.data.feildobj[k].value;
                            lib.context.fill();
                            lib.context.fillText(i.data.feildobj[k].name, x + i.data.symbole.line_lenght + 5, y + width * k + 1);
                            lib.context.lineWidth = i.data.symbole.line_weight;
                            lib.context.closePath();
                            lib.context.strokeStyle = i.data.feildobj[k].value;
                            lib.context.stroke();
                            results.push(lib.context);
                        }

                    } else if (i.data.symbole.gome_type == "StackedBar" || i.data.symbole.gome_type == "bar") {
                        lib.context.strokeRect(x - 15, y - 25, i.properties.position.stroke_width, i.properties.position.stroke_height);
                        for (k = 0, len2 = i.data.feildobj.length; k < len2; k++) {
                            lib.context.beginPath();
                            lib.context.rect(x, y + (width * k), width, height);
                            lib.context.fillStyle = i.data.feildobj[k].value;
                            lib.context.fill();
                            lib.context.fillText(i.data.feildobj[k].name, x + width + 5, y + width * k + 7);
                            lib.context.lineWidth = 2;
                            lib.context.closePath();
                            lib.context.strokeStyle = i.data.feildobj[k].value;
                            lib.context.stroke();
                            results.push(lib.context);
                        }
                        lib.context.beginPath();
                        lib.context.fillStyle = i.properties.title.title_color;
                        lib.context.font = i.properties.title.title_font;
                        lib.context.fillText(i.properties.title.name, (x - 10), (y - 10));
                        lib.context.fill();
                        lib.context.stroke();

                    } else if (i.data.symbole.gome_type == "diamond") {
                        cursorx = 4;
                        cursory = 4;
                        lib.context.strokeRect(x - 15, y - 25, i.properties.position.stroke_width, i.properties.position.stroke_height);
                        for (k = 0, len2 = i.data.feildobj.length; k < len2; k++) {

                            lib.context.beginPath();
                            //lib.context.moveTo(x, (y+(width*k)));
                            lib.context.lineTo(x + cursorx, (y + (width * k)));
                            lib.context.lineTo(x, (y + (width * k)) + cursory);
                            lib.context.lineTo(x - cursorx, (y + (width * k)));
                            lib.context.lineTo(x, (y + (width * k)) - cursory);
                            lib.context.fillStyle = i.data.feildobj[k].value;
                            lib.context.fill();
                            lib.context.fillText(i.data.feildobj[k].name, x + cursory * 2 + 5, y + width * k + 1);
                            lib.context.lineWidth = i.data.symbole.line_weight;
                            lib.context.closePath();
                            lib.context.strokeStyle = i.data.feildobj[k].value;
                            lib.context.stroke();
                            results.push(lib.context);
                        }
                        lib.context.beginPath();
                        lib.context.fillStyle = i.properties.title.title_color;
                        lib.context.font = i.properties.title.title_font;
                        lib.context.fillText(i.properties.title.name, (x - 10), (y - 10));
                        lib.context.fill();
                        lib.context.stroke();


                    } else if (i.data.symbole.gome_type == "point") {
                        radius = i.data.symbole.radius;
                        anticlockwise = false;
                        startAngle = 0;
                        endAngle = 360;
                        lib.context.strokeRect(x - 15, y - 25, i.properties.position.stroke_width, i.properties.position.stroke_height);
                        for (k = 0, len2 = i.data.feildobj.length; k < len2; k++) {
                            lib.context.beginPath();
                            lib.context.arc(x, (y + (width * k)), radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, anticlockwise);
                            lib.context.fillStyle = i.data.feildobj[k].value;
                            lib.context.fill();
                            lib.context.fillText(i.data.feildobj[k].name, x + radius * 2 + 4, y + width * k + 1);
                            lib.context.closePath();
                            lib.context.strokeStyle = i.data.feildobj[k].value;
                            lib.context.stroke();
                            results.push(lib.context);
                        }
                        lib.context.beginPath();
                        lib.context.fillStyle = i.properties.title.title_color;
                        lib.context.font = i.properties.title.title_font;
                        lib.context.fillText(i.properties.title.name, (x - 10), (y - 10));
                        //lib.context.textAlign=i.properties.title.title_position;
                        lib.context.fill();
                        lib.context.stroke();


                    } else if (i.data.symbole.gome_type == "vline" || i.data.symbole.gome_type == "hline") {
                        radius = 3;
                        anticlockwise = false;
                        startAngle = 0;
                        endAngle = 360;
                        lib.context.strokeRect(x - 15, y - 25, width * i.data.feildobj.length + 10, height * i.data.feildobj.length + 10);
                        for (k = 0, len2 = i.data.feildobj.length; k < len2; k++) {
                            lib.context.beginPath();
                            //lib.context.strokeRect(x, (y+(width*k)), width,height );
                            lib.context.arc(x + 10, (y + (width * k)), radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, anticlockwise);
                            lib.context.moveTo(x, (y + (width * k)));
                            lib.context.lineTo(x + 20, (y + (width * k)));
                            lib.context.fillStyle = i.data.feildobj[k].value;
                            lib.context.fill();
                            lib.context.fillText(i.data.feildobj[k].name, x + width + 5, y + width * k + 7);
                            lib.context.lineWidth = i.symbole.line_weight;
                            lib.context.closePath();
                            lib.context.strokeStyle = i.data.feildobj[k].value;
                            lib.context.stroke();
                            results.push(lib.context);
                        }
                        lib.context.beginPath();
                        lib.context.fillStyle = i.properties.title.title_color;
                        lib.context.font = i.properties.title.title_font;
                        lib.context.fillText(i.properties.title.name, (x - 10), (y - 10));
                        lib.context.fill();
                        lib.context.stroke();


                    }
                } else if (i.data.type == "width") {
                    if (i.data.symbole.gome_type == "line" || i.data.symbole.gome_type == "Area") {
                        lib.context.strokeRect(x - 15, y - 25, i.properties.position.stroke_width, i.properties.position.stroke_height);
                        lib.context.beginPath();
                        lib.context.fillStyle = i.properties.title.title_color;
                        lib.context.font = i.properties.title.title_font;
                        //lib.context.textAlign=i.properties.title.title_position;
                        lib.context.fillText(i.properties.title.name, (x - 10), (y - 10));
                        lib.context.fill();
                        lib.context.stroke();
                        for (k = 0, len2 = i.data.feildobj.length; k < len2; k++) {
                            lib.context.beginPath();
                            lib.context.moveTo(x, y + (width * k));
                            lib.context.lineTo(x + i.data.symbole.line_lenght, (y + (width * k)));
                            //lib.context.fillStyle=i.data.feildobj[k].value;
                            lib.context.fill();
                            lib.context.fillText(i.data.feildobj[k].name, x + i.data.symbole.line_lenght + 5, y + width * k + 1);
                            lib.context.lineWidth = i.data.feildobj[k].value;
                            lib.context.closePath();
                            // lib.context.strokeStyle=i.data.feildobj[k].value;
                            lib.context.stroke();
                            results.push(lib.context);
                        }

                    } else if (i.data.symbole.gome_type == "StackedBar" || i.data.symbole.gome_type == "bar") {
                        lib.context.strokeRect(x - 15, y - 25, i.properties.position.stroke_width, i.properties.position.stroke_height);
                        lib.context.beginPath();
                        lib.context.fillStyle = i.properties.title.title_color;
                        lib.context.font = i.properties.title.title_font;
                        lib.context.fillText(i.properties.title.name, (x - 10), (y - 10));
                        lib.context.fill();
                        lib.context.stroke();
                        for (k = 0, len2 = i.data.feildobj.length; k < len2; k++) {
                            widths = i.data.feildobj[k].value;
                            lib.context.beginPath();
                            lib.context.rect(x, y + (width * k), widths, height);
                            //lib.context.fillStyle="white";
                            // lib.context.fill();
                            lib.context.lineWidth = 2;
                            //lib.context.fillText(i.data.feildobj[k].name,x+i.data.symbole.line_lenght+5,y+width*k+1);
                            lib.context.fillText(i.data.feildobj[k].name, x + width + 5, y + width * k + 7);
                            lib.context.closePath();
                            //lib.context.strokeStyle=i.data.feildobj[k].value;
                            lib.context.stroke();
                            results.push(lib.context);
                        }


                    } else if (i.data.symbole.gome_type == "diamond") {

                        lib.context.strokeRect(x - 15, y - 25, i.properties.position.stroke_width, i.properties.position.stroke_height);
                        lib.context.beginPath();
                        lib.context.fillStyle = i.properties.title.title_color;
                        lib.context.font = i.properties.title.title_font;
                        lib.context.fillText(i.properties.title.name, (x - 10), (y - 10));
                        lib.context.fill();
                        lib.context.stroke();
                        for (k = 0, len2 = i.data.feildobj.length; k < len2; k++) {
                            cursorx = i.data.feildobj[k].value;
                            cursory = i.data.feildobj[k].value;
                            lib.context.beginPath();
                            //lib.context.moveTo(x, (y+(width*k)));
                            lib.context.lineTo(x + cursorx, (y + (width * k)));
                            lib.context.lineTo(x, (y + (width * k)) + cursory);
                            lib.context.lineTo(x - cursorx, (y + (width * k)));
                            lib.context.lineTo(x, (y + (width * k)) - cursory);
                            //lib.context.fillStyle=i.data.feildobj[k].value;
                            //lib.context.fill();
                            lib.context.fillText(i.data.feildobj[k].name, x + cursory * 2 + 5, y + width * k + 1);
                            lib.context.lineWidth = i.data.symbole.line_weight;
                            lib.context.closePath();
                            // lib.context.strokeStyle=i.data.feildobj[k].value;
                            lib.context.stroke();
                            results.push(lib.context);
                        }


                    } else if (i.data.symbole.gome_type == "point") {

                        lib.context.strokeRect(x - 15, y - 25, i.properties.position.stroke_width, i.properties.position.stroke_height);
                        lib.context.beginPath();
                        lib.context.fillStyle = i.properties.title.title_color;
                        lib.context.font = i.properties.title.title_font;
                        lib.context.fillText(i.properties.title.name, (x - 10), (y - 10));
                        //lib.context.textAlign=i.properties.title.title_position;
                        lib.context.fill();
                        lib.context.closePath();
                        lib.context.stroke();
                        for (k = 0, len2 = i.data.feildobj.length; k < len2; k++) {
                            radius = i.data.feildobj[k].value;
                            anticlockwise = false;
                            startAngle = 0;
                            endAngle = 360;
                            lib.context.beginPath();
                            lib.context.arc(x, (y + (width * k)), radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, anticlockwise);
                            //lib.context.fillStyle=i.data.feildobj[k].value;
                            lib.context.fillText(i.data.feildobj[k].name, x + radius * 2, y + width * k + 1);
                            //lib.context.fill();
                            lib.context.closePath();
                            //lib.context.strokeStyle="white";
                            lib.context.stroke();
                            results.push(lib.context);
                        }
                    }

                }
            } else if (i.hasOwnProperty("shapes")) {
                lib.context.strokeRect(x - 15, y - 25, i.properties.position.stroke_width, i.properties.position.stroke_height);
                lib.context.beginPath();
                lib.context.fillStyle = i.properties.title.title_color;
                lib.context.font = i.properties.title.title_font;
                //lib.context.textAlign=i.properties.title.title_position;
                lib.context.fillText(i.properties.title.name, (x - 10), (y - 10));
                lib.context.fill();
                lib.context.closePath();
                lib.context.stroke();
                for (k = 0, len = i.shapes.length; k < len; k++) {
                    if (i.shapes[k].hasOwnProperty("width") && i.shapes[k].hasOwnProperty("height")) {
                        width = i.shapes[k].width;
                        height = i.shapes[k].height;
                    }
                    if (i.shapes[k].gome_type == "line" || i.shapes[k].gome_type == "Area") {
                        //lib.context.strokeRect(x-15,y-25,i.properties.position.stroke_width,i.properties.position.stroke_height);
                        lib.context.beginPath();
                        lib.context.moveTo(x, y + (width * k));
                        lib.context.lineTo(x + i.shapes[k].line_lenght, (y + (width * k)));
                        lib.context.fillText(i.shapes[k].name, x + i.shapes[k].line_lenght + 5, y + width * k + 1.5);
                        lib.context.fill();
                        lib.context.lineWidth = i.shapes[k].line_weight;
                        lib.context.closePath();
                        lib.context.strokeStyle = i.shapes[k].colour;
                        lib.context.stroke();

                    } else if (i.shapes[k].gome_type == "StackedBar" || i.shapes[k].gome_type == "bar") {
                        // widths=i.shapes[k].width;
                        //heights=i.shapes[k].height;
                        //lib.context.strokeRect(x-15,y-25,i.properties.position.stroke_width,i.properties.position.stroke_height);
                        lib.context.beginPath();
                        lib.context.rect(x - 10, y + (width * k), width, height);
                        lib.context.fillStyle = i.shapes[k].colour;
                        lib.context.fill();
                        lib.context.fillText(i.shapes[k].name, x + width + 5, y + width * k + 7);
                        lib.context.lineWidth = 2;
                        lib.context.closePath();
                        lib.context.strokeStyle = i.shapes[k].colour;
                        lib.context.stroke();


                    } else if (i.shapes[k].gome_type == "diamond") {
                        cursorx = 4;
                        cursory = 4;
//lib.context.strokeRect(x-15,y-25,i.properties.position.stroke_width,i.properties.position.stroke_height);

                        lib.context.beginPath();
                        //lib.context.moveTo(x, (y+(width*k)));
                        lib.context.lineTo(x + cursorx, (y + (width * k)));
                        lib.context.lineTo(x, (y + (width * k)) + cursory);
                        lib.context.lineTo(x - cursorx, (y + (width * k)));
                        lib.context.lineTo(x, (y + (width * k)) - cursory);
                        lib.context.fillStyle = i.shapes[k].colour;
                        lib.context.fill();
                        lib.context.fillText(i.shapes[k].name, x + width + 3, y + width * k + 1);
                        lib.context.lineWidth = i.shapes[k].line_weight;
                        lib.context.closePath();
                        lib.context.strokeStyle = i.shapes[k].colour;
                        lib.context.stroke();


                    } else if (i.shapes[k].gome_type == "point") {
                        radius = i.shapes[k].radius;
                        anticlockwise = false;
                        startAngle = 0;
                        endAngle = 360;
                        //lib.context.strokeRect(x-15,y-25,i.properties.position.stroke_width,i.properties.position.stroke_height);
                        lib.context.beginPath();
                        lib.context.arc(x, (y + (radius * 2 * k)), radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, anticlockwise);
                        lib.context.fillStyle = i.shapes[k].colour;
                        lib.context.fill();
                        lib.context.fillText(i.shapes[k].name, x + radius * 2 + 5, y + radius * 2 * k + 1);
                        lib.context.closePath();
                        lib.context.strokeStyle = i.shapes[k].colour;
                        lib.context.stroke();


                    }
                }
            }

        }
        if (i.type_guide == "text") {
            var x, y;
            x = i.X;
            y = i.Y;
            lib.context.beginPath();
            lib.context.fillStyle = i.colour;
            lib.context.font = i.font;
            //lib.context.textAlign=i.properties.title.title_position;
            lib.context.fillText(i.label, x, y);
            lib.context.fill();
            lib.context.stroke();


        }


    }

    return results;
};
Axes = (function (superClass) {
    extend(Axes, superClass);

    function Axes() {
        return Axes.__super__.constructor.apply(this, arguments);
    }

    return Axes;

})(Canvas_Geometry);
Axes.prototype.draw = function (obj) {
    var length, currentX, currentY, grid, i, j, l, len, orientation, results, vals, Ylength, Length1;
    //;

    Length1 = Math.round((lib.GoG_JSON["width"] - 2 * lib.GoG_JSON["margin"]) / (obj.length - 2));
    Ylength = 0;
    results = [];
    Yobject = [];
    if (obj[obj.length - 1] == "coord_cartesian" || obj[obj.length - 1] == "coord_parallel") {
        if (lib.GoG_JSON.hasOwnProperty("facets")) {

            var length, width, height;
            if (lib.GoG_JSON["facets"].hasOwnProperty("x_axis")) {
                length = lib.GoG_JSON["facets"].x_axis.length;
                width = (lib.GoG_JSON["width"] - (2 * lib.GoG_JSON["margin"])) / length;
            } else {
                width = lib.GoG_JSON["width"] - 2 * lib.GoG_JSON["margin"];
            }
            if (lib.GoG_JSON["facets"].hasOwnProperty("y_axis")) {
                length = lib.GoG_JSON["facets"].y_axis.length;
                height = (lib.GoG_JSON["height"] - 2 * lib.GoG_JSON["margin"]) / length;
            } else {
                height = lib.GoG_JSON["height"] - (2 * lib.GoG_JSON["margin"]);
            }
            lib.GoG_JSON["facets"].width = width;
            lib.GoG_JSON["facets"].height = height;
            var temp;
            //if(obj[k].type==="x"){
            if (!(lib.GoG_JSON["facets"].hasOwnProperty("y_axis")) && lib.GoG_JSON["facets"].hasOwnProperty("x_axis")) {
                lib.context.beginPath();
                lib.context.moveTo(lib.GoG_JSON["margin"], lib.GoG_JSON["margin"]);
                lib.context.lineTo(lib.GoG_JSON["margin"], lib.GoG_JSON["height"] - lib.GoG_JSON["margin"]);
                lib.context.stroke();
                var yGrid = lib.GoG_JSON["margin"];
                var axeslength = lib.GoG_JSON["height"] - (2 * lib.GoG_JSON["margin"]);
                //to get y and x  object from the axis array
                for (var n = 0; n < obj.length - 1; n++) {
                    if (obj[n].type === "y") {
                        Yobject = obj[n];
                    } else if (obj[n].type === "x") {
                        Xobject = obj[n];
                    }
                }
                vals = Yobject.values.length;
                lib.context.font = "10px Arial";
                for (var s = 0; s <= Yobject.values.length; s++) {
                    currentY = lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - (axeslength / vals) * s;
                    //currentX = (obj[k].margin + (width / vals) * s )+i*width;
                    lib.context.fillText((Yobject.min + ((Yobject.max - Yobject.min) / (Yobject.values.length)) * s).toFixed(1), lib.GoG_JSON["margin"] / 2, currentY);
                }
                lib.context.stroke();
                var f = lib.GoG_JSON.facets.fieldX;
                for (var i = 0; i < lib.GoG_JSON["facets"].x_axis.length; i++) {
                    lib.context.beginPath();
                    lib.context.strokeStyle = "#000000";
                    lib.context.moveTo(lib.GoG_JSON["margin"] + i * width, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"]);
                    lib.context.lineTo((width + lib.GoG_JSON["margin"] + i * width) - lib.GoG_JSON["facets"].margin, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"]);
                    lib.context.stroke();
                    lib.context.fillStyle = Xobject.text.colour;
                    lib.context.font = Xobject.text.font;
                    //lib.context.strokeRect((lib.GoG_JSON["margin"]*2+i*lib.GoG_JSON["facets"].width)-60,lib.GoG_JSON["margin"]-50,lib.GoG_JSON["facets"].width-lib.GoG_JSON["facets"].margin, lib.GoG_JSON["margin"]/2);
                    //lib.context.fillText(lib.GoG_JSON["facets"].x_axis[i][i][f],lib.GoG_JSON["margin"]*2+i*lib.GoG_JSON["facets"].width,lib.GoG_JSON["margin"]/2);
                    lib.context.beginPath();
                    lib.context.rect(lib.GoG_JSON["margin"] + i * width, yGrid, width - lib.GoG_JSON["facets"].margin, lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - yGrid);
                    lib.context.fillStyle = "#C0C0C0";
                    lib.context.fill();
                    vals = Xobject.values.length;
                    lib.context.font = "10px Arial";
                    for (var s = 0; s <= Xobject.values.length; s++) {
                        currentX = (Xobject.margin + ((width - lib.GoG_JSON["facets"].margin) / vals) * s) + i * width;
                        lib.context.fillText((Xobject.min + ((Xobject.max - Xobject.min) / (Xobject.values.length)) * s).toFixed(1), currentX, (Xobject.height - Xobject.margin) + 1 / 4 * Xobject.margin);
                        //X grid
                        lib.context.beginPath();
                        lib.context.moveTo(currentX, yGrid);
                        lib.context.lineTo(currentX, Xobject.height - Xobject.margin);
                        lib.context.strokeStyle = "#ffffff";
                        lib.context.stroke();
                    }
                    lib.context.stroke();
                    //y grid
                    vals = Yobject.values.length;
                    for (var s = 0; s < Yobject.values.length; s++) {
                        currentY = lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - (axeslength / vals) * s;
                        //currentX = (obj[k].margin + (width / vals) * s )+i*width;
                        //lib.context.fillText((obj[k].min + ((obj[k].max - obj[k].min) / (obj[k].values.length - 1)) * s).toFixed(1),lib.GoG_JSON["margin"]/2,currentY);
                        lib.context.beginPath();
                        lib.context.moveTo(lib.GoG_JSON["margin"] + i * width, currentY);
                        lib.context.lineTo((width + lib.GoG_JSON["margin"] + i * width) - lib.GoG_JSON["facets"].margin, currentY);
                        lib.context.strokeStyle = "#ffffff";
                        lib.context.stroke();
                    }
                    lib.context.stroke();

                }
            } else if ((lib.GoG_JSON["facets"].hasOwnProperty("y_axis")) && !(lib.GoG_JSON["facets"].hasOwnProperty("x_axis"))) {
                if (obj[obj.length - 1] == "coord_parallel") {
                    lib.context.beginPath();
                    // lib.context.moveTo(lib.GoG_JSON["margin"], lib.GoG_JSON["height"]- lib.GoG_JSON["margin"]);
                    //lib.context.lineTo(lib.GoG_JSON["width"]-lib.GoG_JSON["margin"], lib.GoG_JSON["height"]- lib.GoG_JSON["margin"]);
                    // lib.context.stroke();
                    //var xGrid=lib.GoG_JSON["margin"];
                    var axeslength = lib.GoG_JSON["width"] - (2 * lib.GoG_JSON["margin"]);
                    //to get y and x  object from the axis array
                    for (var n = 0; n < obj.length - 1; n++) {
                        if (obj[n].type === "y") {
                            Yobject.push(obj[n]);
                        }
                    }

                    lib.context.stroke();
                    var field = lib.GoG_JSON.facets.fieldY;

                    for (var i = 0; i < lib.GoG_JSON["facets"].y_axis.length; i++) {
                        Ylength = 0;

                        for (var k = 0; k < Yobject.length; k++) {
                            lib.context.beginPath();
                            //lib.context.strokeStyle = "#000000";
                            lib.context.moveTo(lib.GoG_JSON["margin"] + Ylength, ((lib.GoG_JSON["height"] - lib.GoG_JSON["margin"])) - i * height);//250
                            lib.context.lineTo(lib.GoG_JSON["margin"] + Ylength, ((lib.GoG_JSON["height"] - lib.GoG_JSON["margin"])) - height + lib.GoG_JSON["facets"].margin - i * (height));
                            lib.context.stroke();
                            lib.context.fillStyle = Yobject[k].text.colour;
                            lib.context.font = Yobject[k].text.font;
                            //lib.context.strokeRect((lib.GoG_JSON["margin"]*2+lib.GoG_JSON["facets"].width)-50,((lib.GoG_JSON["height"]- lib.GoG_JSON["margin"]*2)-i*height)-40,lib.GoG_JSON["margin"]*1.5,lib.GoG_JSON["facets"].height-lib.GoG_JSON["facets"].margin);
                            //lib.context.fillText(lib.GoG_JSON["facets"].y_axis[i][i][field],lib.GoG_JSON["margin"]*2+lib.GoG_JSON["facets"].width,(lib.GoG_JSON["height"]- lib.GoG_JSON["margin"]*2)-i*height);
                            //lib.context.beginPath();
                            //lib.context.rect(xGrid,((lib.GoG_JSON["height"]- lib.GoG_JSON["margin"]))-height +lib.GoG_JSON["facets"].margin -i*(height),width,height-lib.GoG_JSON["facets"].margin);
                            //lib.context.fillStyle="#C0C0C0";
                            //lib.context.fill();
                            var length;
                            if (Yobject[k].values.length > 10) {
                                length = 10;
                            } else {
                                length = Yobject[k].values.length;
                            }
                            vals = length;
                            for (var s = 0; s <= length; s++) {
                                currentY = lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - ((height - lib.GoG_JSON["facets"].margin) / vals) * s;
                                lib.context.fillStyle = Yobject[k].text.colour;
                                lib.context.font = Yobject[k].text.font;
                                lib.context.fillText((Yobject[k].min + ((Yobject[k].max - Yobject[k].min) / (length)) * s).toFixed(1), lib.GoG_JSON["margin"] / 2 + Ylength, currentY - i * height);
                                //X grid k
                                // lib.context.strokeStyle = "#ffffff";
                                //lib.context.stroke();
                            }

                            Ylength += Length1;


                        }


                    }
                } else {
                    lib.context.beginPath();
                    lib.context.moveTo(lib.GoG_JSON["margin"], lib.GoG_JSON["height"] - lib.GoG_JSON["margin"]);
                    lib.context.lineTo(lib.GoG_JSON["width"] - lib.GoG_JSON["margin"], lib.GoG_JSON["height"] - lib.GoG_JSON["margin"]);
                    lib.context.stroke();
                    var xGrid = lib.GoG_JSON["margin"];
                    var axeslength = lib.GoG_JSON["width"] - (2 * lib.GoG_JSON["margin"]);
                    //to get y and x  object from the axis array
                    for (var n = 0; n < obj.length - 1; n++) {
                        if (obj[n].type === "y") {
                            Yobject = obj[n];
                        } else if (obj[n].type === "x") {
                            Xobject = obj[n];
                        }
                    }
                    vals = Xobject.values.length;
                    for (var s = 0; s <= Xobject.values.length; s++) {
                        currentX = lib.GoG_JSON["margin"] + (axeslength / vals) * s;
                        lib.context.fillText((Xobject.min + ((Xobject.max - Xobject.min) / (Xobject.values.length)) * s).toFixed(1), currentX - 3, (lib.GoG_JSON["height"] - lib.GoG_JSON["margin"]) + lib.GoG_JSON["margin"] / 2);
                    }
                    lib.context.stroke();
                    var field = lib.GoG_JSON.facets.fieldY;
                    for (var i = 0; i < lib.GoG_JSON["facets"].y_axis.length; i++) {
                        lib.context.beginPath();
                        lib.context.strokeStyle = "#000000";
                        lib.context.moveTo(lib.GoG_JSON["margin"], ((lib.GoG_JSON["height"] - lib.GoG_JSON["margin"])) - i * height);//250
                        lib.context.lineTo(lib.GoG_JSON["margin"], ((lib.GoG_JSON["height"] - lib.GoG_JSON["margin"])) - height + lib.GoG_JSON["facets"].margin - i * (height));
                        lib.context.stroke();
                        lib.context.fillStyle = Yobject.text.colour;
                        lib.context.font = Yobject.text.font;
                        //lib.context.strokeRect((lib.GoG_JSON["margin"]*2+lib.GoG_JSON["facets"].width)-50,((lib.GoG_JSON["height"]- lib.GoG_JSON["margin"]*2)-i*height)-40,lib.GoG_JSON["margin"]*1.5,lib.GoG_JSON["facets"].height-lib.GoG_JSON["facets"].margin);
                        //lib.context.fillText(lib.GoG_JSON["facets"].y_axis[i][i][field],lib.GoG_JSON["margin"]*2+lib.GoG_JSON["facets"].width,(lib.GoG_JSON["height"]- lib.GoG_JSON["margin"]*2)-i*height);
                        lib.context.beginPath();
                        lib.context.rect(xGrid, ((lib.GoG_JSON["height"] - lib.GoG_JSON["margin"])) - height + lib.GoG_JSON["facets"].margin - i * (height), width, height - lib.GoG_JSON["facets"].margin);
                        lib.context.fillStyle = "#C0C0C0";
                        lib.context.fill();
                        vals = Yobject.values.length;
                        for (var s = 0; s <= Yobject.values.length; s++) {
                            currentY = lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - ((height - lib.GoG_JSON["facets"].margin) / vals) * s;
                            lib.context.fillText((Yobject.min + ((Yobject.max - Yobject.min) / (Yobject.values.length)) * s).toFixed(1), lib.GoG_JSON["margin"] / 2, currentY - i * height);
                            //X grid
                            lib.context.beginPath();
                            lib.context.moveTo(lib.GoG_JSON["margin"], currentY - i * height);
                            lib.context.lineTo(lib.GoG_JSON["width"] - lib.GoG_JSON["margin"], currentY - i * height);
                            lib.context.strokeStyle = "#ffffff";
                            lib.context.stroke();
                        }
                        lib.context.stroke();

                        //y grid
                        vals = Xobject.values.length;
                        for (var s = 0; s < Xobject.values.length; s++) {
                            currentX = lib.GoG_JSON["margin"] + (axeslength / vals) * s;
                            lib.context.beginPath();
                            lib.context.moveTo(currentX, ((lib.GoG_JSON["height"] - lib.GoG_JSON["margin"])) - i * height);
                            lib.context.lineTo(currentX, ((lib.GoG_JSON["height"] - lib.GoG_JSON["margin"])) - height + lib.GoG_JSON["facets"].margin - i * (height));
                            lib.context.strokeStyle = "#ffffff";
                            lib.context.stroke();
                        }
                        lib.context.stroke();

                    }
                }

            } else {
                var field = lib.GoG_JSON.facets.fieldY;
                var f = lib.GoG_JSON.facets.fieldX;
                var Xlenth = lib.GoG_JSON["facets"].x_axis.length;
                var Ylenth = lib.GoG_JSON["facets"].y_axis.length;
                var yGrid = lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - height;
                for (var n = 0; n < obj.length - 1; n++) {
                    if (obj[n].type === "y") {
                        Yobject = obj[n];
                    } else if (obj[n].type === "x") {
                        Xobject = obj[n];
                    }
                }
                // vals = Xobject.values.length - 1;
                for (var y = 0; y < Ylenth; y++) {
                    yGrid = lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - height;
                    lib.context.strokeStyle = 'blue';
                    lib.context.fillStyle = "lightgray";
                    lib.context.strokeRect(lib.GoG_JSON["margin"] + lib.GoG_JSON["facets"].width * (Xlenth) - 20, ((lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] * 2) - y * height) - 100, lib.GoG_JSON["margin"], lib.GoG_JSON["facets"].height - lib.GoG_JSON["facets"].margin);
                    lib.context.fillStyle = 'blue';
                    lib.context.fillText(lib.GoG_JSON["facets"].y_axis[y][y][field], lib.GoG_JSON["margin"] + lib.GoG_JSON["facets"].width * (Xlenth), (lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] * 2) - y * height);
                    for (var i = 0; i < Xlenth; i++) {
                        lib.context.beginPath();
                        lib.context.strokeStyle = "#000000";
                        lib.context.moveTo(lib.GoG_JSON["margin"] + i * width, ((lib.GoG_JSON["height"] - lib.GoG_JSON["margin"])) - y * height);
                        lib.context.lineTo((width + lib.GoG_JSON["margin"] + i * width) - lib.GoG_JSON["facets"].margin, ((lib.GoG_JSON["height"] - lib.GoG_JSON["margin"])) - y * height);
                        lib.context.stroke();
                        lib.context.fillStyle = Xobject.text.colour;
                        lib.context.font = Xobject.text.font;
                        lib.context.strokeRect((lib.GoG_JSON["margin"] * 2 + i * lib.GoG_JSON["facets"].width) - 60, lib.GoG_JSON["margin"] - 50, lib.GoG_JSON["facets"].width - lib.GoG_JSON["facets"].margin, lib.GoG_JSON["margin"] / 2);
                        lib.context.fillText(lib.GoG_JSON["facets"].x_axis[i][i][f], lib.GoG_JSON["margin"] * 2 + i * lib.GoG_JSON["facets"].width, lib.GoG_JSON["margin"] / 2);
                        lib.context.beginPath();
                        lib.context.rect(lib.GoG_JSON["margin"] + i * width, ((lib.GoG_JSON["height"] - lib.GoG_JSON["margin"])) - height + lib.GoG_JSON["facets"].margin - y * (height), width - lib.GoG_JSON["facets"].margin, height - lib.GoG_JSON["facets"].margin);
                        lib.context.fillStyle = "#C0C0C0";
                        lib.context.fill();
                        vals = Xobject.values.length;
                        for (var s = 0; s <= Xobject.values.length; s++) {
                            currentX = (Xobject.margin + ((width - lib.GoG_JSON["facets"].margin) / (Xobject.values.length)) * s) + i * width;
                            lib.context.fillText((Xobject.min + ((Xobject.max - Xobject.min) / (Xobject.values.length)) * s).toFixed(1), currentX, (Xobject.height - Xobject.margin) + 1 / 4 * Xobject.margin);
                            //X grid
                            lib.context.beginPath();
                            lib.context.moveTo(currentX, ((lib.GoG_JSON["height"] - lib.GoG_JSON["margin"])) - y * height);
                            lib.context.lineTo(currentX, ((lib.GoG_JSON["height"] - lib.GoG_JSON["margin"])) - height + lib.GoG_JSON["facets"].margin - y * (height));
                            lib.context.strokeStyle = "#ffffff";
                            lib.context.stroke();
                        }
                        lib.context.stroke();
                        //y grid
                        vals = Yobject.values.length;
                        for (var s = 0; s <= Yobject.values.length; s++) {
                            currentY = lib.GoG_JSON["height"] - lib.GoG_JSON["margin"] - ((height - lib.GoG_JSON["facets"].margin) / (Yobject.values.length)) * s;
                            //currentX = (obj[k].margin + (width / vals) * s )+i*width;
                            //lib.context.fillText((obj[k].min + ((obj[k].max - obj[k].min) / (obj[k].values.length - 1)) * s).toFixed(1),lib.GoG_JSON["margin"]/2,currentY);
                            //currentY =lib.GoG_JSON["height"]-lib.GoG_JSON["margin"] - (height / vals)*s;
                            if (i == 0) {
                                lib.context.fillText((Yobject.min + ((Yobject.max - Yobject.min) / (Yobject.values.length)) * s).toFixed(1), lib.GoG_JSON["margin"] / 2, currentY - y * height);
                            }            //X grid
                            lib.context.beginPath();
                            lib.context.beginPath();
                            lib.context.moveTo(lib.GoG_JSON["margin"] + i * width, currentY - y * height);
                            lib.context.lineTo((width + lib.GoG_JSON["margin"] + i * width) - lib.GoG_JSON["facets"].margin, currentY - y * height);
                            lib.context.strokeStyle = "#ffffff";
                            lib.context.stroke();
                        }
                        lib.context.stroke();

                    }
                }

            }


            Ylength = Length1;
            for (var n = 0; n < obj.length - 1; n++) {
                //lib.context.beginPath();
                //lib.context.strokeStyle = "#ffffff";
                //lib.context.stroke();
                if (obj[n].type === "y") {
                    if (obj[n].hasOwnProperty("annotation") && obj[n].annotation.hasOwnProperty("title")) {
                        if ((obj[n].annotation.position == "") || !(obj[n].annotation.hasOwnProperty("position"))) {
                            obj[n].annotation.position = "edge";
                        }
                        if (obj[n].annotation.position == "edge") {
                            //lib.context.beginPath();
                            lib.context.fillStyle = obj[n].annotation.colour;
                            lib.context.font = obj[n].annotation.font;
                            lib.context.fillText(obj[n].annotation.title, obj[n].margin + Ylength * n - 10, (obj[n].height - 7.2 * obj[n].margin));
                            lib.context.fill();
                        } else if (obj[n].annotation.position == "middle") {

                            lib.context.fillStyle = obj[n].annotation.colour;
                            lib.context.font = obj[n].annotation.font;
                            lib.context.fillText(obj[n].annotation.title, obj[n].margin + Ylength - 50, (obj[n].height - 3 * obj[n].margin));
                        }
                    }
                } else if (obj[n].type === "x") {
                    if (obj[n].hasOwnProperty("annotation") && obj[n].annotation.hasOwnProperty("title")) {
                        if ((obj[n].annotation.position == "") || !(obj[n].annotation.hasOwnProperty("position"))) {
                            obj[n].annotation.position = "edge";
                        }
                        if (obj[n].annotation.position == "edge") {
                            lib.context.fillStyle = obj[n].annotation.colour;
                            lib.context.font = obj[n].annotation.font;
                            lib.context.fillText((obj[n].annotation.title), ((obj[n].width - obj[n].margin) + 30), (obj[n].height - obj[n].margin) + obj[n].margin / 15);

                        } else if (obj[n].annotation.position == "middle") {
                            lib.context.fillStyle = obj[n].annotation.colour;
                            lib.context.font = obj[n].annotation.font;
                            lib.context.fillText(obj[n].annotation.title, ((obj[n].width - obj[n].margin) + 30) / 2, (obj[n].height - obj[n].margin) + obj[n].margin / 1.4);
                        }
                    }

                }
            }
        } else {
            for (l = 0, len = obj.length; l < len; l++) {
                i = obj[l];
                grid = i.grid === null || i.grid === void 0 ? false : i.grid;
                if (i.type === "x") {
                    orientation = i.orientation === null || i.orientation === void 0 ? "bottom" : i.orientation;
                } else {
                    orientation = i.orientation === null || i.orientation === void 0 ? "left" : i.orientation;
                }
                lib.context.beginPath();
                if (i.type === "x") {
                    lib.context.strokeStyle = "#000000";
                    if (i.orientation === "top") {
                        lib.context.moveTo(i.margin, i.margin);
                        lib.context.lineTo(i.width - i.margin, i.margin);
                    } else {
                        lib.context.moveTo(i.margin, i.height - i.margin);
                        lib.context.lineTo(i.width - i.margin, i.height - i.margin);
                    }
                    lib.context.stroke();
                    lib.context.strokeStyle = "rgba(128, 128, 255, 0.5)";
                    j = 0;
                    ref = lib.GoG_JSON[i.data];
                    while (j < i.values.length && j <= 20) {
                        vals = i.values.length - 1;
                        axeslength = i.width - (2 * i.margin);
                        currentX = i.margin + (axeslength / vals) * j;

                        if (i.grid === true) {
                            lib.context.moveTo(currentX, i.margin);
                            lib.context.lineTo(currentX, i.height - i.margin);
                            lib.context.stroke();
                        }
                        if (i.hasOwnProperty("grade")) {
                            var field = i.field;
                            lib.context.fillText(lib.GoG_JSON[i.data][j][field], currentX - 3, (i.height - i.margin) + i.margin / 2);
                        } else {
                            if (j == 0) {
                                global_currentX = (((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2);
                            }
                            //lib.context.beginPath();

                            if (i.orientation === "top") {
                                if (i.hasOwnProperty("text")) {
                                    lib.context.beginPath();

                                    lib.context.fillStyle = i.text.colour;
                                    lib.context.font = i.text.font;
                                }
                                lib.context.fillText((i.min + ((i.max - i.min) / (i.values.length - 1)) * j).toFixed(2), currentX - 3, i.margin / 2);
                            } else {
                                if (i.hasOwnProperty("text")) {
                                    lib.context.beginPath();
                                    if (ref[j][i.text.colour] == null) {
                                        lib.context.fillStyle = i.text.colour;
                                    } else {
                                        lib.context.fillStyle = ref[j][i.text.colour];
                                    }
                                    if (ref[j][i.text.font] == null) {
                                        lib.context.fillStyle = i.text.font;
                                    } else {
                                        var d = lib.context.font = ref[j][i.text.font] + "px comic sans MS";
                                    }

                                    //lib.context.font=i.text.font;
                                }
                                lib.context.fillText((i.min + ((i.max - i.min) / (i.values.length - 1)) * j).toFixed(2), currentX - 3, (i.height - i.margin) + i.margin / 2);
                            }
                        }
                        j++;
                    }
                    if (i.hasOwnProperty("annotation") && i.annotation.hasOwnProperty("title")) {
                        if ((i.annotation.position == "") || !(i.annotation.hasOwnProperty("position"))) {
                            i.annotation.position = "edge";
                        }
                        if (i.annotation.position == "edge") {
                            lib.context.fillStyle = i.annotation.colour;
                            lib.context.font = i.annotation.font;
                            lib.context.fillText((i.annotation.title), ((i.width - i.margin) + 30), (i.height - i.margin) + i.margin / 15);

                        } else if (i.annotation.position == "middle") {
                            lib.context.fillStyle = i.annotation.colour;
                            lib.context.font = i.annotation.font;
                            lib.context.fillText(i.annotation.title, ((i.width - i.margin) + 30) / 2, (i.height - i.margin) + i.margin / 1.4);
                        }
                    }
                    lib.context.stroke();
                    lib.context.strokeStyle = "#000000";

                }
                lib.context.beginPath();
                if (i.type === "y") {
                    if (i.orientation === "right") {
                        lib.context.moveTo((i.width - i.margin) + Ylength, i.margin);
                        lib.context.lineTo((i.width - i.margin) + Ylength, i.height - i.margin);
                    } else {
                        lib.context.moveTo(i.margin + Ylength, i.margin);
                        lib.context.lineTo(i.margin + Ylength, i.height - i.margin);
                    }
                    //lib.context.beginPath();
                    lib.context.stroke();
                    lib.context.strokeStyle = "rgba(128, 128, 255, 0.5)";
                    j = 0;
                    var length;
                    if (i.values.length > 20) {
                        length = 20;
                    } else {
                        length = i.values.length;
                    }
                    while (j < length && j <= 20) {
                        vals = length;
                        axeslength = i.height - (2 * i.margin);
                        currentY = i.margin + (axeslength / vals) * j;
                        if (i.grid === true) {
                            lib.context.moveTo((i.width - i.margin) + Ylength, currentY);
                            lib.context.lineTo(i.margin + Ylength, currentY);
                        }
                        if (i.hasOwnProperty("grade")) {
                            var field = i.field;
                            lib.context.fillText(lib.GoG_JSON[i.data][j][field], 10 + Ylength, currentY + 4);
                        } else {
                            if (j == i.values.length) {
                                global_currentY = (i.min + ((i.max - i.min) / length) * (length - j)).toFixed(2);
                            } else if (j == 0) {
                                global_startY = (i.min + ((i.max - i.min) / length) * (length - j)).toFixed(2);
                            }

                            //lib.context.beginPath();
                            if (i.orientation === "right") {
                                if (i.hasOwnProperty("text")) {
                                    lib.context.fillStyle = i.text.colour;
                                    lib.context.font = i.text.font;
                                }
                                lib.context.fillText((i.min + ((i.max - i.min) / length) * (length - j)).toFixed(2), (10 + i.width - i.margin) + Ylength, currentY + 4);
                            } else {
                                if (i.hasOwnProperty("text")) {
                                    lib.context.fillStyle = i.text.colour;
                                    lib.context.font = i.text.font;
                                }
                                lib.context.fillText((i.min + ((i.max - i.min) / length) * (length - j)).toFixed(2), 10 + Ylength, currentY + 4);

                            }
                        }
                        j++;
                    }
                    if (i.hasOwnProperty("annotation") && i.annotation.hasOwnProperty("title")) {
                        if ((i.annotation.position == "") || !(i.annotation.hasOwnProperty("position"))) {
                            i.annotation.position = "edge";
                        }
                        if (i.annotation.position == "edge") {

                            lib.context.fillStyle = i.annotation.colour;
                            lib.context.font = i.annotation.font;
                            lib.context.fillText(i.annotation.title, i.margin + Ylength - 10, (i.height - 7.7 * i.margin));
                        } else if (i.annotation.position == "middle") {

                            lib.context.fillStyle = i.annotation.colour;
                            lib.context.font = i.annotation.font;
                            lib.context.fillText(i.annotation.title, i.margin - 50, (i.height - 4 * i.margin));
                        }
                    }
                    lib.context.stroke();
                    results.push(lib.context.strokeStyle = "#000000");
                    Ylength += Length1;
                } else {
                    results.push(void 0);
                }
            }
        }

        return results;
    } else if (obj[obj.length - 1] == "coord_transformation") {/*shorouk task*/
        for (l = 0, len = obj.length; l < len; l++) {
            i = obj[l];
            grid = i.grid === null || i.grid === void 0 ? false : i.grid;
            if (i.type === "x") {
                orientation = i.orientation === null || i.orientation === void 0 ? "bottom" : i.orientation;
            } else {
                orientation = i.orientation === null || i.orientation === void 0 ? "left" : i.orientation;
            }
            lib.context.beginPath();
            if (i.type === "x") {

                lib.context.strokeStyle = "#000000";
                if (i.orientation === "top") {
                    lib.context.moveTo(i.margin, i.margin);
                    lib.context.lineTo(i.width - i.margin, i.margin);
                } else {
                    lib.context.moveTo(i.margin, i.height - i.margin);
                    lib.context.lineTo(i.width - i.margin, i.height - i.margin);
                }
                lib.context.stroke();
                lib.context.strokeStyle = "rgba(128, 128, 255, 0.5)";

                j = 0;
                while (j < i.values.length) {
                    vals = i.values.length - 1;
                    axeslength = i.width - (2 * i.margin);
                    currentX = i.margin + i.power[j] * j;

                    if (i.grid === true) {
                        lib.context.moveTo(currentX, i.margin);
                        lib.context.lineTo(currentX, i.height - i.margin);
                    }
                    if (i.hasOwnProperty("grade")) {
                        var field = i.field;
                        lib.context.fillText(lib.GoG_JSON[i.data][j][field], currentX - 3, (i.height - i.margin) + i.margin / 2);
                    } else {
                        if (j == 0) {
                            global_currentX = (((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2);
                        }
                        if (i.orientation === "top") {
                            lib.context.fillText((i.min + ((i.max - i.min) / (i.values.length - 1)) * j).toFixed(2), currentX - 3, i.margin / 2);
                        } else {
                            lib.context.fillText((i.min + ((i.max - i.min) / (i.values.length - 1)) * j).toFixed(2), currentX - 3, (i.height - i.margin) + i.margin / 2);

                        }
                    }
                    j++;
                }
                //lib.context.fillText((i.type),(i.width - i.margin)+30, (i.height - i.margin) + i.margin /13);
                lib.context.fillText((i.type), ((i.width - i.margin) + 30), (i.height - i.margin) + i.margin / 12);
                lib.context.fillText(("shorouk"), ((i.width - i.margin) + 30) / 2, (i.height - i.margin) + i.margin / 1.5);
                lib.context.stroke();
                lib.context.strokeStyle = "#000000";
            }
            if (i.type === "y") {
                if (i.orientation === "right") {
                    lib.context.moveTo(i.width - i.margin, i.margin);
                    lib.context.lineTo(i.width - i.margin, i.height - i.margin);
                } else {
                    lib.context.moveTo(i.margin, i.margin);
                    lib.context.lineTo(i.margin, i.height - i.margin);
                }
                lib.context.stroke();
                lib.context.strokeStyle = "rgba(128, 128, 255, 0.5)";
                j = 0;
                while (j <= i.values.length) {
                    vals = i.values.length;
                    axeslength = i.height - (2 * i.margin);
                    currentY = i.margin + i.power[j] * j;
                    if (i.grid === true) {
                        lib.context.moveTo(i.width - i.margin, currentY);
                        lib.context.lineTo(i.margin, currentY);
                    }
                    if (i.hasOwnProperty("grade")) {
                        var field = i.field;
                        lib.context.fillText(lib.GoG_JSON[i.data][j][field], 10, currentY + 4);
                    } else {
                        if (j == i.values.length) {
                            global_currentY = (i.min + ((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2);
                        } else if (j == 0) {
                            global_startY = (i.min + ((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2);
                        }
                        if (i.orientation === "right") {

                            lib.context.fillText((i.min + ((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2), 10 + i.width - i.margin, currentY + 4);
                        } else {
                            lib.context.fillText((i.min + ((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2), 10, currentY + 4);
                        }
                    }
                    j++;
                }
                lib.context.fillText(i.type, i.margin, (i.height - 7.7 * i.margin));

                lib.context.stroke();
                results.push(lib.context.strokeStyle = "#000000");


            }

        }

    } else if (obj[obj.length - 1] == "coord_polar") {      /*sara and alaa task*/
        var startPointx = lib.GoG_JSON["width"] / 2;
        var startPointy = lib.GoG_JSON["height"] / 2;
        lib.context.translate(startPointx, startPointy);
        var radius;
        for (l = 0, len = obj.length - 1; l < len; l++) {
            i = obj[l];
            if (i.type === "angle") {
                var check;
                if (i.hasOwnProperty("radius")) {
                    radius = i.radius;
                } else {
                    radius = (i.height - (2 * i.margin)) / 2;
                }
                if (i.clockwise == true) {
                    check = 1;
                } else {
                    check = -1;
                }
                lib.context.beginPath();
                lib.context.arc(0, 0, radius, 0, Math.PI * 2, true);
                lib.context.strokeStyle = i.coord_color;
                lib.context.stroke();
                if (i.grid === true) {
                    for (var k = 0; k < i.angle.length; k++) {
                        lib.context.beginPath();
                        // lib.context.strokeStyle="black";
                        lib.context.moveTo(0, 0);
                        lib.context.lineTo(radius * Math.cos(Math.PI * check * i.angle[k] / 180.0), radius * Math.sin(Math.PI * check * i.angle[k] / 180.0));
                        lib.context.fillStyle = i.font_color;
                        if (i.angle[k] <= 90) {
                            lib.context.fillText(i.field[k], radius * Math.cos(Math.PI * check * i.angle[k] / 180.0) + .05 * radius, radius * Math.sin(Math.PI * check * i.angle[k] / 180.0));
                        } else if (i.angle[k] > 90 && i.angle[k] <= 270) {
                            lib.context.fillText(i.field[k], radius * Math.cos(Math.PI * check * i.angle[k] / 180.0) - .18 * radius, radius * Math.sin(Math.PI * check * i.angle[k] / 180.0));
                        } else {
                            lib.context.fillText(i.field[k], radius * Math.cos(Math.PI * check * i.angle[k] / 180.0), radius * Math.sin(Math.PI * check * i.angle[k] / 180.0) + .15 * radius);
                        }
                        lib.context.stroke();
                    }
                } else {
                    for (var k = 0; k < i.angle.length; k++) {
                        lib.context.beginPath();
                        lib.context.fillStyle = "blue";
                        lib.context.fillText(i.field[k], radius * Math.cos(Math.PI * check * i.angle[k] / 180.0) - .25 * radius, radius * Math.sin(Math.PI * check * i.angle[k] / 180.0) + .25 * radius);
                        lib.context.stroke();
                    }

                }
            } else if (i.type === "radius") {
                if (i.hasOwnProperty("position")) {
                    lib.context.beginPath();
                    lib.context.moveTo(-(1 / 8 * radius + radius + i.position), 0);
                    lib.context.lineTo(-(1 / 8 * radius + radius + i.position), -radius);
                    lib.context.strokeStyle = "black";
                    lib.context.stroke();
                    for (var k = 0; k < i.field.length; k++) {
                        lib.context.beginPath();
                        lib.context.fillText(i.field[k], -(radius + i.position + .2 * radius), -i.radius[k]);
                        lib.context.stroke();
                    }
                } else {
                    lib.context.beginPath();
                    lib.context.moveTo(-(radius + .25 * radius), 0);
                    lib.context.lineTo(-(radius + .25 * radius), -radius);
                    lib.context.strokeStyle = "black";
                    lib.context.stroke();
                    for (var k = 0; k < i.field.length; k++) {
                        lib.context.beginPath();
                        lib.context.fillText(i.field[k], -(radius + .45 * radius), -i.radius[k]);
                        lib.context.stroke();
                    }
                }

            }

        }


        /*  i=obj[0];
	    var startPointx =i.width/2;
		var startPointy =i.height/2;
		lib.context.translate(startPointx, startPointy);
		//radius bta3 el coord const=radius=(i.height- (2*i.margin) )/2
	    // am b2a el radius ele bb3to hena da 34an akteb el tdreg bta3o
		var radius=(i.height- (2*i.margin) )/2;
		//var radius=i.radius[i.radius.length-1];
		var theta=0;
		var space=0;
		lib.context.beginPath();
		lib.context.arc(0,0,radius, 0, Math.PI * 2, true);
		lib.context.stroke();
		if (i.grid === true) {
			for(var k=0 ;k<i.values.length;k++)
	       	{
			lib.context.beginPath();
			lib.context.moveTo(0,0);
			lib.context.lineTo(radius * Math.cos(Math.PI * i.angle[k] / 180.0),   radius * Math.sin(Math.PI * i.angle[k] / 180.0));
			lib.context.fillText(i.values[k],radius * Math.cos(Math.PI * i.angle[k] / 180.0),  radius * Math.sin(Math.PI * i.angle[k] / 180.0));
			lib.context.stroke();
			}
			lib.context.moveTo(-(radius+.25*radius),0);
			lib.context.lineTo(-(radius+.25*radius),-radius);
			//lib.context.fillText(i.values[k],radius * Math.cos(Math.PI * i.angle[k] / 180.0),  radius * Math.sin(Math.PI * i.angle[k] / 180.0));
			lib.context.stroke();
			var temp=i.radius[i.radius.length-1]/4 ;
            var value= 0;
			 for(var k=0; k<5;k++){
				var c=((value-0)/(i.radius[i.radius.length-1]))*radius
			lib.context.fillText(value.toFixed(2),-(radius+.45*radius),-c);
			value= value +temp ;
			//cons+=cons;
			// lib.context.fillText((i.min + ((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2), 10, currentY + 4);

			}
		}else{
			for(var k=0 ;k<i.values.length;k++)
	       	{
			lib.context.beginPath();
			//lib.context.moveTo(0,0);
			//lib.context.lineTo(radius * Math.cos(Math.PI * i.angle[k] / 180.0),   radius * Math.sin(Math.PI * i.angle[k] / 180.0));
			lib.context.fillText(i.values[k],radius * Math.cos(Math.PI * i.angle[k] / 180.0),  radius * Math.sin(Math.PI * i.angle[k] / 180.0));
			lib.context.stroke();
			}
			lib.context.moveTo(-(radius+.25*radius),0);
			lib.context.lineTo(-(radius+.25*radius),-radius);
			//lib.context.fillText(i.values[k],radius * Math.cos(Math.PI * i.angle[k] / 180.0),  radius * Math.sin(Math.PI * i.angle[k] / 180.0));
			lib.context.stroke();
			var temp=i.radius[i.radius.length-1]/4 ;
            var value= 0;
			 for(var k=0; k<5;k++){
				var c=((value-0)/(i.radius[i.radius.length-1]))*radius
			lib.context.fillText(value.toFixed(2),-(radius+.45*radius),-c);
			value= value +temp ;
		}
		} */

        /*
			  if(typeof i.values[0] === 'string' || i.values[0] instanceof String)
			 {
				 space =360/i.values.length;
				space*=-1;
			if (i.grid === true) {
			for(var k=0 ;k<i.values.length;k++)
	       	{
              theta=space*k;
              // store 	value of theta in your object
			lib.context.beginPath();
			lib.context.moveTo(startPointx,startPointy);
			lib.context.lineTo(startPointx + radius * Math.cos(Math.PI * theta / 180.0), startPointy + radius * Math.sin(Math.PI * theta / 180.0));
			lib.context.fillText(i.values[k],startPointx + radius * Math.cos(Math.PI * theta / 180.0),startPointy + radius * Math.sin(Math.PI * theta / 180.0));
			lib.context.stroke();
		 		 	 }
		    }else{
			 for(var k=0 ;k<i.values.length;k++)
	       	{
              theta=space*k;
                // store 	value of theta in your object
			lib.context.beginPath();
			lib.context.moveTo(startPointx,startPointy);
			//lib.context.lineTo(startPointx + radius * Math.cos(Math.PI * theta / 180.0), startPointy + radius * Math.sin(Math.PI * theta / 180.0));
			lib.context.fillText(i.values[k],startPointx + radius * Math.cos(Math.PI * theta / 180.0),startPointy + radius * Math.sin(Math.PI * theta / 180.0));
			lib.context.stroke();

		    }
				 }


		}else{
			 if (i.grid === true) {
			for(var k=0 ;k<i.values.length;k++)
		   {

			theta =((i.values[k]-i.min)/(i.max-i.min))*360;
			theta*=-1;
			// store 	value of theta in your object
			lib.context.beginPath();
			lib.context.moveTo(startPointx,startPointy);
			lib.context.lineTo(startPointx + radius * Math.cos(Math.PI * theta / 180.0), startPointy + radius * Math.sin(Math.PI * theta / 180.0));
			lib.context.fillText(i.values[k],startPointx + radius * Math.cos(Math.PI * theta / 180.0),startPointy + radius * Math.sin(Math.PI * theta / 180.0));
			lib.context.stroke();

	     	}
			}else{
			for(var k=0 ;k<i.values.length;k++)
		     {
			theta =((i.values[k]-i.min)/(i.max-i.min))*360;
			theta*=-1;
			// store 	value of theta in your object
			lib.context.beginPath();
			lib.context.moveTo(startPointx,startPointy);
			//lib.context.lineTo(startPointx + radius * Math.cos(Math.PI * theta / 180.0), startPointy + radius * Math.sin(Math.PI * theta / 180.0));
			lib.context.fillText(i.values[k],startPointx + radius * Math.cos(Math.PI * theta / 180.0),startPointy + radius * Math.sin(Math.PI * theta / 180.0));
			lib.context.stroke();

	     	}
			 }
		} */


    } else if (obj[obj.length - 1] == "coord_polar_parallel") {
        var startPointx = lib.GoG_JSON["width"] / 2;
        var startPointy = lib.GoG_JSON["height"] / 2;
        var angle = 360 / (obj.length - 1);
        var radius = (lib.GoG_JSON["height"] - (lib.GoG_JSON["margin"])) / 2;
        var rad = ((lib.GoG_JSON["height"] - (lib.GoG_JSON["margin"])) / 2) * (1 / 8);
        lib.context.translate(startPointx, startPointy);
        lib.context.beginPath();
        lib.context.arc(0, 0, radius, 0, Math.PI * 2, true);
        lib.context.strokeStyle = "white";
        lib.context.stroke();
        for (var k = 0; k < obj.length - 1; k++) {
            i = obj[k];
            lib.context.beginPath();
            lib.context.strokeStyle = "green";
            lib.context.moveTo(rad * Math.cos(Math.PI * -1 * (angle + k * angle) / 180.0), rad * Math.sin(Math.PI * -1 * (angle + k * angle) / 180.0));
            lib.context.lineTo(radius * Math.cos(Math.PI * -1 * (angle + k * angle) / 180.0), radius * Math.sin(Math.PI * -1 * (angle + k * angle) / 180.0));
            lib.context.fillStyle = "green";
            j = 1;
            var length;
            if (obj[k].values.length > 6) {
                length = 6;
            } else {
                length = obj[k].values.length;
            }
            while (j < length) {
                vals = length;
                //axeslength = i.height - (2 * i.margin);
                currentY = (radius / vals) * j;
                if (i.orientation === "right") {
                    if (i.hasOwnProperty("text")) {
                        lib.context.fillStyle = i.text.colour;
                        lib.context.font = i.text.font;
                    }
                    lib.context.fillText((i.min + ((i.max - i.min) / length) * j).toFixed(0), (rad + currentY) * Math.cos(Math.PI * -1 * (angle + k * angle) / 180.0), (rad + currentY) * Math.sin(Math.PI * -1 * (angle + k * angle) / 180.0));
                } else {
                    if (i.hasOwnProperty("text")) {
                        lib.context.fillStyle = i.text.colour;
                        lib.context.font = i.text.font;
                    }
                    lib.context.fillText((i.min + ((i.max - i.min) / length) * j).toFixed(0), ((rad + currentY) * Math.cos(Math.PI * -1 * (angle + k * angle) / 180.0)), (rad + currentY) * Math.sin(Math.PI * -1 * (angle + k * angle) / 180.0));
                }
                j++;
            }
            if (i.hasOwnProperty("annotation") && i.annotation.hasOwnProperty("title")) {
                if ((i.annotation.position == "") || !(i.annotation.hasOwnProperty("position"))) {
                    i.annotation.position = "edge";
                }
                if (i.annotation.position == "edge") {

                    lib.context.fillStyle = i.annotation.colour;
                    lib.context.font = i.annotation.font;
                    lib.context.fillText(i.annotation.title, radius * Math.cos(Math.PI * -1 * (angle + k * angle) / 180.0), radius * Math.sin(Math.PI * -1 * (angle + k * angle) / 180.0));
                } else if (i.annotation.position == "middle") {

                    lib.context.fillStyle = i.annotation.colour;
                    lib.context.font = i.annotation.font;
                    lib.context.fillText(i.annotation.title, radius * Math.cos(Math.PI * -1 * (angle + k * angle) / 180.0), radius * Math.sin(Math.PI * -1 * (angle + k * angle) / 180.0));
                }
            }
            lib.context.stroke();
            results.push(lib.context.strokeStyle = "#000000");
            //Ylength+=Length1;


        }
    } else if (obj[obj.length - 1] == "coord_flib") {
        for (l = 0, len = obj.length; l < len; l++) {
            i = obj[l];
            grid = i.grid === null || i.grid === void 0 ? false : i.grid;
            if (i.type === "y") {
                orientation = i.orientation === null || i.orientation === void 0 ? "bottom" : i.orientation;
            } else {
                orientation = i.orientation === null || i.orientation === void 0 ? "left" : i.orientation;
            }
            lib.context.beginPath();
            if (i.type === "y") {
                lib.context.strokeStyle = "#000000";
                if (i.orientation === "top") {
                    lib.context.moveTo(i.margin, i.margin);
                    lib.context.lineTo(i.width - i.margin, i.margin);
                } else {
                    lib.context.moveTo(i.margin, i.height - i.margin);
                    lib.context.lineTo(i.width - i.margin, i.height - i.margin);
                }
                lib.context.stroke();
                lib.context.strokeStyle = "rgba(128, 128, 255, 0.5)";
                j = 0;
                while (j < i.values.length) {
                    vals = i.values.length - 1;
                    axeslength = i.width - (2 * i.margin);
                    currentX = i.margin + (axeslength / vals) * j;

                    if (i.grid === true) {
                        lib.context.moveTo(currentX, i.margin);
                        lib.context.lineTo(currentX, i.height - i.margin);
                    }
                    if (j == 0) {
                        global_currentX = (((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2);
                    }
                    if (i.orientation === "top") {
                        lib.context.fillStyle = i.text.colour;
                        lib.context.font = i.text.font;
                        lib.context.fillText((i.min + ((i.max - i.min) / (i.values.length - 1)) * j).toFixed(2), currentX - 3, i.margin / 2);
                    } else {
                        lib.context.fillStyle = i.text.colour;
                        lib.context.font = i.text.font;
                        lib.context.fillText((i.min + ((i.max - i.min) / (i.values.length - 1)) * j).toFixed(2), currentX - 3, (i.height - i.margin) + i.margin / 2);
                    }
                    j++;
                }
                if (i.hasOwnProperty("annotation") && i.annotation.hasOwnProperty("title")) {
                    if ((i.annotation.position == "") || !(i.annotation.hasOwnProperty("position"))) {
                        i.annotation.position = "edge";
                    }
                    if (i.annotation.position == "edge") {

                        lib.context.fillStyle = i.annotation.colour;
                        lib.context.font = i.annotation.font;
                        lib.context.fillText(i.annotation.title, i.margin - 10, (i.height - 7.7 * i.margin));
                    } else if (i.annotation.position == "middle") {

                        lib.context.fillStyle = i.annotation.colour;
                        lib.context.font = i.annotation.font;
                        lib.context.fillText(i.annotation.title, i.margin - 50, (i.height - 4 * i.margin));
                    }
                }
                lib.context.stroke();
                lib.context.strokeStyle = "#000000";
            }
            lib.context.beginPath();
            if (i.type === "x") {
                if (i.orientation === "right") {
                    lib.context.moveTo(i.width - i.margin, i.margin);
                    lib.context.lineTo(i.width - i.margin, i.height - i.margin);
                } else {
                    lib.context.moveTo(i.margin, i.margin);
                    lib.context.lineTo(i.margin, i.height - i.margin);
                }
                lib.context.stroke();
                lib.context.strokeStyle = "rgba(128, 128, 255, 0.5)";
                j = 0;
                while (j <= i.values.length) {
                    vals = i.values.length;
                    axeslength = i.height - (2 * i.margin);
                    currentY = i.margin + (axeslength / vals) * j;
                    if (i.grid === true) {
                        lib.context.moveTo(i.width - i.margin, currentY);
                        lib.context.lineTo(i.margin, currentY);
                    }
                    if (j == i.values.length) {
                        global_currentY = (i.min + ((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2);
                    } else if (j == 0) {
                        global_startY = (i.min + ((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2);
                    }
                    if (i.orientation === "right") {
                        lib.context.fillStyle = i.text.colour;
                        lib.context.font = i.text.font;
                        lib.context.fillText((i.min + ((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2), 10 + i.width - i.margin, currentY + 4);
                    } else {
                        lib.context.fillStyle = i.text.colour;
                        lib.context.font = i.text.font;
                        lib.context.fillText((i.min + ((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2), 10, currentY + 4);
                    }
                    j++;
                }
                if (i.hasOwnProperty("annotation") && i.annotation.hasOwnProperty("title")) {
                    if ((i.annotation.position == "") || !(i.annotation.hasOwnProperty("position"))) {
                        i.annotation.position = "edge";
                    }
                    if (i.annotation.position == "edge") {
                        lib.context.fillStyle = i.annotation.colour;
                        lib.context.font = i.annotation.font;
                        lib.context.fillText((i.annotation.title), ((i.width - i.margin) + 30), (i.height - i.margin) + i.margin / 15);

                    } else if (i.annotation.position == "middle") {
                        lib.context.fillStyle = i.annotation.colour;
                        lib.context.font = i.annotation.font;
                        lib.context.fillText(i.annotation.title, ((i.width - i.margin) + 30) / 2, (i.height - i.margin) + i.margin / 1.4);
                    }
                }

                lib.context.stroke();
                results.push(lib.context.strokeStyle = "#000000");
            } else {
                results.push(void 0);
            }
        }
        return results;
    } else if (obj[obj.length - 1] == "coord_equal") {/*nada task*/

        minY = 0;
        maxY = 0;
        minX = 0;
        maxX = 0;
        minG = 0;
        maxG = 0;
        //ratio = 1 ;

        for (l = 0, len = obj.length; l < len; l++) {
            i = obj[l];
            ratio = i.ratio;
            /////////////////////////

            if (i.type === "y") {
                minY = i.min;
                maxY = i.max;
            }
            if (i.type === "x") {
                minX = i.min;
                maxX = i.max;
            }
            if (minY < minX) {
                minG = minY;
            } else {
                minG = minX;
            }
            if (maxY > maxX) {
                maxG = maxY;
            } else {
                maxG = maxX;
            }

            ////////////////////////
            grid = i.grid === null || i.grid === void 0 ? false : i.grid;
            if (i.type === "y") {
                orientation = i.orientation === null || i.orientation === void 0 ? "bottom" : i.orientation;
            } else {
                orientation = i.orientation === null || i.orientation === void 0 ? "left" : i.orientation;
            }
            lib.context.beginPath();
            // console.log("lib.context.beginPath" + JSON.stringify(context));
            if (i.type === "y") {
                //minY = i.min;
                // maxY = i.max;
                lib.context.strokeStyle = "#000000";
                if (i.orientation === "top") {
                    lib.context.moveTo(i.margin, i.margin);
                    lib.context.lineTo(i.width - i.margin, i.margin);
                } else {
                    lib.context.moveTo(i.margin, i.height - i.margin);
                    lib.context.lineTo(i.width - i.margin, i.height - i.margin);
                }
                lib.context.stroke();
                lib.context.strokeStyle = "rgba(128, 128, 255, 0.5)";
                j = 0;
                while (j < i.values.length) {
                    vals = i.values.length - 1;
                    //axeslength = i.width - (2 * i.margin);
                    axeslength = i.height - (2 * i.margin);
                    currentX = i.margin + (axeslength / vals) * j;

                    if (i.grid === true) {
                        lib.context.moveTo(currentX, i.margin);
                        lib.context.lineTo(currentX, i.height - i.margin);
                    }
                    if (j == 0) {
                        global_currentX = (((maxG - minG) / i.values.length) * (i.values.length - j)).toFixed(2);
                    }
                    if (i.orientation === "top") {
                        lib.context.fillText((minG + ((maxG - minG) / (i.values.length - 1)) * j).toFixed(2), currentX - 3, i.margin / 2);
                    } else {
                        //ÛíÑÊ Ýì Þíã ÇáÇßÓ
                        // lib.context.fillText((i.min + ((i.max - i.min) / (i.values.length - 1)) * j).toFixed(2), currentX - 3, (i.height - i.margin) + i.margin / 2);
                        lib.context.fillText((((minG + ((maxG - minG) / (i.values.length - 1)) * j))/* *5 */).toFixed(2), currentX - 3, (i.height - i.margin) + i.margin / 2);
                    }
                    j++;
                }
                lib.context.stroke();
                lib.context.strokeStyle = "#000000";
            }
            if (i.type === "x") {
                if (i.orientation === "right") {
                    lib.context.moveTo(i.width - i.margin, i.margin);
                    lib.context.lineTo(i.width - i.margin, i.height - i.margin);
                } else {
                    lib.context.moveTo(i.margin, i.margin);
                    lib.context.lineTo(i.margin, i.height - i.margin);
                }
                lib.context.stroke();
                lib.context.strokeStyle = "rgba(128, 128, 255, 0.5)";
                j = 0;
                while (j <= i.values.length) {
                    vals = i.values.length;
                    axeslength = i.height - (2 * i.margin);
                    currentY = i.margin + (axeslength / vals) * j;
                    if (i.grid === true) {
                        lib.context.moveTo(i.width - i.margin, currentY);
                        lib.context.lineTo(i.margin, currentY);
                    }
                    if (j == i.values.length) {
                        global_currentY = (minG + ((maxG - minG) / i.values.length) * (i.values.length - j)).toFixed(2);
                    } else if (j == 0) {
                        global_startY = (minG + ((maxG - minG) / i.values.length) * (i.values.length - j)).toFixed(2);
                    }
                    if (i.orientation === "right") {

                        lib.context.fillText((minG + ((maxG - minG) / i.values.length) * (i.values.length - j)).toFixed(2), 10 + i.width - i.margin, currentY + 4);
                    } else {
                        // lib.context.fillText((((minG + ((maxG - minG) / (i.values.length - 1)) * j))/* *5 */).toFixed(2), currentX - 3, (i.height - i.margin) + i.margin / 2);
                        lib.context.fillText((((minG + ((maxG - minG) / i.values.length) * (i.values.length - j))) * ratio /* *5 */).toFixed(2), 10, currentY + 4);
                        //lib.context.fillText((i.min + ((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2), 10, currentY + 4);
                        //lib.context.fillText((i.min + ((i.max - i.min) / (i.values.length - 1)) * j).toFixed(2), currentX - 3, (i.height - i.margin) + i.margin / 2);
                    }
                    j++;
                }
                lib.context.stroke();
                results.push(lib.context.strokeStyle = "#000000");
            } else {
                results.push(void 0);
            }
        }
        return results;
    }

};
Tooltip = (function () {
    function Tooltip(obj1) {
        this.obj = obj1;
    }

    return Tooltip;

})();
Tooltip.prototype.draw = function (value) {
};

Tooltip.prototype.mouseover = function () {
};

Tooltip.prototype.mousemove = function () {
};

Tooltip.prototype.mouseout = function () {
};

Tooltip.prototype.getMousePos = function (canvas, evt) {
};

Canvas_Parse = function (obj) {
    var key, results, value;
    /* if(obj.id=== ""){
	  can=document.createElement("canvas");
	  can.id="defult";
	  obj.id=can.id;
  } */
    lib.canvas = document.getElementById(obj.id);
    lib.context = lib.canvas.getContext("2d");
    lib.Line = new Line();
    lib.Bar = new Bar();
    lib.StackedBar = new StackedBar();
    lib.Point = new Point();
    lib.Picture = new Picture();
    lib.Axes = new Axes();
    lib.Guides = new Guides();
    lib.Diamond = new Diamond();
    lib.Background = new Background();
    lib.Tooltip = new Tooltip(obj);
    lib.Area = new Area();
    lib.Text = new Text();
    lib.Pie = new Pie();
    lib.Arc = new Arc();
    lib.Image = new Image();
    results = [];
    for (key in obj) {
        value = obj[key];
        if (key === "id") {

        } else {
            results.push(lib[key]["draw"](value));
        }
    }
    return results;
};

//# sourceMappingURL=Canvas-Parser.js.map
