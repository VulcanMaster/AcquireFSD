var isArray = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
};

var Enumerable = function (enumerable) {
    var getIterator;
    if (isArray(enumerable)) {
        getIterator = function () {
            return new ArrayIterator(enumerable);
        };
    } else if (typeof enumerable === "function") {
        getIterator = enumerable;
    } else {
        throw new Error("Invalid input parameter.");
    }
    this.getIterator = getIterator;
};

var WhereIterator = function (source, predicate) {
    var iterator = source.getIterator();
    var index = -1;
    var current;
    this.moveNext = function () {
        while (iterator.moveNext()) {
            index += 1;
            current = iterator.current();
            if (predicate(current, index)) {
                return true;
            }
        }
        current = undefined;
        return false;
    };
    this.current = function () {
        return current;
    };
};

Enumerable.prototype.where = function (predicate) {
    var self = this;
    return new Enumerable(function () {
        return new WhereIterator(self, predicate);
    });
};

Enumerable.prototype.toArray = function () {
    var arr = [];
    this.forEach(function (elem) {
        arr.push(elem);
    });
    return arr;
};

// Create an alias.
Enumerable.prototype.filter = Enumerable.prototype.where;

// Usage of where
var e = new Enumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var evens = e.where(function (n) {
    return n % 2 === 0;
});

// Usage of toArrat
var e = new Enumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var evens = e.where(function (n) {
    return n % 2 === 0;
}).toArray();