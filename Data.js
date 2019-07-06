var Data;

Data = (function () {
    function Data() {
    }

    return Data;

})();

Data.prototype.process = function (obj) {
    var i, j, len, results;
    results = [];
    for (j = 0, len = obj.length; j < len; j++) {
        i = obj[j];
        if (i.hasOwnProperty('format') && i.format.type === "csv") {
            i.values = dl.csv(i.values, i.format);
            lib.GoG_JSON[i.name] = i.values;
        }
        if (i.hasOwnProperty('format') && i.format.type === "json") {
            i.values = dl.json(i.values);
            lib.GoG_JSON[i.name] = i.values;
        }
        if (i.hasOwnProperty('format') && i.format.type === "tsv") {
            i.values = dl.tsv(i.values, i.format);
            results.push(lib.GoG_JSON[i.name] = i.values);
        } else {
            results.push(lib.GoG_JSON[i.name] = i.values);
        }
    }
    return results;
};

//# sourceMappingURL=Data.js.map
