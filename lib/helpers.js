"use strict";

/**
 * Checks if the given argument is a string
 */
var isString = function isString(param) {
  return typeof param === 'string' || param instanceof String;
};

/**
 * Calls the given callback on every Element of an Array like Object
 */
var each = function each(iterable, callback) {
  for (var i = 0; i < iterable.length; i++) {
    callback.call(iterable[i], iterable[i]);
  }
};

/**
 * Calls the given callback on every Element of an Object. Uses hasOwnProperty.
 */
var loopObject = function loopObject(object, callback) {
  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      callback(property, object[property]);
    }
  }
};

/**
 * mixes the given objects. The parameters are not modified.
 * The second parameter overrides the first.
 * prototypes will not be mixed.
 */
var mixObjects = function mixObjects(target, source) {
  var returnVal = {};

  loopObject(target, function (key, value) {
    returnVal[key] = value;
  });

  loopObject(source, function (key, value) {
    returnVal[key] = value;
  });

  return returnVal;
};

/**
 * finds the smallest of the given arguments
 * example:
 * smallest(10,40,5,42) returns 5
 */
var smallest = function smallest () {
  var reduce = Array.prototype.reduce;
  return reduce.call(arguments,function(previousValue, currentValue, index, array){
    return previousValue>currentValue ? currentValue : previousValue; 
  });
}

/**
 * finds the biggest of the given arguments
 * example:
 * biggest(10,40,5,42) returns 42
 */
var biggest = function biggest () {
  var reduce = Array.prototype.reduce;
  return reduce.call(arguments,function(previousValue, currentValue, index, array){
    return previousValue<currentValue ? currentValue : previousValue; 
  });
}

module.exports = {
  isString: isString,
  each: each,
  mixObjects: mixObjects,
  loopObject: loopObject,
  smallest: smallest,
  biggest: biggest
};
