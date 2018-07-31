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
  test("Custom validator: Custom validator as object with custom type", function () {
    const validator = new Validator({
      "food?": "Cake",
    }, {
      Flavor: "vanilla|chocolate",
      Cake: {
        flavor: "Flavor",
      },
    });

    const result = validator.validate({
      food: {
        flavor: "chocolate",
      },
    });

    console.log(result);

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
          "food?": "Cake",
        },
        isValid: true,
        invalid: [],
      };
    });

  test("Validator: Shoe", function () {
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

  test("Validator: Shoe, missing property", function () {
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

  test("Validator: Shoe, extra property", function () {
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

  test("Validator: Array of custom validator", function () {
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

  test("Validator: Array of custom validator (invalid)", function () {
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

  test("Validator: Union typed array (custom)", function () {
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

  test("Validator: custom validator (local)", function () {
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

  test("Validator: custom validator (invalid)", function () {
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
}