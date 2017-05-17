var Enumerable = function (arr) {
    this.arr = arr;
};

Enumerable.prototype.forEach = function (callback) {
    var i;
    for (i = 0; i < this.arr.length; i += 1) {
        callback(this.arr[i], i);
    }
};

Enumerable.prototype.where = function (predicate) {
    var filtered = [];
    this.forEach(function (e, i) {
        if (predicate(e, i)) {
            filtered.push(e);
        }
    });
    return filtered;
};

// Usage.
var e = new Enumerable(["Hello", "Enumerable"]);
e.forEach(function (s) {
    console.log(s);
});

// Usage of where.
var e = new Enumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var evens = e.where(function (n) {
    return n % 2 === 0;
});


