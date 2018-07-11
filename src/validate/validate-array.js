import { validateByType } from "./validate-by-type";
import { getTypeInterface } from "@get";
import { get } from "@tools";

/**
 * @param {object} props
 * @param {any} props.data
 * @param {any} props.type
 * @param {array} props.pathname
 * @param {object} props.validators
*/
export function validateArray(props) {
  const typeInterface = getTypeInterface(props);
  const data = get(props.data, props.pathname);

  let i = -1;
  const n = typeInterface.length;

  const response = {
    value: [],
    data,
    type: props.type,
    isValid: true,
    invalid: [],
  };

  if (!Array.isArray(data)) {
    response.isValid = false;
    response.value = false;
  } else {
    while (++i < n) {
      let pathname = props.pathname.concat(i);

      let temp = validateByType({
        ...props,
        pathname,
        type: typeInterface[i],
      });

      if (i < data.length) {
        response.value[i] = temp.value;
      }

      if (!temp.isValid) {
        response.isValid = false;
        response.invalid.push({
          pathname: pathname.join("."),
          value: data[i],
          expected: typeof temp.type === "object"
            ? temp.type
            : typeInterface[i],
        });
      }
    }
  }

  return response;
}