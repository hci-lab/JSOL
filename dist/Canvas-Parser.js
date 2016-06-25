var Area, Axes, Background, Canvas_Geometry, Canvas_Parse, Diamond, Line, Picture, Point, Text, Tooltip,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Canvas_Geometry = (function() {
  function Canvas_Geometry() {}

  return Canvas_Geometry;

})();

Line = (function(superClass) {
  extend(Line, superClass);

  function Line() {
    return Line.__super__.constructor.apply(this, arguments);
  }

  return Line;

})(Canvas_Geometry);

Line.prototype.draw = function(obj) {
  var color, i, l, len, results, width;
  results = [];
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
  return results;
};

Area = (function(superClass) {
  extend(Area, superClass);

  function Area() {
    return Area.__super__.constructor.apply(this, arguments);
  }

  return Area;

})(Canvas_Geometry);

Area.prototype.draw = function(obj) {
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

Background = (function(superClass) {
  extend(Background, superClass);

  function Background() {
    return Background.__super__.constructor.apply(this, arguments);
  }

  return Background;

})(Canvas_Geometry);

Background.prototype.draw = function(value) {
  var url;
  url = "http";
  if (value.indexOf(url) > -1) {
    lib.canvas.style.backgroundImage = 'url(' + value + ')';
    return lib.canvas.style.backgroundSize = '100% 100%';
  } else {
    return lib.canvas.style.backgroundColor = value;
  }
};

Diamond = (function(superClass) {
  extend(Diamond, superClass);

  function Diamond() {
    return Diamond.__super__.constructor.apply(this, arguments);
  }

  return Diamond;

})(Canvas_Geometry);

Diamond.prototype.draw = function(obj) {
  var color, cursorx, cursory, i, l, len, results;
  results = [];
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
  return results;
};

Point = (function(superClass) {
  extend(Point, superClass);

  function Point() {
    return Point.__super__.constructor.apply(this, arguments);
  }

  return Point;

})(Canvas_Geometry);

Point.prototype.draw = function(obj) {
  var anticlockwise, color, endAngle, fillColor, i, l, len, linewidth, radius, results, startAngle;
  results = [];
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
    lib.context.arc(i.x, i.y, radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, anticlockwise);
    lib.context.fillStyle = fillColor;
    lib.context.fill();
    lib.context.lineWidth = linewidth;
    lib.context.strokeStyle = color;
    lib.context.stroke();
    lib.context.strokeStyle = "#000000";
    lib.context.lineWidth = 1;
    results.push(lib.context.fillStyle = "#000000");
  }
  return results;
};

Picture = (function(superClass) {
  extend(Picture, superClass);

  function Picture() {
    return Picture.__super__.constructor.apply(this, arguments);
  }

  return Picture;

})(Canvas_Geometry);

Picture.prototype.draw = function(obj) {
  var i, l, len, results;
  results = [];
  for (l = 0, len = obj.length; l < len; l++) {
    i = obj[l];
    results.push(Picture.Process(i));
  }
  return results;
};

Picture.prototype.Process = function(obj) {
  var image;
  image = new Image();
  image.src = obj.src;
  return image.onload = function() {
    var imageHeight, imageWidth;
    imageWidth = image.width;
    imageHeight = image.height;
    lib.context.save();
    lib.context.translate(obj.x - (imageHeight / 2), obj.y - (imageWidth / 2));
    lib.context.drawImage(image, 0, 0);
    return lib.context.restore();
  };
};

Text = (function(superClass) {
  extend(Text, superClass);

  function Text() {
    return Text.__super__.constructor.apply(this, arguments);
  }

  return Text;

})(Canvas_Geometry);

Text.prototype.draw = function(obj) {
  var i, l, len, results;
  results = [];
  for (l = 0, len = obj.length; l < len; l++) {
    i = obj[l];
    lib.context.font = "15px Arial";
    results.push(lib.context.fillText(i.text, i.x, i.y));
  }
  return results;
};

Axes = (function(superClass) {
  extend(Axes, superClass);

  function Axes() {
    return Axes.__super__.constructor.apply(this, arguments);
  }

  return Axes;

})(Canvas_Geometry);

Axes.prototype.draw = function(obj) {
  var axeslength, currentX, currentY, grid, i, j, l, len, orientation, results, vals;
  results = [];
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
        currentX = i.margin + (axeslength / vals) * j;
        if (i.grid === true) {
          lib.context.moveTo(currentX, i.margin);
          lib.context.lineTo(currentX, i.height - i.margin);
        }
        if (i.orientation === "top") {
          lib.context.fillText((i.min + ((i.max - i.min) / (i.values.length - 1)) * j).toFixed(2), currentX - 3, i.margin / 2);
        } else {
          lib.context.fillText((i.min + ((i.max - i.min) / (i.values.length - 1)) * j).toFixed(2), currentX - 3, (i.height - i.margin) + i.margin / 2);
        }
        j++;
      }
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
      while (j < i.values.length) {
        vals = i.values.length - 1;
        axeslength = i.height - (2 * i.margin);
        currentY = i.margin + (axeslength / vals) * j;
        if (i.grid === true) {
          lib.context.moveTo(i.width - i.margin, currentY);
          lib.context.lineTo(i.margin, currentY);
        }
        if (i.orientation === "right") {
          lib.context.fillText((i.min + ((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2), 10 + i.width - i.margin, currentY + 4);
        } else {
          lib.context.fillText((i.min + ((i.max - i.min) / i.values.length) * (i.values.length - j)).toFixed(2), 10, currentY + 4);
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
};

Tooltip = (function() {
  function Tooltip(obj1) {
    this.obj = obj1;
  }

  return Tooltip;

})();

Tooltip.prototype.draw = function(value) {};

Tooltip.prototype.mouseover = function() {};

Tooltip.prototype.mousemove = function() {};

Tooltip.prototype.mouseout = function() {};

Tooltip.prototype.getMousePos = function(canvas, evt) {};

Canvas_Parse = function(obj) {
  var key, results, value;
  lib.canvas = document.getElementById(obj.id);
  lib.context = lib.canvas.getContext("2d");
  lib.Line = new Line();
  lib.Point = new Point();
  lib.Picture = new Picture();
  lib.Axes = new Axes();
  lib.Diamond = new Diamond();
  lib.Background = new Background();
  lib.Tooltip = new Tooltip(obj);
  lib.Area = new Area();
  lib.Text = new Text();
  results = [];
  for (key in obj) {
    value = obj[key];
    if (key === "id") {
      continue;
    } else {
      results.push(lib[key]["draw"](value));
    }
  }
  return results;
};

//# sourceMappingURL=Canvas-Parser.js.map
