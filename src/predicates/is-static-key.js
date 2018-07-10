export function isStaticKey(value, key) {
  key = key.toString();
  return key.slice(-1) !== "?" && key[0] !== "[" && key.slice(-1) !== "]";
}