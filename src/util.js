function isType(typeName) {
  return function type(o) {
    return Object.prototype.toString.call(o) === `[object ${typeName}]`;
  };
}

const isObject = isType('Object');
const isArray = isType('Array');
const isFunction = isType('Function');

function includes(array, value) {
  return array.indexOf(value) > -1;
}

export {
  isObject,
  isArray,
  isFunction,
  includes,
};
