export function getArrayType(type) {
  if (type.substring(0, 6) === "Array<") {
    return type.substring(6, type.length - 1);
  }
  return type.substring(0, type.length - 2);
}