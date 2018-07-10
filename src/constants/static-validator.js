export const STATIC_VALIDATOR = {
  "any": function (data, key, rootData) {
    return (
      !Array.isArray(rootData) && typeof rootData === "object"
        ? rootData.hasOwnProperty(key)
        : true
    );
  },

  "string": function (data) {
    return typeof data === "string";
  },

  "number": function (data) {
    return typeof data === "number";
  },

  "numberString": function (data) {
    // "1" is a number
    // 1 is a number
    return typeof data === "string" && !isNaN(Number(data));
  },

  "null": function (data) {
    return data == null;
  },

  "undefined": function (data) {
    return typeof data === "undefined";
  },

  "boolean": function (data) {
    return typeof data === "boolean";
  },

  "object": function (data) {
    return typeof data === "object" && !Array.isArray(data);
  },
};