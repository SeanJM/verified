import { validateArray } from "../src/validate-array";

export default function (test) {
  test("validateArray")
    .this(function () {
      const result = validateArray.call({
        type: "string[]",
        validators: {
          string: (value) => typeof value === "string",
        },
      }, ["Cat"]);
      return result;
    })
    .isDeepEqual(function () {
      return {
        value: [true],
        data: ["Cat"],
        type: "string[]",
        isValid: true,
        invalid: [],
      };
    });
}