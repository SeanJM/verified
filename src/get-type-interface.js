import { keys } from "./keys";
import { INVALID } from "@constants";
import { getArrayType } from "./get-array-type";
import { get } from "./get";
import { validateInterface } from "./validate-interface";

import {
  isTypedKey,
  isOptionalKey,
  isOptionalTypedKey,
  isStaticKey
} from "@predicates";
import { isTypedArray } from "./predicates";

function getObjectTypeInterface(props) {
  const { pathname } = props;

  const type = props.type;
  const data = get(props.data, pathname);

  const dataKeys = keys(data);
  const typedKeys = keys(type, isTypedKey);
  const typedKeysStripped = typedKeys.map((a) => a.substring(1, a.length - 1));
  const optionalKeys = keys(type, isOptionalKey);
  const optionalKeysStripped = optionalKeys.map((a) => a.substring(0, a.length - 1));
  const optionalTypedKeys = keys(type, isOptionalTypedKey);
  const optionalTypedKeysStripped = optionalTypedKeys.map((a) => a.substring(1, a.length - 2));
  const staticKeys = keys(type, isStaticKey);
  const keysList = [];
  const dictionaryInterface = {};

  // Typed
  let i = -1;
  let n = typedKeys.length;
  while (++i < n) {
    let x = -1;
    const y = dataKeys.length;
    while (++x < y) {
      if (
        staticKeys.indexOf(dataKeys[x]) === -1 &&
        optionalKeysStripped.indexOf(dataKeys[x]) === -1
      ) {
        const isValid = validateInterface({
          type: typedKeysStripped[i],
          data: dataKeys[x],
          validators: props.validators,
          pathname: [],
        }).isValid;
        if (isValid) {
          keysList.push(dataKeys[x]);
          dictionaryInterface[dataKeys[x]] = type[typedKeys[i]];
        }
      }
    }
  }

  // Optional
  i = -1;
  n = optionalKeys.length;
  while (++i < n) {
    if (dataKeys.indexOf(optionalKeysStripped[i]) > -1) {
      keysList.push(optionalKeysStripped[i]);
      dictionaryInterface[optionalKeysStripped[i]] = type[optionalKeys[i]];
    }
  }

  // Optional typed
  i = -1;
  n = optionalTypedKeys.length;
  while (++i < n) {
    let x = -1;
    const y = dataKeys.length;
    while (++x < y) {
      if (keysList.indexOf(dataKeys[x]) === -1) {
        const isValid = validateInterface({
          type: optionalTypedKeysStripped[i],
          data: dataKeys[x],
          validators: props.validators,
          pathname: [],
        }).isValid;
        if (isValid) {
          keysList.push(dataKeys[x]);
          dictionaryInterface[dataKeys[x]] = type[optionalTypedKeys[i]];
        }
      }
    }
  }
  // Static
  i = -1;
  n = staticKeys.length;
  while (++i < n) {
    keysList.push(staticKeys[i]);
    dictionaryInterface[staticKeys[i]] = type[staticKeys[i]];
  }

  i = -1;
  n = dataKeys.length;
  while (++i < n) {
    if (keysList.indexOf(dataKeys[i]) === -1) {
      keysList.push(dataKeys[i]);
      dictionaryInterface[dataKeys[i]] = INVALID;
    }
  }

  return dictionaryInterface;
}

function getArrayTypeInterface(props) {
  const arrayType = getArrayType(props.type);
  const data = get(props.data, props.pathname);
  return Array.isArray(data) && data.length
    ? data.map(() => arrayType)
    : [arrayType];
}

/**
 * @param {object} props
 * @param {any} props.data
 * @param {any} props.type
 * @param {array} props.pathname
 * @param {object} props.validators
*/
export function getTypeInterface(props) {
  const { type } = props;
  if (isTypedArray(type)) {
    return getArrayTypeInterface(props);
  } else if (typeof type === "object") {
    return getObjectTypeInterface(props);
  }
  return type;
}
