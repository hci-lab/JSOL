var Define;

Define = (function () {
    function Define() {
    }

    return Define;

})();

Define.prototype.process = function (obj) {
    var i, j, len, results;
    results = [];
    for (j = 0, len = obj.length; j < len; j++) {
        i = obj[j];
        results.push(window["eval"](i));
    }
    return results;
};

//# sourceMappingURL=Define.js.map
