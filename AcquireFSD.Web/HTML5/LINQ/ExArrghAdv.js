var ArrayIterator = function (arr) {
    var currentIndex = -1;
    this.moveNext = function () {
        currentIndex += 1;
        // Return whether more elements are available.
        return currentIndex < arr.length;
    }
    this.current = function () {
        return arr[currentIndex];
    };
};

var Enumerable = function (arr) {
    this.getIterator = function () {
        return new ArrayIterator(arr);
    }
};

Enumerable.prototype.forEach = function (callback) {
    var iterator = this.getIterator();
    var currentIndex = 0;
    while (iterator.moveNext()) {
        callback(iterator.current(), currentIndex);
        currentIndex += 1;
    }
};

// Usage.
function isNull(obj) {
    return obj === undefined || obj === null;
}

Enumerable.prototype.forEach = function (callback) {
    var iterator = this.getIterator();
    var cont;
    var currentIndex = 0;
    while ((isNull(cont) || cont) && iterator.moveNext()) {
        cont = callback(iterator.current(), currentIndex);
        currentIndex += 1;
    }
};

// Usage.
var e = new Enumerable(["Hello", "Enumerable"]);
e.forEach(function (s) {
    console.log(s);
    // Break after the first element.
    // "Enumerable" will never log.
    return false;
});