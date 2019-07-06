var Transform;

Transform = (function () {
    function Transform() {
    }

    return Transform;

})();

Transform.prototype.process = function (obj) {
    var i, k, len, results;
    results = [];
    for (k = 0, len = obj.length; k < len; k++) {
        i = obj[k];
        if (i.hasOwnProperty("lang") && i.lang === "R") {
            results.push(Transform.prototype["R_" + i["function"]](i.properties));
        } else {
            results.push(Transform.prototype[i["function"]](i.properties));
            // results.push(Define.prototype.count(i.properties));
        }
    }
    return results;
};
Transform.prototype.pow = function (obj) {
    var dataTable, field, j, k, key, len, power, results, value, variable;
    dataTable = lib.GoG_JSON[obj.data];
    power = obj.power;
    field = obj.field;
    variable = obj.name;
    results = [];
    for (k = 0, len = dataTable.length; k < len; k++) {
        j = dataTable[k];
        results.push((function () {
            var results1;
            results1 = [];
            for (key in j) {
                value = j[key];
                results1.push(j[variable] = Math.pow(j[field], power));
            }
            return results1;
        })());
    }
    return results;
};
Transform.prototype.count = function (obj) {
    var dataTable, field, j, k, key, len, power, results, value, variable;
    dataTable = lib.GoG_JSON[obj.data];
    // power = obj.power;
    field = obj.field;
    variable = obj.name;
    results = [];
    for (i = 0; i < dataTable.length; i++) {
        temp = dataTable[i];
        count = 0;
        for (j = 0; j < dataTable.length; j++) {
            if (temp[field] == dataTable[j][field]) {
                count++;
            }
        }
        temp[variable] = count;
        results.push(temp);
    }
    /* for (k = 0, len = dataTable.length; k < len; k++) {
       j = dataTable[k];
       results.push((function() {
         var results1;
         results1 = [];
         for (key in j) {
           value = j[key];
           results1.push(j[variable] = Math.pow(j[field], power));
         }
         return results1;
       })());
     }*/
    return results;
};
Transform.prototype.groupby = function (obj) {
    var dataTable, field, j, k, results, variable, count = 0, YAxes, yy;
    dataTable = lib.GoG_JSON[obj.data];
    field = obj.field;
    YAxes = obj.yAxes;
    variable = obj.name;
    yy = obj.y;
    results = [];
    dataTable.sort(function (a, b) {
        return a[field] - b[field]; //to reverse b.date-a.date
    });
    // power = obj.power;

    var Result = [];
    temp = dataTable[0];
    temp[yy] = dataTable[0][YAxes];
    results.push(temp);

    for (var k = 1; k < dataTable.length; k++) {
        temp = dataTable[k];
        if (dataTable[k][field] == dataTable[k - 1][field]) {
            count += dataTable[k][YAxes];
            temp[yy] = count;
            results.push(temp);

        } else {

            count = 0;
            count += dataTable[k][YAxes];
            temp[yy] = count;
            results.push(temp);


        }
    }
    return results;
};
Transform.prototype.R_fibonnaci = function (obj) {
    var data, dataTable, field, length, library, variable;
    dataTable = lib.GoG_JSON[obj.data];
    variable = obj.name;
    field = obj.field;
    length = obj.length;
    library = obj.library;
    data = {
        n: length,
        sequence: true
    };
    ocpu.seturl("http://localhost:5888/ocpu/library/" + library + "/R");
    ocpu.rpc("fibonacci", data, function (output) {
        var j, k, len, m, results;
        m = 0;
        results = [];
        for (k = 0, len = dataTable.length; k < len; k++) {
            j = dataTable[k];
            j[variable] = output[m];
            results.push(m++);
        }
        return results;
    });
};

//# sourceMappingURL=transform.js.map
