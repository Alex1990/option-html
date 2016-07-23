function isType(typeName) {
  return function type(o) {
    return Object.prototype.toString.call(o) === `[object ${typeName}]`;
  };
}

const isObject = isType('Object');
const isArray = isType('Array');
const isFunction = isType('Function');

function includes(array, value) {
  let ret = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      ret = true;
    }
  }
  return ret;
}

export {
  isObject,
  isArray,
  isFunction,
  includes,
};
