import { INVALID } from "@constants";
import { validateObject } from "./validate-object";
import { validateArray } from "./validate-array";
import { validateInterface } from "./validate-interface";
import { isTypedArray } from "@predicates";
import { getTypeList } from "@get";

/**
 * @param {object} props
 * @param {any} props.data
 * @param {any} props.type
 * @param {array} props.pathname
 * @param {object} props.validators
*/
export function validateByType(props) {
  const { type, data } = props;

  if (type === INVALID) {
    return {
      data,
      value: false,
      isValid: false,
      invalid: [],
    };
  } else if (typeof type === "string") {
    const typeList = getTypeList(type);
    let i = -1;
    let temp;
    const n = typeList.length;

    while (++i < n) {
      if (isTypedArray(typeList[i])) {
        temp = validateArray({
          ...props,
          type: typeList[i],
        });
        if (temp.isValid) {
          temp.type =
            typeof temp.type === "object"
              ? temp.type
              : type;
          return temp;
        }
      } else {
        temp = validateInterface({
          ...props,
          type: typeList[i],
        });
        if (temp.isValid) {
          temp.type =
            typeof temp.type === "object"
              ? temp.type
              : type;
          return temp;
        }
      }
    }
    return temp;
  }
  return validateObject(props);
}