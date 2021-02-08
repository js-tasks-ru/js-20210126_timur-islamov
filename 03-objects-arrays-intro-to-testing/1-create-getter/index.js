/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const separatedPath = path.split('.');

  const getter = (target) => {
    const fieldName = separatedPath.shift();

    if (typeof target[fieldName] === 'object') {
      return getter(target[fieldName]);
    } else {
      return target[fieldName];
    }
  };

  return getter;
}
