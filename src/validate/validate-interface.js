import { isValidationResponse } from "@predicates";
import { get } from "@tools";

function validateInterfaceType(props) {
  const { data, pathname, type, validators } = props;
  const value = get(data, pathname);
  const key = pathname.slice(-1)[0];
  const parent = get(data, pathname.slice(0, -1));
  const response = validators[type].call(props, value, key, parent);
  return isValidationResponse(response)
    ? {
      type: response.type,
      data,
      value: response.value,
      isValid: response.isValid,
      invalid: response.invalid,
    }
    : {
      type,
      data,
      value: response,
      isValid: response,
      invalid: [],
    };
}

/**
 * @param {object} props
 * @param {any} props.data
 * @param {any} props.type
 * @param {array} props.pathname
 * @param {object} props.validators
*/
export function validateInterface(props) {
  const { type, validators, pathname } = props;
  const data = get(props.data, pathname);
  const isValid = type === data;
  if (validators[type]) {
    return validateInterfaceType(props);
  }
  return {
    type,
    data,
    isValid,
    value: isValid,
    invalid: [],
  };
}