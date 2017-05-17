var Iterator = function (moveNext, current) {
    this.moveNext = moveNext;
    this.current = current;
};

var getArrayIterator = function (arr) {
    var len = arr.length,
    index = -1;
    return new Iterator(function () {
        if (arr.length !== len) {
            throw new Error("Collection was modified, enumeration operation may not execute.");
        }
        index += 1;
        return index < len;
    }, function () {
        return arr[index];
    });
};

var Enumerable = function (enumerable) {
    var getIterator;
    if (isArray(enumerable)) {
        getIterator = function () {
            return getArrayIterator(enumerable);
        };
    } else if (typeof enumerable === "function") {
        getIterator = enumerable;
    } else {
        throw new Error("Invalid input parameter.");
    }
    this.getIterator = getIterator;
};

Enumerable.prototype.where = function (predicate) {
    var self = this;
    return new Enumerable(function () {
        var iterator = self.getIterator();
        var index = -1;
        var current;
        return new Iterator(function () {
            while (iterator.moveNext()) {
                index += 1;
                current = iterator.current();
                if (predicate(current, index)) {
                    return true;
                }
            }
            current = undefined;
            return false;
        }, function () {
            return current;
        });
    });
};

Enumerable.range = function (start, count) {
    if (!isNull(count)) {
        if (count < 0) {
            throw new Error("Count cannot be lower than 0.");
        }
        if (start + (count - 1) > Number.MAX_SAFE_INTEGER) {
            throw new Error("Start and count can not exceed " + MAX_SAFE_INTEGER + ".");
        }
    }
    return new Enumerable(function () {
        if (isNull(count)) {
            var moved = false;
            return new Iterator(function () {
                if (!moved) {
                    moved = true;
                } else {
                    start += 1;
                }
                return start <= Number.MAX_SAFE_INTEGER;
            }, function () {
                if (!moved || start > Number.MAX_SAFE_INTEGER) {
                    return undefined;
                }
                return start;
            });
        } else {
            var index = -1;
            return new Iterator(function () {
                index += 1;
                return index < count;
            }, function () {
                if (index === -1 || index >= count) {
                    return undefined;
                }
                return start + index;
            });
        }
    });
};

Enumerable.prototype.take = function (count) {
    var self = this;
    return new Enumerable(function () {
        var iterator = self.getIterator(),
        index = -1;
        return new Iterator(function () {
            index += 1;
            return index < count && iterator.moveNext();
        }, function () {
            if (index === -1 || index >= count) {
                return undefined;
            }
            return iterator.current();
        });
    });
};


var Temp = function () {
    // This will shut up JSLint :-)
    // Minify will remove 'return' so no precious bytes are lost.
    return;
};

function inherit(inheritor, inherited) {
    Temp.prototype = inherited.prototype;
    inheritor.prototype = new Temp();
    Temp.prototype = null;
    inheritor.prototype.constructor = inheritor;
}

var List = function (arr) {
    var self = this;

    Enumerable.call(this, function () {
        return getArrayIterator(self);
    });

    arr = arr || [];
    if (isArray(arr)) {
        var i;
        for (i = 0; i < arr.length; i += 1) {
            this[i] = arr[i];
        }
    } else {
        throw new Error("Invalid input parameter.");
    }
    this.length = arr.length;
};

List.prototype.add = function (item) {
    this._.arr.push(item);
    this.length += 1;
};

List.prototype.remove = function (item) {
    // indexOf inherited from Enumerable.
    var index = this.indexOf(item);

    if (index >= 0) {
        this._.arr.splice(index, 1);
        this.length -= 1;
        return true;
    }
    return false;
};

inherit(List, Enumerable);

// Usage.
var l = new List(["Hello", "List"]);
console.log(l[0]);
console.log(l[1]);