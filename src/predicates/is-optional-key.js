export function isOptionalKey(value, key) {
  key = key.toString();
  return key.slice(-1) === "?" && key.slice(-2) !== "]" && key[0] !== "[";
}