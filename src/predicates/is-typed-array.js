export function isTypedArray(type) {
  return typeof type === "string" &&
    (type.substring(0, 6) === "Array<" || type.slice(-2) === "[]");
}