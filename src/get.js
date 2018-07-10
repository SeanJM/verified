/**
 * A function which gets nested object properties
 * @param {Object} object The object to query
 * @param {array|string} path The object path
 * @return {any}
 */
export function get(object, path) {
  const normalizedPath = [].concat(path).join(".").split(".");
  let i = -1;
  let ref = object;
  const n = normalizedPath.length - 1;

  if (!path.length || !object) {
    return object;
  }

  while (++i < n) {
    if (ref[normalizedPath[i]]) {
      ref = ref[normalizedPath[i]];
    } else {
      return ref[normalizedPath[i]];
    }
  }
  return ref[normalizedPath[n]];
}