export function isOptionalTypedKey(value, key) {
  key = key.toString();
  return key[0] === "[" && key.slice(-2)[0] === "]" && key.slice(-1) === "?";
}