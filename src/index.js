import { STATIC_VALIDATOR, INVALID } from "@constants";
import { validateByType } from "./validate-by-type";

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