import { validateByType } from "./validate-by-type";
import { getTypeInterface } from "@get";
import { get } from "@tools";
import { INVALID } from "@constants";

/**
 * @param {object} props
 * @param {any} props.data
 * @param {any} props.type
 * @param {array} props.pathname
 * @param {object} props.validators
*/
export function validateObject(props) {
  const type = getTypeInterface(props);

  const response = {
    value: {},
    data: props.data || {},
    type: props.type,
    isValid: true,
    invalid: [],
  };

  for (var k in type) {
    let pathname = props.pathname.concat(k);
    const pathString = pathname.join(".");

    let temp = validateByType({
      ...props,
      type: type[k],
      pathname,
    });
    response.value[k] = temp.value;

    if (!temp.isValid) {
      response.isValid = false;
      if (temp.invalid.length) {
        Array.prototype.push.apply(
          response.invalid,
          temp.invalid.map((invalid) => {
            if (invalid.pathname.substring(0, pathString.length) !== pathString) {
              invalid.pathname = [pathString, invalid.pathname].join(".");
            }
            return invalid;
          })
        );
      } else {
        response.invalid.push({
          pathname: pathString,
          value: get(props.data, pathname),
          expected: type[k] === INVALID ? undefined : type[k],
        });
      }
    }
  }

  return response;
}