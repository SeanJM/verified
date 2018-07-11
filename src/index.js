import { STATIC_VALIDATOR, INVALID } from "@constants";
import { validateByType } from "@validate";

export default class Validator {
  static create(object) {
    for (var name in object) {
      STATIC_VALIDATOR[name] = object[name];
    }
  }

  /**
   * @param {any} type The data to validate
   * @param {object=} validators The instance validators
   */
  constructor(type, validators) {
    this.validators = Object.assign({}, STATIC_VALIDATOR, validators);
    this.type = type;
  }

  extend(extendedType) {
    const extendedTypeResult = validateByType({
      validators: this.validators,
      type: extendedType,
      pathname: [],
      data: {},
    });

    const typeResult = validateByType({
      validators: this.validators,
      type: this.type,
      pathname: [],
      data: {},
    });

    if (typeof typeResult.type === "object" && typeof extendedTypeResult.type === "object") {
      this.type = Object.assign(
        typeResult.type,
        extendedTypeResult.type
      );
    } else if (typeof this.type === "object") {
      throw new Error("Cannot extend 'type' with current argument, an extended type must be an object.");
    } else if (typeof extendedTypeResult.type === "object") {
      throw new Error("Cannot extend 'type', your validator type is not an object.");
    } else {
      throw new Error("Cannot extend 'type', both the validator type and extended type are not objects.");
    }

    return this;
  }

  validate(data) {
    return validateByType({
      validators: this.validators,
      type: this.type,
      pathname: [],
      data,
    });
  }
}

Validator.INVALID = INVALID;