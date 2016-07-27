'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function isType(typeName) {
  return function type(o) {
    return Object.prototype.toString.call(o) === '[object ' + typeName + ']';
  };
}

var isNumber = isType('Number');
var isString = isType('String');
var isObject = isType('Object');
var isArray = isType('Array');
var isFunction = isType('Function');

function includes(array, value) {
  var ret = false;
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      ret = true;
    }
  }
  return ret;
}

exports.isNumber = isNumber;
exports.isString = isString;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.includes = includes;