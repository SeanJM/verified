import Validator from "@verified";

Validator.create({
  Cat(value) {
    return new Validator({
      name: "string",
      age: "number",
      breed: "string",
    }).validate(value);
  },
  CreditCard(value) {
    return new Validator({
      creditCardNumber: "string",
      creditCardExpiryMonth: "string",
      creditCardExpiryYear: "string",
    }).validate(value);
  },
});

export default function (test) {
  test("Validator: extend")
    .this(function () {
      const validator = new Validator({
        firstName: "string",
        lastName: "string",
      }).extend("CreditCard");

      const result = validator.validate({
        firstName: "Sean",
        lastName: "MacIsaac",
        creditCardNumber: "450010001000",
        creditCardExpiryMonth: "05",
        creditCardExpiryYear: "22",
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        value: {
          firstName: true,
          lastName: true,
          creditCardNumber: true,
          creditCardExpiryMonth: true,
          creditCardExpiryYear: true,
        },
        data: {
          firstName: "Sean",
          lastName: "MacIsaac",
          creditCardNumber: "450010001000",
          creditCardExpiryMonth: "05",
          creditCardExpiryYear: "22",
        },
        type: {
          firstName: "string",
          lastName: "string",
          creditCardNumber: "string",
          creditCardExpiryMonth: "string",
          creditCardExpiryYear: "string",
        },
        isValid: true,
        invalid: [],
      };
    });

  test("Validator: extend object")
    .this(function () {
      const validator = new Validator({
        firstName: "string",
        lastName: "string",
      }).extend({
        dateOfBirth: "string",
      });

      const result = validator.validate({
        firstName: "Sean",
        lastName: "MacIsaac",
        dateOfBirth: "1984-08-13",
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        value: {
          firstName: true,
          lastName: true,
          dateOfBirth: true,
        },
        data: {
          firstName: "Sean",
          lastName: "MacIsaac",
          dateOfBirth: "1984-08-13",
        },
        type: {
          firstName: "string",
          lastName: "string",
          dateOfBirth: "string",
        },
        isValid: true,
        invalid: [],
      };
    });

  test("Validator: literal type")
    .this(function () {
      const validator = new Validator("Cat").extend({
        favoriteFood: "string",
      });

      const result = validator.validate({
        name: "Fluffy",
        breed: "Siamese",
        age: 7,
        favoriteFood: "Whiskas",
      });

      return result;
    })
    .isDeepEqual(function () {
      return {
        value: {
          name: true,
          age: true,
          breed: true,
          favoriteFood: true,
        },
        data: {
          name: "Fluffy",
          breed: "Siamese",
          age: 7,
          favoriteFood: "Whiskas",
        },
        type: {
          name: "string",
          breed: "string",
          age: "number",
          favoriteFood: "string",
        },
        isValid: true,
        invalid: [],
      };
    });

  test("Validator: invalid arg, neither types are objects")
    .this(function () {
      try {
        new Validator("string").extend("number");
      } catch (e) {
        return e.message;
      }
    })
    .isDeepEqual(function () {
      return "Cannot extend 'type', both the validator type and extended type are not objects.";
    });

  test("Validator: invalid arg, extend type is string")
    .this(function () {
      try {
        new Validator({ name: "string" }).extend("number");
      } catch (e) {
        return e.message;
      }
    })
    .isDeepEqual(function () {
      return "Cannot extend 'type' with current argument, an extended type must be an object.";
    });

  test("Validator: invalid arg, this.type is string")
    .this(function () {
      try {
        new Validator("string").extend({ name: "string" });
      } catch (e) {
        return e.message;
      }
    })
    .isDeepEqual(function () {
      return "Cannot extend 'type', your validator type is not an object.";
    });
}