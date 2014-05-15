"use strict";

//Defined by mocha
/* global describe: false */
/* global it: false */

//Should tests are allowed
/* jshint -W030 */

//var domHelpers = require('../lib/domHelpers');
require('should');
var find = require('../../').find;
var findAll = require('../../').findAll;


describe('selectorAPI', function() {

  describe('#size()', function() {
    it('should return the right number of elements', function() {
      find(document.body).append('<div class="div1"></div><div class="div1"></div><div class="div1"></div>');
      findAll('.div1').size().should.be.exactly(3);
      findAll('div').size().should.be.exactly(3);
    });
  });
});