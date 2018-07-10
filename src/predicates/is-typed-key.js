export function isTypedKey(value, key) {
  key = key.toString();
  return key[0] === "[" && key.slice(-1) === "]";
}