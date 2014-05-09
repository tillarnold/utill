//Defined by mocha
/* global describe: false */
/* global it: false */

//Should tests are allowed
/* jshint -W030 */

var helpers = require('../lib/helpers');
require('should');



describe('helpers', function() {
    describe('#isString()', function() {

        it('should return true if a string', function() {
            helpers.isString('hello').should.be.true;
        });

        it('should return true for a empty string', function() {
            helpers.isString('').should.be.true;
        });

        it('should return false if an Object', function() {
            helpers.isString({}).should.be.false;
            helpers.isString([]).should.be.false;
            helpers.isString([1, 2, 3]).should.be.false;
        });

        it('should return false for undefined', function() {
            helpers.isString(undefined).should.be.false;
            helpers.isString().should.be.false;
        });

        it('should return false for null', function() {
            helpers.isString(null).should.be.false;
        });

        it('should return false for booleans', function() {
            helpers.isString(false).should.be.false;
            helpers.isString(true).should.be.false;
        });

        it('should return false for arrays', function() {
            helpers.isString([1, 500, {}, "123", "", 5]).should.be.false;
            helpers.isString([]).should.be.false;
            helpers.isString(["Hello world"]).should.be.false;
        });

        it('should return false for numbers', function() {
            helpers.isString(-5).should.be.false;
            helpers.isString(42).should.be.false;
            helpers.isString(196882).should.be.false;
        });

    });

    describe('#mixObjects()', function() {

        var object1 = {
            name: 'My Name',
            age: 42,
            location: 'GB',
            o: 'This value should be replaced'
        };
        var object2 = {
            myFunction: function() {
                return arguments;
            },
            prop: {
                test: 'value',
                material: 'stone'
            },
            o: 1000
        };
        var mixedObject = helpers.mixObjects(object1, object2);

        it('should have all properties', function() {

            mixedObject.should.have.property('name');
            mixedObject.should.have.property('age');
            mixedObject.should.have.property('location');
            mixedObject.should.have.property('o');
            mixedObject.should.have.property('myFunction');
            mixedObject.should.have.property('prop');
            mixedObject.prop.should.have.property('test');
            mixedObject.prop.should.have.property('material');
        });

        it('should mixin functions correctly', function() {
            mixedObject.myFunction().should.be.arguments;
        });

        it('should prefere the property values from the second object', function() {
            mixedObject.o.should.be.exactly(1000);
        });

        it('should not mofify the original objects', function() {
            object1.should.eql({
                name: 'My Name',
                age: 42,
                location: 'GB',
                o: 'This value should be replaced'
            });

            object2.should.eql({
                myFunction: object2.myFunction,
                prop: {
                    test: 'value',
                    material: 'stone'
                },
                o: 1000
            });
        });

    });
    describe('#each()', function() {
        it('should iterate Array', function() {
            var startArray = [123,
                function() {}, 'hello world', []
            ];

            var outArray = [];
            helpers.each(startArray, function(el) {
                outArray.push(el);
            });

            startArray.should.eql(outArray);

        });

        it('should iterate arguments', function() {
            function test() {
                var resultArray = [];
                helpers.each(arguments, function(el) {
                    resultArray.push(el);
                });

                resultArray.should.eql([
                    [1, 2, 3], 'hello', 42, {}
                ]);

            }

            test([1, 2, 3], 'hello', 42, {});

        });

    });
});