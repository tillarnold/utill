"use strict";

function isString(param) {
  return typeof param === 'string' || param instanceof String;
}

function each(iterable, callback) {
  for (var i = 0; i < iterable.length; i++) {
    callback.call(iterable[i], iterable[i]);
  }
}


function loopObject(object, callback) {
  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      callback(property, object[property]);
    }
  }
}

function mixObjects(target, source) {
  var returnVal = {};

  loopObject(target, function(key, value) {
    returnVal[key] = value;
  });

  loopObject(source, function(key, value) {
    returnVal[key] = value;
  });


  return returnVal;
}






module.exports = {
  isString: isString,
  each: each,
  mixObjects: mixObjects,
  loopObject: loopObject
};