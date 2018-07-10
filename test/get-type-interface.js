import { getTypeInterface } from "../src/get-type-interface";

export default function (test) {
  test("getTypeInterface")
    .this(function () {
      const result = getTypeInterface({
        data: {
          cat: "meow",
        },
        type: {
          cat: "string",
        },
        pathname: [],
        validators: {
          string: function (value) {
            return typeof value === "string";
          },
        },
      });
      return result;
    })
    .isDeepEqual(function () {
      return {
        cat: "string",
      };
    });

  test("getTypeInterface: nested with pathname")
    .this(function () {
      const result = getTypeInterface({
        data: {
          value: {
            cat: "meow",
          },
        },
        type: {
          cat: "string",
        },
        pathname: ["value"],
        validators: {
          string: function (value) {
            return typeof value === "string";
          },
        },
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        cat: "string",
      };
    });
}