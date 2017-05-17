function isActualNaN(obj) {
    return obj !== obj;
}

var defaultEqComparer = {
    equals: function (x, y) {
        return x === y || (isActualNaN(x) && isActualNaN(y)); // NaN edge case.
    },
    getHash: function (obj) {
        var hash;
        if (obj === null) {
            hash = "null";
        } else if (obj === undefined) {
            hash = "undefined";
        } else if (isActualNaN(obj)) {
            hash = "NaN";
        } else {
            hash = typeof obj.getHash === "function" ?
            obj.getHash() :
            typeof obj.toString === "function" ? obj.toString() : Object.prototype.toString.call(obj);
        }
        return hash;
    }
};

var Dictionary = function (eqComparer) {
    var self = this;

    Enumerable.call(self, function () {
        var iterator = self._.entries.getIterator();
        return new Iterator(function () {
            return iterator.moveNext();
        }, function () {
            var current = iterator.current();
            if (current) {
                return { key: current.key, value: current.value };
            }
            return undefined;
        });
    });

    this.length = 0;
    this._ = {
        eqComparer: ensureEqComparer(eqComparer),
        keys: {},
        entries: new List()
    };
};
inherit(Dictionary, Enumerable);

function dictionaryContainsKey(dictionary, hash, key) {
    if (dictionary._.keys.hasOwnProperty(hash)) {
        return dictionary._.keys[hash].contains(key, function (x, y) {
            return dictionary._.eqComparer.equals(x.key, y);
        });
    }
    return false;
}

Dictionary.prototype.add = function (key, value) {
    var hash = this._.eqComparer.getHash(key);
    if (dictionaryContainsKey(this, hash, key)) {
        throw new Error("Key [" + key + "] is already present in the dictionary.");
    }

    if (!this._.keys[hash]) {
        this._.keys[hash] = new List();
    }
    var pair = { key: key, value: value };
    this._.keys[hash].add(pair);
    this._.entries.add(pair);

    this.length += 1;
};

function getPairByKey(dict, hash, key, whenNotExists) {
    var elem;
    if (!dict._.keys.hasOwnProperty(hash)) {
        whenNotExists();
    } else {
        var def = {};
        elem = dict._.keys[hash].firstOrDefault(function (kvp) {
            return dict._.eqComparer.equals(kvp.key, key);
        }, def);
        if (elem === def) {
            whenNotExists();
        }
    }
    return elem;
}

Dictionary.prototype.remove = function (key) {
    var hash = this._.eqComparer.getHash(key);
    var notFound;
    var pair;

    pair = getPairByKey(this, hash, key, function () {
        notFound = true;
    });
    if (notFound) {
        return false;
    }

    var keys = this._.keys[hash];
    keys.remove(pair);
    this._.entries.remove(pair);
    if (!keys.any()) {
        delete this._.keys[hash];
    }
    this.length -= 1;
    return true;
};

Dictionary.prototype.containsKey = function (key) {
    var hash = this._.eqComparer.getHash(key);
    return dictionaryContainsKey(this, hash, key);
};

Dictionary.prototype.get = function (key) {
    var hash = this._.eqComparer.getHash(key);
    return getPairByKey(this, hash, key, function () {
        throw new Error("Key [" + key + "] was not found in the dictionary.");
    }).value;
};

Dictionary.prototype.tryGet = function (key) {
    var hash = this._.eqComparer.getHash(key),
    notFound,
    pair = getPairByKey(this, hash, key, function () {
        notFound = true;
    });
    if (notFound) {
        return {
            success: false,
            value: undefined
        };
    }
    return {
        success: true,
        value: pair.value
    };
};

//Usage
var d = new Dictionary();

var billGates = {
    firstName: "Bill",
    lastName: "Gates"
};
var billClinton = {
    firstName: "Bill",
    lastName: "Clinton"
};

d.add(billGates, "Richest man in the world.");
d.add(billClinton, "Was president of the USA.");

console.log(d.containsKey(billGates));
// Logs "true"

console.log(d.get(billClinton));
// Logs "Was president of the USA."

d.remove(billClinton);
console.log(d.containsKey(billClinton));
// Logs "false"