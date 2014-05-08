


function arrayToFragment(array) {
  var fragment = document.createDocumentFragment();
  each(array,function() {
    fragment.appendChild(this);
  });
  return fragment;
}

function nodeListToArray(list) {
  return Array.prototype.slice.call(list, 0)
}

function nodeListToFragment(list) {
  return arrayToFragment(nodeListToArray(list));
}

function elementToFragment(element) {
  return nodeListToFragment(element.childNodes);
}



function toArrayOfElements(parameter) {
  if(parameter instanceof Collection) {
    return parameter._elements;
  }

  if(parameter instanceof Element) {
    return [parameter]
  }

  if(isString(parameter)) {
    return nodeListToArray(document.querySelectorAll(parameter))
  }

  return parameter;
}

function toSingleElementArray(parameter) {
 if(parameter instanceof Collection) {
    return [parameter._elements[0]];
  }

  if(parameter instanceof Element) {
    return [parameter];
  }

  if(isString(parameter)) {
    return [document.querySelector(parameter)];
  }

  return parameter;
}


function toDOMElement(parameter) {
  if(isString(parameter)) {
    var div = document.createElement('div');
    div.innerHTML = parameter;
    return elementToFragment(div);
  }

  if(parameter instanceof Collection) {
    return arrayToFragment(parameter._elements);
  }

  return parameter;
}






module.exports = {
  arrayToFragment:arrayToFragment,
  nodeListToArray:nodeListToArray,
  elementToFragment:elementToFragment,
  toArrayOfElements:toArrayOfElements,
  toDOMElement:toDOMElement,
  toSingleElementArray:toSingleElementArray
};