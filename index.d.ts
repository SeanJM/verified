interface Invalid {
  pathname: string;
  expected: any;
  value: any;
}

interface ValidatorResponse {
  data: any;
  type: any;
  value: any;
  invalid: Array<Invalid | void>;
  isValid: boolean;
}

type ValidatorFunction = (value: any, key: string, parent: any) => ValidatorResponse | boolean;

type ValidatorInterface = ValidatorFunction | any;

interface Validators {
  [key: string]: ValidatorInterface
}

declare module "verified" {
  class Validator {
    static create(validators: Validators);
    constructor(type: any, validators?: Validators);
    validate(type: any): ValidatorResponse;
    extend(type: any): this;
  }

  export default Validator;
}