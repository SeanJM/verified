/**
 * A function which gets nested object properties
 * @param {Object} object The object to query
 * @param {array|string} path The object path
 * @return {any}
 */
export function set(object, path, value) {
  let i = -1;
  let ref = object;
  const n = path.length - 1;

  while (++i < n) {
    if (!ref[path[i]]) {
      ref[path[i]] = {};
    }
    ref = ref[path[i]];
  }

  ref[path[n]] = value;
  return value;
}