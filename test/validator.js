import Validator from "@verified";

Validator.create({
  "Shoe": function (data) {
    const validator = new Validator({
      size: "number",
      brand: "string",
    });
    return validator.validate(data);
  },
});

export default function (test) {
  const fn = function () { };
  test("Validator: function")
    .this(function () {
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

  test("Validator: string")
    .this(function () {
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

  test("Validator: string|number")
    .this(function () {
      const validator = new Validator("string|number");
      const result = validator.validate(1);
      return result;
    })
    .isDeepEqual(function () {
      return {
        type: "string|number",
        data: 1,
        isValid: true,
        invalid: [],
        value: true,
      };
    });

  test("Validator: string (invalid)")
    .this(function () {
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

  test("Validator: object with a string")
    .this(function () {
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

  test("Validator: object with a string (invalid)")
    .this(function () {
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

  test("Validator: object missing property")
    .this(function () {
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

  test("Validator: object extra property")
    .this(function () {
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

  test("Validator: object with a nested object (invalid)")
    .this(function () {
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

  test("Validator: Shoe")
    .this(function () {
      try {
        const validator = new Validator("Shoe");

        const result = validator.validate({
          size: 12,
          brand: "Nike",
        });

        return result;
      } catch (e) {
        console.log(e);
      }
    })
    .isDeepEqual(function () {
      return {
        data: {
          size: 12,
          brand: "Nike",
        },
        isValid: true,
        invalid: [],
        type: {
          size: "number",
          brand: "string",
        },
        value: {
          size: true,
          brand: true,
        },
      };
    });

  test("Validator: Shoe, missing property")
    .this(function () {
      const validator = new Validator("Shoe");

      const result = validator.validate({
        brand: "Nike",
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        data: {
          brand: "Nike",
        },
        isValid: false,
        invalid: [{
          pathname: "size",
          value: undefined,
          expected: "number",
        }],
        type: {
          size: "number",
          brand: "string",
        },
        value: {
          size: false,
          brand: true,
        },
      };
    });

  test("Validator: Shoe, extra property")
    .this(function () {
      try {
        const validator = new Validator("Shoe");

        const result = validator.validate({
          owner: "Sean",
          size: 13,
          brand: "Nike",
        });

        return result;
      } catch (err) {
        console.log(err);
      }
    })
    .isDeepEqual(function () {
      return {
        data: {
          owner: "Sean",
          size: 13,
          brand: "Nike",
        },
        isValid: false,
        invalid: [{
          pathname: "owner",
          value: "Sean",
          expected: undefined,
        }],
        type: {
          size: "number",
          brand: "string",
        },
        value: {
          owner: false,
          size: true,
          brand: true,
        },
      };
    });

  test("Validator: string, number")
    .this(function () {
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

  test("Validator: non existant 'any' property")
    .this(function () {
      const validator = new Validator({
        address: "any",
      });

      const result = validator.validate({
        name: "Sean",
        age: 34,
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        data: {
          name: "Sean",
          age: 34,
        },
        type: {
          address: "any",
        },
        isValid: false,
        invalid: [{
          pathname: "address",
          value: undefined,
          expected: "any",
        },
        {
          pathname: "name",
          value: "Sean",
          expected: undefined,
        },
        {
          pathname: "age",
          value: 34,
          expected: undefined,
        }],
        value: {
          name: false,
          age: false,
          address: false,
        },
      };
    });

  test("Validator: Object instead of Array - string[]")
    .this(function () {
      const validator = new Validator({
        list: "string[]",
      });

      const result = validator.validate({
        list: { 0: "string" },
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        value: {
          list: false,
        },
        data: {
          list: { 0: "string" },
        },
        type: {
          list: "string[]",
        },
        isValid: false,
        invalid: [{
          pathname: "list",
          value: {
            0: "string",
          },
          expected: "string[]",
        }],
      };
    });

  test("Validator: array of strings")
    .this(function () {
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

  test("Validator: array of strings (invalid)")
    .this(function () {
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

  test("Validator: array of any (any[])")
    .this(function () {
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

  test("Validator: array of undefined")
    .this(function () {
      try {
        const validator = new Validator({
          list: "undefined[]",
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
          list: "undefined[]",
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

  test("Validator: Array of custom validator")
    .this(function () {
      try {
        const validator = new Validator({
          cats: "Cat[]",
        }, {
          "Cat": function (value) {
            return new Validator({
              breed: "string",
              age: "number",
            }).validate(value);
          },
        });

        const result = validator.validate({
          cats: [{
            breed: "Short hair",
            age: 11,
          }, {
            breed: "Maincoon",
            age: 12,
          }],
        });

        return result;
      } catch (err) {
        console.log(err);
      }
    })
    .isDeepEqual(function () {
      return {
        type: {
          cats: "Cat[]",
        },
        data: {
          cats: [{
            breed: "Short hair",
            age: 11,
          }, {
            breed: "Maincoon",
            age: 12,
          }],
        },
        invalid: [],
        isValid: true,
        value: {
          cats: [{
            breed: true,
            age: true,
          }, {
            breed: true,
            age: true,
          }],
        },
      };
    });

  test("Validator: Array of custom validator (invalid)")
    .this(function () {
      try {
        const validator = new Validator("Shoe[]", {
          "Shoe": function (value) {
            return new Validator({
              size: "number",
              brand: "string",
            }).validate(value);
          },
        });

        const result = validator.validate([{
          size: 13,
        }]);

        return result;
      } catch (err) {
        console.log(err);
      }
    })
    .isDeepEqual(function () {
      return {
        type: "Shoe[]",
        data: [{
          size: 13,
        }],
        invalid: [{
          pathname: "0",
          value: { size: 13 },
          expected: {
            size: "number",
            brand: "string",
          },
        }],
        isValid: false,
        value: [{
          size: true,
          brand: false,
        }],
      };
    });

  test("Validator: string or number")
    .this(function () {
      const validator = new Validator({
        string: "string|number",
        number: "string|number",
        neither: "string|number",
      });

      const result = validator.validate({
        string: "string",
        number: 2,
        neither: null,
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        invalid: [{
          pathname: "neither",
          expected: "string|number",
          value: null,
        }],
        data: {
          string: "string",
          number: 2,
          neither: null,
        },
        type: {
          string: "string|number",
          number: "string|number",
          neither: "string|number",
        },
        isValid: false,
        value: {
          string: true,
          number: true,
          neither: false,
        },
      };
    });

  test("Validator: custom validator")
    .this(function () {
      const validator = new Validator({
        shoe: "Shoe",
      }, {
        "Shoe": function (value) {
          return new Validator({
            size: "number",
            brand: "string",
          }).validate(value);
        },
      });

      const result = validator.validate({
        shoe: {
          size: 13,
          brand: "Asics",
        },
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        data: {
          shoe: {
            size: 13,
            brand: "Asics",
          },
        },
        type: {
          shoe: "Shoe",
        },
        invalid: [],
        isValid: true,
        value: {
          shoe: {
            size: true,
            brand: true,
          },
        },
      };
    });

  test("Validator: Union typed array")
    .this(function () {
      const validator = new Validator({
        "[string]": "Array<Shoe|string>",
      });

      const result = validator.validate({
        shoes: [{ size: 12, brand: "Nike" }],
        fruits: ["Apple", "Carrots"],
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        invalid: [],
        type: {
          "[string]": "Array<Shoe|string>",
        },
        data: {
          shoes: [{ size: 12, brand: "Nike" }],
          fruits: ["Apple", "Carrots"],
        },
        value: {
          shoes: [{
            size: true,
            brand: true,
          }],
          fruits: [true, true],
        },
        isValid: true,
      };
    });

  test("Validator: nested string")
    .this(function () {
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

  test("Validator: nested string (invalid)")
    .this(function () {
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

  test("Validator: nested array")
    .this(function () {
      const v = new Validator({
        nested: {
          list: "string[]",
        },
      });

      const result = v.validate({
        nested: {
          list: ["value"],
        },
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        invalid: [],
        type: {
          nested: {
            list: "string[]",
          },
        },
        data: {
          nested: {
            list: ["value"],
          },
        },
        isValid: true,
        value: {
          nested: {
            list: [true],
          },
        },
      };
    });

  test("Validator: extra property")
    .this(function () {
      const validator = new Validator({
        exists: "string",
      });

      const result = validator.validate({
        exists: "yes",
        throw: "yes",
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        invalid: [{
          pathname: "throw",
          value: "yes",
          expected: undefined,
        }],
        type: {
          exists: "string",
        },
        data: {
          exists: "yes",
          throw: "yes",
        },
        isValid: false,
        value: {
          exists: true,
          throw: false,
        },
      };
    });

  test("Validator: mixed values array")
    .this(function () {
      const validator = new Validator({
        list: "Array<string|number>",
      });

      const result = validator.validate({
        list: ["string", 12],
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        invalid: [],
        type: {
          list: "Array<string|number>",
        },
        data: {
          list: ["string", 12],
        },
        isValid: true,
        value: {
          list: [true, true],
        },
      };
    });

  test("Validator: mixed values array (invalid)")
    .this(function () {
      const validator = new Validator({
        list: "Array<string|number>",
      });

      const result = validator.validate({
        list: ["string", 12, undefined],
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        invalid: [{
          pathname: "list.2",
          value: undefined,
          expected: "string|number",
        }],
        type: {
          list: "Array<string|number>",
        },
        data: {
          list: ["string", 12, undefined],
        },
        isValid: false,
        value: {
          list: [true, true, false],
        },
      };
    });

  test("Validator: empty array - Array<string>")
    .this(function () {
      const validator = new Validator({
        list: "Array<string>",
      });

      const result = validator.validate({
        list: [],
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        invalid: [{
          pathname: "list.0",
          value: undefined,
          expected: "string",
        }],
        type: {
          list: "Array<string>",
        },
        data: {
          list: [],
        },
        isValid: false,
        value: {
          list: [],
        },
      };
    });

  test("Validator: custom validator (invalid)")
    .this(function () {
      const validator = new Validator({
        shoe: "Shoe",
      });

      const result = validator.validate({
        shoe: {
          brand: "Asics",
        },
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        type: {
          shoe: "Shoe",
        },
        data: {
          shoe: {
            brand: "Asics",
          },
        },
        invalid: [{
          pathname: "shoe.size",
          value: undefined,
          expected: "number",
        }],
        isValid: false,
        value: {
          shoe: {
            size: false,
            brand: true,
          },
        },
      };
    });

  test("Validator: Exact string (Asics)")
    .this(function () {
      const validator = new Validator("Asics");
      const result = validator.validate("Asics");
      return result;
    })
    .isDeepEqual(function () {
      return {
        invalid: [],
        type: "Asics",
        data: "Asics",
        isValid: true,
        value: true,
      };
    });

  test("Validator: Exact or string (Asics|Nike)")
    .this(function () {
      try {
        const validator = new Validator({
          shoe1: "Asics|Nike",
          shoe2: "Asics|Nike",
        });

        const result = validator.validate({
          shoe1: "Asics",
          shoe2: "Nike",
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
          shoe1: "Asics|Nike",
          shoe2: "Asics|Nike",
        },
        data: {
          shoe1: "Asics",
          shoe2: "Nike",
        },
        isValid: true,
        value: {
          shoe1: true,
          shoe2: true,
        },
      };
    });

  test("Validator: Shopping cart item")
    .this(function () {
      const validated = new Validator({
        person: {
          userID: "number",
          firstName: "string",
          lastName: "string",
        },
        shoppingCart: {
          item: "Array<ShoppingCartItem>",
          isRequired: "null",
          isSubmitted: "boolean",
        },
      }, {
        ShoppingCartItem: function (value) {
          return new Validator({
            id: "number",
            title: "string",
          })
            .validate(value);
        },
      });

      const result = validated.validate({
        person: {
          userID: 108292,
          firstName: "Sean",
          lastName: "MacIsaac",
        },
        shoppingCart: {
          item: [{
            id: 1,
            title: "Nintendo switch",
          }],
          isRequired: null,
          isSubmitted: false,
        },
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        invalid: [],
        type: {
          person: {
            userID: "number",
            firstName: "string",
            lastName: "string",
          },
          shoppingCart: {
            item: "Array<ShoppingCartItem>",
            isRequired: "null",
            isSubmitted: "boolean",
          },
        },
        data: {
          person: {
            userID: 108292,
            firstName: "Sean",
            lastName: "MacIsaac",
          },
          shoppingCart: {
            item: [{
              id: 1,
              title: "Nintendo switch",
            }],
            isRequired: null,
            isSubmitted: false,
          },
        },
        isValid: true,
        value: {
          person: {
            userID: true,
            firstName: true,
            lastName: true,
          },
          shoppingCart: {
            item: [{
              id: true,
              title: true,
            }],
            isRequired: true,
            isSubmitted: true,
          },
        },
      };
    });

  test("Validator: Optional parameter")
    .this(function () {
      const validator = new Validator({
        firstName: "string",
        "lastName?": "string",
        "middleName?": "string",
      });

      const result = validator.validate({
        firstName: "Sean",
        middleName: "Alexander",
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        invalid: [],
        isValid: true,
        data: {
          firstName: "Sean",
          middleName: "Alexander",
        },
        type: {
          firstName: "string",
          "lastName?": "string",
          "middleName?": "string",
        },
        value: {
          firstName: true,
          middleName: true,
        },
      };
    });

  test("Validator: Array<string> - property is undefined")
    .this(function () {
      const validator = new Validator({
        value: "Array<string>",
      });

      const result = validator.validate({});

      return result;
    })
    .isDeepEqual(function () {
      return {
        data: {},
        type: {
          value: "Array<string>",
        },
        isValid: false,
        invalid: [{
          pathname: "value",
          value: undefined,
          expected: "Array<string>",
        }],
        value: {
          value: false,
        },
      };
    });

  test("Validator: string[] - property is undefined")
    .this(function () {
      const validated = new Validator({
        value: "string[]",
      });

      const result = validated.validate({});

      return result;
    })
    .isDeepEqual(function () {
      return {
        data: {},
        isValid: false,
        invalid: [{
          pathname: "value",
          value: undefined,
          expected: "string[]",
        }],
        type: {
          value: "string[]",
        },
        value: {
          value: false,
        },
      };
    });

  test("Validator: 'data' is undefined")
    .this(function () {
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

  test("Validator: typed key '[string]'")
    .this(function () {
      const validator = new Validator({
        "[string]": "number",
        "something?": "string",
      });

      const result = validator.validate({
        anything: 1,
        something: "Sean",
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        isValid: true,
        invalid: [],
        data: {
          anything: 1,
          something: "Sean",
        },
        type: {
          "[string]": "number",
          "something?": "string",
        },
        value: {
          anything: true,
          something: true,
        },
      };
    });

  test("Validator: Optional typed key '[string]' - with keys")
    .this(function () {
      const validator = new Validator({
        "[string]?": "string",
      });

      const result = validator.validate({
        name: "Sean",
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        isValid: true,
        invalid: [],
        type: {
          "[string]?": "string",
        },
        data: {
          name: "Sean",
        },
        value: {
          name: true,
        },
      };
    });

  test("Validator: Optional typed key - empty object")
    .this(function () {
      const validator = new Validator({
        "[string]?": "string",
      });

      const result = validator.validate({});

      return result;
    })
    .isDeepEqual(function () {
      return {
        isValid: true,
        invalid: [],
        type: {
          "[string]?": "string",
        },
        data: {},
        value: {},
      };
    });

  test("Validator: Optional typed key - invalid")
    .this(function () {
      const validator = new Validator({
        "[string]?": "number",
      });

      const result = validator.validate({
        name: "Sean",
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        isValid: false,
        invalid: [{
          pathname: "name",
          value: "Sean",
          expected: "number",
        }],
        type: {
          "[string]?": "number",
        },
        data: {
          name: "Sean",
        },
        value: {
          name: false,
        },
      };
    });

  test("Validator: Optional typed key - with siblings")
    .this(function () {
      const validator = new Validator({
        gender: "male|female",
        favoriteFruits: "Array<Apples|Chery>",
        "[string]?": "string",
      });

      const result = validator.validate({
        name: "Sean",
        gender: "male",
        favoriteFruits: ["Apples"],
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        isValid: true,
        invalid: [],
        type: {
          gender: "male|female",
          favoriteFruits: "Array<Apples|Chery>",
          "[string]?": "string",
        },
        data: {
          name: "Sean",
          gender: "male",
          favoriteFruits: ["Apples"],
        },
        value: {
          gender: true,
          name: true,
          favoriteFruits: [true],
        },
      };
    });

  test("Validator: Optional typed key - with siblings (invalid)")
    .this(function () {
      const validator = new Validator({
        gender: "male|female",
        favoriteFruits: "Array<Apples|Chery>",
        "[string]?": "string",
      });

      const result = validator.validate({
        firstName: "Sean",
        age: 13,
        gender: "male",
        favoriteFruits: ["Apples"],
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        isValid: false,
        invalid: [{
          pathname: "age",
          value: 13,
          expected: "string",
        }],
        type: {
          gender: "male|female",
          favoriteFruits: "Array<Apples|Chery>",
          "[string]?": "string",
        },
        data: {
          firstName: "Sean",
          age: 13,
          gender: "male",
          favoriteFruits: ["Apples"],
        },
        value: {
          gender: true,
          age: false,
          firstName: true,
          favoriteFruits: [true],
        },
      };
    });

  test("Validator: Optional typed key")
    .this(function () {
      const validator = new Validator({
        "[number]?": "object",
      });

      const result = validator.validate({
        0: {},
        "1": {},
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        isValid: true,
        invalid: [],
        type: {
          "[number]?": "object",
        },
        data: {
          0: {},
          "1": {},
        },
        value: {
          0: true,
          1: true,
        },
      };
    });

  test("Validator: object '[string]: object'")
    .this(function () {
      const validator = new Validator({
        "[string]": {
          age: "number",
          name: "string",
          "favoriteMeal?": "string",
        },
      });

      const result = validator.validate({
        user1: {
          age: 34,
          name: "Sean",
        },
        user2: {
          age: 31,
          name: "Tim",
          home: "Canada",
        },
        user3: {
          age: 31,
          name: "Tim",
          favoriteMeal: "Spaghetti",
        },
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        isValid: false,
        invalid: [{
          pathname: "user2.home",
          value: "Canada",
          expected: undefined,
        }],
        type: {
          "[string]": {
            age: "number",
            name: "string",
            "favoriteMeal?": "string",
          },
        },
        data: {
          user1: {
            age: 34,
            name: "Sean",
          },
          user2: {
            age: 31,
            name: "Tim",
            home: "Canada",
          },
          user3: {
            age: 31,
            name: "Tim",
            favoriteMeal: "Spaghetti",
          },
        },
        value: {
          user1: {
            age: true,
            name: true,
          },
          user2: {
            age: true,
            name: true,
            home: false,
          },
          user3: {
            favoriteMeal: true,
            age: true,
            name: true,
          },
        },
      };
    });

  test("Validator: object null")
    .this(function () {
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

  test("Validator: false value")
    .this(function () {
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

  test("Validator: Fixed length array")
    .this(function () {
      const validator = new Validator([{
        name: "string",
      }, {
        name: "string",
      }]);

      const result = validator.validate([{
        name: "Sean",
      }, {
        name: "John",
      }]);

      return result;
    })
    .isDeepEqual(function () {
      return {
        isValid: true,
        invalid: [],
        type: [{
          name: "string",
        }, {
          name: "string",
        }],
        data: [{
          name: "Sean",
        }, {
          name: "John",
        }],
        value: [{ name: true }, { name: true }],
      };
    });

  test("Validator: Fixed length array (invalid)")
    .this(function () {
      const validator = new Validator([{
        name: "string",
      }, {
        name: "string",
      }]);

      const result = validator.validate([{
        name: "Sean",
      }, {
        name: "John",
      }, {
        name: "Jim",
      }]);

      return result;
    })
    .isDeepEqual(function () {
      return {
        isValid: false,
        invalid: [{
          pathname: "2",
          value: {
            name: "Jim",
          },
          expected: undefined,
        }],
        type: [{
          name: "string",
        }, {
          name: "string",
        }],
        data: [{
          name: "Sean",
        }, {
          name: "John",
        }, {
          name: "Jim",
        }],
        value: [{ name: true }, { name: true }, false],
      };
    });

  test("Validator: Fixed length array, custom type (invalid)")
    .this(function () {
      const validator = new Validator(["Person", "Person"], {
        Person: function (value) {
          return new Validator({ name: "string" }).validate(value);
        },
      });

      const result = validator.validate([{
        name: "Sean",
      }, {
        name: "John",
      }, {
        name: "Jim",
      }]);

      return result;
    })
    .isDeepEqual(function () {
      return {
        isValid: false,
        invalid: [{
          pathname: "2",
          value: {
            name: "Jim",
          },
          expected: undefined,
        }],
        type: ["Person", "Person"],
        data: [{
          name: "Sean",
        }, {
          name: "John",
        }, {
          name: "Jim",
        }],
        value: [{ name: true }, { name: true }, false],
      };
    });

  test("Validator: Boolean")
    .this(function () {
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

  test("Validator: Custom validator as object")
    .this(function () {
      const validator = new Validator({
        food: "Cake",
      }, {
        Cake: {
          flavor: "string",
        },
      });

      const result = validator.validate({
        food: {
          flavor: "chocolate",
        },
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        value: {
          food: {
            flavor: true,
          },
        },
        data: {
          food: {
            flavor: "chocolate",
          },
        },
        type: {
          food: "Cake",
        },
        isValid: true,
        invalid: [],
      };
    });

  test("Validator: Invalid object")
    .this(function () {
      try {
        const validator = new Validator({
          address: {
            city: "Montreal",
            country: "CA",
            line1: "2171 Rue Sherbrooke Est",
            line2: "",
            state: "Quebec",
            zipCode: "H2K1C8",
          },
          citizenshipCountry: "CA",
          homeCountry: "CA",
        });

        const result = validator.validate({
          consentToMarketingAndConditions: true,
        });

        return result;
      } catch (e) {
        console.log(e);
      }
    })
    .isDeepEqual(function () {
      return {
        isValid: false,
        type: {
          address: {
            city: "Montreal",
            country: "CA",
            line1: "2171 Rue Sherbrooke Est",
            line2: "",
            state: "Quebec",
            zipCode: "H2K1C8",
          },
          citizenshipCountry: "CA",
          homeCountry: "CA",
        },
        invalid: [{
          pathname: "address.city",
          value: undefined,
          expected: "Montreal",
        }, {
          pathname: "address.country",
          value: undefined,
          expected: "CA",
        }, {
          pathname: "address.line1",
          value: undefined,
          expected: "2171 Rue Sherbrooke Est",
        }, {
          pathname: "address.line2",
          value: undefined,
          expected: "",
        }, {
          pathname: "address.state",
          value: undefined,
          expected: "Quebec",
        }, {
          pathname: "address.zipCode",
          value: undefined,
          expected: "H2K1C8",
        }, {
          pathname: "citizenshipCountry",
          value: undefined,
          expected: "CA",
        }, {
          pathname: "homeCountry",
          value: undefined,
          expected: "CA",
        }, {
          pathname: "consentToMarketingAndConditions",
          value: true,
          expected: undefined,
        }],
        data: {
          consentToMarketingAndConditions: true,
        },
        value: {
          address: {
            city: false,
            country: false,
            line1: false,
            line2: false,
            state: false,
            zipCode: false,
          },
          citizenshipCountry: false,
          homeCountry: false,
          consentToMarketingAndConditions: false,
        },
      };
    });

  test("Validator: ACID Test (pass)")
    .this(function () {
      const validator = new Validator({
        cats: "Cat[]",
        owner: "Owner",
      }, {
        Address: function (value) {
          return new Validator({
            line1: "string",
            "line1?": "string",
            country: "string",
            state: "string",
            city: "string",
            zipCode: "ZipCode",
          }, this.validators).validate(value);
        },

        ZipCode: function (value) {
          return /^[0-9]{5}$/.test(value);
        },

        CatFood: function (value) {
          return [
            "WholeHearted",
            "Hill's",
            "Merrick",
            "Natural Balance",
            "Blue Buffalo",
          ].indexOf(value) > -1;
        },

        Cat: function (value) {
          return new Validator({
            name: "string",
            age: "number",
            breed: "CatBreed",
            catFood: "CatFood",
            "siblings?": "Array<Cat>",
          }, this.validators)
            .validate(value);
        },

        CatBreed: function (value) {
          return [
            "Abyssinian",
            "Siamese",
            "Devon Rex",
            "European Shorthair",
          ].indexOf(value) > -1;
        },

        Contact: function (value) {
          return new Validator({
            firstName: "string",
            lastName: "string",
            relationship: "string",
            phoneNumber: "string",
            "emailAddress?": "Email",
          }, this.validators).validate(value);
        },

        Email: function (value) {
          return /@[a-z]+\.([a-z]{2}|[a-z]{3})$/.test(value);
        },

        Owner: function (value) {
          return new Validator({
            firstName: "string",
            lastName: "string",
            age: "number|string",
            address: "Address",
            emergencyContacts: "Contact[]",
          }, this.validators).validate(value);
        },
      })
        .validate({
          cats: [{
            name: "Sammy",
            age: 12,
            breed: "Siamese",
            catFood: "WholeHearted",
            siblings: [{
              name: "Jerry",
              age: 12,
              breed: "Siamese",
              catFood: "WholeHearted",
            }],
          }, {
            name: "Lynx",
            age: 18,
            breed: "Abyssinian",
            catFood: "Blue Buffalo",
          }, {
            name: "Mittens",
            age: 3,
            breed: "European Shorthair",
            catFood: "Natural Balance",
            siblings: [{
              name: "Boots",
              age: 3,
              breed: "European Shorthair",
              catFood: "Natural Balance",
            }],
          }],
          owner: {
            firstName: "John",
            lastName: "Arbuckle",
            age: 39,
            emergencyContacts: [{
              firstName: "Maryse",
              lastName: "Arbuckle",
              relationship: "Mother",
              phoneNumber: "613 734 7245",
              emailAddress: "marysearbuckle@gmail.com",
            }, {
              firstName: "David",
              lastName: "Arbuckle",
              relationship: "Fatjer",
              phoneNumber: "613 734 7245",
            }],
            address: {
              line1: "75 Sunshine City Street",
              country: "United States of America",
              state: "New York",
              city: "New York",
              zipCode: "32456",
            },
          },
        });
      return validator.isValid;
    })
    .isEqual(function () {
      return true;
    });

  test("Validator: ACID Test (fail)")
    .this(function () {
      const validator = new Validator({
        cats: "Cat[]",
        owner: "Owner",
      }, {
        Address: function (value) {
          return new Validator({
            line1: "string",
            "line1?": "string",
            country: "string",
            state: "string",
            city: "string",
            zipCode: "ZipCode",
          }, this.validators).validate(value);
        },

        ZipCode: function (value) {
          return /^[0-9]{5}$/.test(value);
        },

        CatFood: function (value) {
          return [
            "WholeHearted",
            "Hill's",
            "Merrick",
            "Natural Balance",
            "Blue Buffalo",
          ].indexOf(value) > -1;
        },

        Cat: function (value) {
          return new Validator({
            name: "string",
            age: "number",
            breed: "CatBreed",
            catFood: "CatFood",
            "siblings?": "Array<Cat>",
          }, this.validators)
            .validate(value);
        },

        CatBreed: function (value) {
          return [
            "Abyssinian",
            "Siamese",
            "Devon Rex",
            "European Shorthair",
          ].indexOf(value) > -1;
        },

        Contact: function (value) {
          return new Validator({
            firstName: "string",
            lastName: "string",
            relationship: "string",
            phoneNumber: "string",
            "emailAddress?": "Email",
          }, this.validators).validate(value);
        },

        Email: function (value) {
          return /@[a-z]+\.([a-z]{2}|[a-z]{3})$/.test(value);
        },

        Owner: function (value) {
          return new Validator({
            firstName: "string",
            lastName: "string",
            age: "number|string",
            address: "Address",
            emergencyContacts: "Contact[]",
          }, this.validators).validate(value);
        },
      })
        .validate({
          cats: [{
            // Removed 'age' to fail the ACID test
            name: "Sammy",
            breed: "Siamese",
            catFood: "WholeHearted",
            siblings: [{
              name: "Jerry",
              age: 12,
              breed: "Siamese",
              catFood: "WholeHearted",
            }],
          }, {
            name: "Lynx",
            age: 18,
            breed: "Abyssinian",
            catFood: "Blue Buffalo",
          }, {
            name: "Mittens",
            age: 3,
            breed: "European Shorthair",
            catFood: "Natural Balance",
            siblings: [{
              name: "Boots",
              age: 3,
              breed: "European Shorthair",
              catFood: "Natural Balance",
            }],
          }],
          owner: {
            firstName: "John",
            lastName: "Arbuckle",
            age: 39,
            emergencyContacts: [{
              firstName: "Maryse",
              lastName: "Arbuckle",
              relationship: "Mother",
              phoneNumber: "613 734 7245",
              emailAddress: "marysearbuckle@gmail.com",
            }, {
              firstName: "David",
              lastName: "Arbuckle",
              relationship: "Fatjer",
              phoneNumber: "613 734 7245",
            }],
            address: {
              line1: "75 Sunshine City Street",
              country: "United States of America",
              state: "New York",
              city: "New York",
              zipCode: "32456",
            },
          },
        });
      return validator.isValid;
    })
    .isEqual(function () {
      return false;
    });
}