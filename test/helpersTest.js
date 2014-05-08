var helpers = require('../lib/helpers');
var should = require('should')



describe('helpers', function() {
    describe('#isString()', function() {

        it('should return true if a string', function() {
            helpers.isString('hello').should.be.true;
        });

        it('should return false if an Object', function() {
            helpers.isString(new Object()).should.be.false;
            helpers.isString(new Array()).should.be.false;
            helpers.isString([1, 2, 3]).should.be.false;
        });

        it('should return false for special values', function() {
            helpers.isString(undefined).should.be.false;
            helpers.isString(null).should.be.false;
            helpers.isString(false).should.be.false;
            helpers.isString(true).should.be.false;
        });
    });
});