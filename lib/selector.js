var domHelpers = require('./domHelpers');
var helpers = require('./helpers');

var each = helpers.each;


function selectAll(query) {
  return domHelpers.toArrayOfElements(query);
}

function selectSingle(query) {
  return domHelpers.toSingleElementArray(query);
}


function Selection(elements) {
  if (elements) {
    this._elements = elements;
  }
}

function toDOMElement(parameter) {
  if (helpers.isString(parameter)) {
    var div = document.createElement('div');
    div.innerHTML = parameter;
    return domHelpers.elementToFragment(div);
  }

  if (parameter instanceof Selection) {
    return domHelpers.arrayToFragment(parameter._elements);
  }

  return parameter;
}


Selection.prototype = {
  each: function(func) {
    each(this._elements, func);
    return this;
  },

  getCssProperty: function(prop) {
    var returnArray = [];
    this.each(function(elem) {
      returnArray.push(elem.style[prop]);
    });
    return returnArray;
  },

  setCssProperty: function(prop, value) {
    this.each(function(elem) {
      elem.style[prop] = value;
    });
    return this;
  },

  css: function(prop, val) {
    if (val) {
      return this.setCssProperty(prop, val);
    } else {
      return this.getCssProperty(prop);
    }
  },

  addClass: function(classname) {
    this.each(function() {
      this.classList.add(classname);
    });
    return this;
  },

  removeClass: function(classname) {
    this.each(function() {
      this.classList.remove(classname);
    });
    return this;
  },

  empty: function() {
    this.each(function() {
      this.innerHTML = '';
    });
    return this;
  },

  html: function(node) {
    this.empty();
    this.append(node);
    return this;
  },

  append: function(arg) {
    var node = toDOMElement(arg);
    this.each(function() {
      this.appendChild(node);
    });
    return this;
  },

  after: function(arg) {
    var node = toDOMElement(arg);
    this.each(function() {
      this.parentNode.insertBefore(node, this.nextSibling);
    });
  },

  before: function(arg) {
    var node = toDOMElement(arg);

    this.each(function() {
      this.parentNode.insertBefore(node, this);
    });
  },

  clone: function() {
    var returnSelection = new Selection();
    returnSelection._elements = this._elements;
    for (var i = 0; i < returnSelection._elements.length; i++) {
      returnSelection._elements[i] = returnSelection._elements[i].cloneNode(true);
    }

    return returnSelection;
  },

  add: function(selection) {
    this._elements = this._elements.concat(selection._elements);
    return this;
  },

  contains: function(elem) {
    for (var i = 0; i < this._elements.length; i++) {
      if (this._elements[i].isEqualNode(elem)) {
        return this._elements[i];
      }
    }
    return false;
  },

  on: function(type, fn) {
    this.each(function(el) {
      el.addEventListener(type, fn);
    });
  },

  off: function(type, fn) {
    this.each(function(el) {
      el.removeEventListener(type, fn);
    });
  }
};




module.exports = {
  findAll: function(query) {
    return new Selection(selectAll(query));
  },
  find: function(query) {
    return new Selection(selectSingle(query));
  }
};