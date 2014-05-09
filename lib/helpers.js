 function mixObjects(target, source) {
     var property, returnVal;

     returnVal = {};


     for (property in target) {
         if (target.hasOwnProperty(property)) {
             returnVal[property] = target[property];
         }
     }

     for (property in source) {
         if (source.hasOwnProperty(property)) {
             returnVal[property] = source[property];
         }
     }

     return returnVal;
 }


 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 // To make obj fully immutable, freeze each object in obj.
 // To do so, we use this function.

 function deepFreeze(o) {
     var prop, propKey;
     Object.freeze(o); // First freeze the object.
     for (propKey in o) {
         if ((!o.hasOwnProperty(propKey)) || (!(typeof o[propKey] === "object")) || Object.isFrozen(o[propKey])) {
             // If the object is on the prototype, not an object, or is already frozen, 
             // skip it. Note that this might leave an unfrozen reference somewhere in the
             // object if there is an already frozen object containing an unfrozen object.
             continue;
         }
         else{
         deepFreeze(o[propKey]); // Recursively call deepFreeze.
        }
      }
 }


 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 module.exports = {
     isString: function(param) {
         return typeof param === 'string' || param instanceof String;
     },

     each: function(el, fn) {
         for (var i = 0; i < el.length; i++) {
             fn.call(el[i], el[i]);
         }
     },

     deepFreeze: deepFreeze,
     mixObjects: mixObjects,


 };
