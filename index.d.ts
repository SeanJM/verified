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

interface Validators {
  [key: string]: (value: any, key: string, parent: any) => ValidatorResponse | boolean
}

declare module "verified" {
  class Validator {
    constructor(type: any, validators?: Validators);
    validate(type: any): ValidatorResponse;
  }

  export default Validator;
}