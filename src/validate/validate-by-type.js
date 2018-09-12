import { INVALID } from "@constants";
import { validateObject } from "./validate-object";
import { validateArray } from "./validate-array";
import { validateInterface } from "./validate-interface";
import { isTypedArray } from "@predicates";
import { getTypeList } from "@get";

function validateByTypeString(props) {
  const typeList = getTypeList(props.type);
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
            : props.type;
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
            : props.type;
        return temp;
      }
    }
  }
  return temp;
}

/**
 * @param {object} props
 * @param {any} props.data
 * @param {any} props.props.type
 * @param {array} props.pathname
 * @param {object} props.validators
*/
export function validateByType(props) {
  const { data } = props;
  if (props.type === INVALID) {
    return {
      data,
      value: false,
      isValid: false,
      invalid: [],
    };
  } else if (typeof props.type === "string") {
    props.type = props.type.replace(/(\s+|)\|(\s+|)/g, "|");
    return validateByTypeString(props);
  }
  return validateObject(props);
}