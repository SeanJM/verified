import Validator from "@verified";

export default function (test) {
  test("Validator: object with a string", function () {
    try {
      const validator = new Validator({
        value: "string",
      });

      const result = validator.validate({
        value: "Sean",
      });

      return result;
    } catch (e) {
      console.log(e);
    }
  })
    .isDeepEqual(function () {
      return {
        data: { value: "Sean" },
        isValid: true,
        invalid: [],
        type: { value: "string" },
        value: { value: true },
      };
    });

  test("Validator: object with a string (invalid)", function () {
    const validator = new Validator({
      value: "string",
    });

    const result = validator.validate({
      value: 123,
    });

    return result;
  })
    .isDeepEqual(function () {
      return {
        data: { value: 123 },
        isValid: false,
        invalid: [{
          pathname: "value",
          value: 123,
          expected: "string",
        }],
        type: { value: "string" },
        value: { value: false },
      };
    });

  test("Validator: object missing property", function () {
    const validator = new Validator({
      firstName: "string",
      lastName: "string",
    });

    const result = validator.validate({
      firstName: "Sean",
    });

    return result;
  })
    .isDeepEqual(function () {
      return {
        data: {
          firstName: "Sean",
        },
        isValid: false,
        invalid: [{
          pathname: "lastName",
          value: undefined,
          expected: "string",
        }],
        type: {
          firstName: "string",
          lastName: "string",
        },
        value: {
          firstName: true,
          lastName: false,
        },
      };
    });

  test("Validator: object extra property", function () {
    const validator = new Validator({
      firstName: "string",
    });

    const result = validator.validate({
      firstName: "Sean",
      lastName: "MacIsaac",
    });

    return result;
  })
    .isDeepEqual(function () {
      return {
        data: {
          firstName: "Sean",
          lastName: "MacIsaac",
        },
        isValid: false,
        invalid: [{
          pathname: "lastName",
          value: "MacIsaac",
          expected: undefined,
        }],
        type: {
          firstName: "string",
        },
        value: {
          firstName: true,
          lastName: false,
        },
      };
    });

  test("Validator: object with a nested object (invalid)", function () {
    const validator = new Validator({
      value: {
        nested: "string",
      },
    });

    const result = validator.validate({
      value: {
        nested: 123,
      },
    });

    return result;
  })
    .isDeepEqual(function () {
      return {
        data: {
          value: {
            nested: 123,
          },
        },
        isValid: false,
        invalid: [{
          pathname: "value.nested",
          value: 123,
          expected: "string",
        }],
        type: {
          value: {
            nested: "string",
          },
        },
        value: {
          value: {
            nested: false,
          },
        },
      };
    });

  test("Validator: Object nested string", function () {
    const validator = new Validator({
      nested: {
        string: "string",
      },
    });

    const result = validator.validate({
      nested: {
        string: "value",
      },
    });

    return result;
  })
    .isDeepEqual(function () {
      return {
        invalid: [],
        type: {
          nested: {
            string: "string",
          },
        },
        data: {
          nested: {
            string: "value",
          },
        },
        isValid: true,
        value: {
          nested: {
            string: true,
          },
        },
      };
    });

  test("Validator: Object nested string (invalid)", function () {
    const validator = new Validator({
      nested: {
        string: "string",
      },
    });

    const result = validator.validate({
      nested: {
        string: null,
      },
    });

    return result;
  })
    .isDeepEqual(function () {
      return {
        invalid: [{
          pathname: "nested.string",
          value: null,
          expected: "string",
        }],
        data: {
          nested: {
            string: null,
          },
        },
        type: {
          nested: {
            string: "string",
          },
        },
        isValid: false,
        value: {
          nested: {
            string: false,
          },
        },
      };
    });

  test("Validator: Object nested false", function () {
    const validator = new Validator({
      nested: false,
    });

    const result = validator.validate({
      nested: false,
    });

    return result;
  })
    .isDeepEqual(function () {
      return {
        "value": {
          "nested": true,
        },
        "data": {
          "nested": false,
        },
        "type": {
          "nested": false,
        },
        "isValid": true,
        "invalid": [],
      };
    });
}