"use strict";

var helpers = require('./helpers');


function arrayToFragment(array) {
  var fragment = document.createDocumentFragment();
  helpers.each(array, function() {
    fragment.appendChild(this);
  });
  return fragment;
}

function nodeListToArray(list) {
  return Array.prototype.slice.call(list, 0);
}

function nodeListToFragment(list) {
  return arrayToFragment(nodeListToArray(list));
}

function elementToFragment(element) {
  return nodeListToFragment(element.childNodes);
}




// Unused functions, may be usefull later on
/*
function toArrayOfElements(parameter) {
    if (parameter instanceof Selection) {
        return parameter._elements;
    }

    if (parameter instanceof Element) {
        return [parameter];
    }

    if (helpers.isString(parameter)) {
        return domHelpers.nodeListToArray(document.querySelectorAll(parameter));
    }

    return parameter;
}

function toSingleElementArray(parameter) {
    if (parameter instanceof Selection) {
        return [parameter._elements[0]];
    }

    if (parameter instanceof Element) {
        return [parameter];
    }

    if (helpers.isString(parameter)) {
        return [document.querySelector(parameter)];
    }

    return parameter;
}

*/






module.exports = {
  arrayToFragment: arrayToFragment,
  nodeListToArray: nodeListToArray,
  elementToFragment: elementToFragment,
  nodeListToFragment: nodeListToFragment
};