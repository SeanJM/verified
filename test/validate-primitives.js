import Validator from "@verified";

export default function (test) {
  const fn = function () { };
  test("Validator: function", function () {
    const validator = new Validator("function");
    const result = validator.validate(fn);
    return result;
  })
    .isDeepEqual(function () {
      return {
        type: "function",
        data: fn,
        isValid: true,
        invalid: [],
        value: true,
      };
    });

  test("Validator: string", function () {
    const validator = new Validator("string");
    const result = validator.validate("Sean");
    return result;
  })
    .isDeepEqual(function () {
      return {
        type: "string",
        data: "Sean",
        isValid: true,
        invalid: [],
        value: true,
      };
    });

  test("Validator: string (invalid)", function () {
    const validator = new Validator("string");
    const result = validator.validate(123);
    return result;
  })
    .isDeepEqual(function () {
      return {
        type: "string",
        data: 123,
        isValid: false,
        invalid: [],
        value: false,
      };
    });

  test("Validator: string, number", function () {
    const validator = new Validator({
      name: "string",
      age: "number",
    });

    const result = validator.validate({
      name: "Sean",
      age: 34,
    });

    return result;
  })
    .isDeepEqual(function () {
      return {
        invalid: [],
        type: {
          name: "string",
          age: "number",
        },
        data: {
          name: "Sean",
          age: 34,
        },
        isValid: true,
        value: {
          name: true,
          age: true,
        },
      };
    });

  test("Validator: array of strings", function () {
    try {
      const validator = new Validator("string[]");

      const result = validator.validate([
        "Sean",
        "Duncan",
      ]);

      return result;
    } catch (e) {
      console.log(e);
    }
  })
    .isDeepEqual(function () {
      return {
        invalid: [],
        type: "string[]",
        data: [
          "Sean",
          "Duncan",
        ],
        isValid: true,
        value: [true, true],
      };
    });

  test("Validator: array of strings (invalid)", function () {
    try {
      const validator = new Validator("string[]");

      const result = validator.validate([
        1,
        "Duncan",
      ]);

      return result;
    } catch (err) {
      console.log(err);
    }
  })
    .isDeepEqual(function () {
      return {
        invalid: [{
          pathname: "0",
          value: 1,
          expected: "string",
        }],
        type: "string[]",
        data: [
          1,
          "Duncan",
        ],
        isValid: false,
        value: [false, true],
      };
    });

  test("Validator: false", function () {
    const validator = new Validator(false);
    const result = validator.validate(false);
    return result;
  })
    .isDeepEqual(function () {
      return {
        type: false,
        data: false,
        isValid: true,
        invalid: [],
        value: true,
      };
    });

  test("Validator: true", function () {
    const validator = new Validator(true);
    const result = validator.validate(true);
    return result;
  })
    .isDeepEqual(function () {
      return {
        type: true,
        data: true,
        isValid: true,
        invalid: [],
        value: true,
      };
    });

  test("Validator: array of any (any[])", function () {
    try {
      const validator = new Validator({
        list: "any[]",
      });

      const result = validator.validate({
        list: [],
      });

      return result;
    } catch (e) {
      console.log(e);
    }
  })
    .isDeepEqual(function () {
      return {
        invalid: [],
        type: {
          list: "any[]",
        },
        data: {
          list: [],
        },
        isValid: true,
        value: {
          list: [],
        },
      };
    });

  test("Validator: 'data' is undefined", function () {
    try {
      const validator = new Validator({
        value: "string",
      });

      const result = validator.validate();

      return result;
    } catch (e) {
      console.log(e);
    }
  })
    .isDeepEqual(function () {
      return {
        data: {},
        isValid: false,
        type: {
          value: "string",
        },
        invalid: [{
          pathname: "value",
          value: undefined,
          expected: "string",
        }],
        value: {
          value: false,
        },
      };
    });

  test("Validator: object null", function () {
    const validator = new Validator({
      id: "any",
      value: "any",
    });

    const result = validator.validate({
      id: null,
      value: null,
    });

    return result;
  })
    .isDeepEqual(function () {
      return {
        isValid: true,
        invalid: [],
        data: {
          id: null,
          value: null,
        },
        type: {
          id: "any",
          value: "any",
        },
        value: {
          id: true,
          value: true,
        },
      };
    });

  test("Validator: false value", function () {
    const validator = new Validator({
      id: "boolean",
    });

    const result = validator.validate({
      id: false,
    });

    return result;
  })
    .isDeepEqual(function () {
      return {
        isValid: true,
        invalid: [],
        data: {
          id: false,
        },
        type: {
          id: "boolean",
        },
        value: {
          id: true,
        },
      };
    });

  test("Validator: Boolean", function () {
    const validator = new Validator({
      bool: "boolean",
    });

    const result = validator.validate({
      bool: false,
    });

    return result;
  })
    .isDeepEqual(function () {
      return {
        isValid: true,
        invalid: [],
        type: {
          bool: "boolean",
        },
        data: {
          bool: false,
        },
        value: {
          bool: true,
        },
      };
    });
}