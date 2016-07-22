'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function isType(typeName) {
  return function type(o) {
    return Object.prototype.toString.call(o) === '[object ' + typeName + ']';
  };
}

var isString = isType('String');
var isObject = isType('Object');
var isArray = isType('Array');
var isFunction = isType('Function');

function includes(array, value) {
  return array.indexOf(value) > -1;
}

exports.isString = isString;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.includes = includes;