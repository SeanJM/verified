const INVALID = "INVALID_etp6O8lrqzOK";

const STATIC_VALIDATOR = {
  "any": function ({ key, data }) {
    return (
      !Array.isArray(data) && typeof data === "object"
        ? data.hasOwnProperty(key)
        : true
    );
  },

  "string": function ({ value }) {
    return typeof value === "string";
  },

  "number": function ({ value }) {
    return typeof value === "number";
  },

  "numberString": function ({ value }) {
    // "1" is a number
    // 1 is a number
    return typeof value === "string" && !isNaN(Number(value));
  },

  "null": function ({ value }) {
    return value == null;
  },

  "undefined": function ({ value }) {
    return typeof value === "undefined";
  },

  "boolean": function ({ value }) {
    return typeof value === "boolean";
  },

  "object": function ({ value }) {
    return typeof value === "object" && !Array.isArray(value);
  },
};

/**
 * A function which gets nested object properties
 * @param {Object} object The object to query
 * @param {array|string} path The object path
 * @return {any}
 */
function get(object, path) {
  const normalizedPath = [].concat(path).join(".").split(".");
  let i = -1;
  let ref = object;
  const n = normalizedPath.length - 1;
  while (++i < n) {
    if (ref[normalizedPath[i]]) {
      ref = ref[normalizedPath[i]];
    } else {
      return ref[normalizedPath[i]];
    }
  }
  return ref[normalizedPath[n]];
}

function getKeyValues(paths, path, value) {
  const keys = [];
  if (!Array.isArray(value) && typeof value === "object") {
    for (var k in value) {
      if (value.hasOwnProperty(k)) {
        getKeyValues(paths, path.concat(k), value[k]);
        keys.push(k);
      }
    }
    if (!keys.length) {
      path.push(value);
      paths.push(path);
    }
  } else {
    path.push(value);
    paths.push(path);
  }
}

function getPaths(object) {
  const paths = [];
  getKeyValues(paths, [], object);
  return paths;
}

function getInvalidPaths(value, data, dictionaryInterface) {
  const list = [];
  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      const index = i.toString();
      let type = dictionaryInterface[index.toString()];

      if (item === false) {
        if (this.validators[type]) {
          type = this.validators[type].call(this, { value }).dictionary;
        }

        list.push({
          pathname: index,
          value: data[index],
          expected: type === INVALID ? undefined : type,
        });
      }
    });
  } else {
    getPaths(value)
      .filter((a) => {
        const path = a.slice(0, -1);
        const result = a.slice(-1)[0];
        const type = get(dictionaryInterface, path);
        const value = get(data, path);
        if (Array.isArray(value)) {
          return !new Validator(type, this.validators).validate(value).isValid;
        }
        return result === false;
      })
      .forEach((a) => {
        const pathlist = a.slice(0, a.length - 1);
        let pathname;
        let value;
        let typeList;
        let type;
        let expected;

        while (pathlist.length) {
          pathname = pathlist.join(".");
          value = get(data, pathname);
          type = get(dictionaryInterface, pathname);
          typeList = type ? getTypeList(type) : [];
          expected = [];

          typeList.forEach((typeElement) => {
            const result = new Validator(typeElement, this.validators).validate(value);
            if (isValidationResponse(result)) {
              expected.push(result.dictionary);
            } else {
              expected.push(typeElement);
            }
          });

          expected = expected.map((a) => a === INVALID ? undefined : a);
          expected = expected.length > 1 ? expected : expected[0];

          if (value || type) {
            list.push({
              pathname,
              value,
              expected,
            });
            return;
          }

          pathlist.pop();
        }
      });
  }
  return list;
}

function reduceValidator(key) {
  return function (value) {
    return isValidationResponse(value) ? value[key] : value;
  };
}

function keys(object, predicate) {
  const list = [];
  for (var k in object) {
    k = isNaN(Number(k)) ? k : Number(k);
    if (object.hasOwnProperty(k)) {
      if (predicate) {
        if (predicate(object[k], k)) {
          list.push(k);
        }
      } else {
        list.push(k);
      }
    }
  }
  return list;
}

function validateType(props) {
  const { type, value } = props;
  let result = type === value;
  if (this.validators[type]) {
    result = this.validators[type].call(this, props);
  }
  return result;
}

function validateComplexArray(complexType, value, data) {
  const type = complexType.substring(6, complexType.length - 1);
  let i = -1;
  const n = value.length;
  const map = [];
  while (++i < n) {
    map[i] = validatePropertyType.call(this, {
      type,
      value: value[i],
      data,
    });
  }
  if (n === 0) {
    return validatePropertyType.call(this, {
      type,
      data,
    });
  }
  return map;
}

function validateSimpleArray({ type, value, data }) {
  let i = -1;
  const n = value.length;
  const map = [];
  type = type.substring(0, type.length - 2);
  while (++i < n) {
    map[i] = validateType.call(this, {
      type,
      value: value[i],
      data,
    });
  }
  if (n === 0) {
    return validatePropertyType.call(this, {
      type,
      data,
    });
  }
  return map;
}

function isValidationResponse(res) {
  return (
    typeof res === "object" &&
    res.hasOwnProperty("value") &&
    res.hasOwnProperty("isValid") &&
    res.hasOwnProperty("invalid") &&
    res.hasOwnProperty("data")
  );
}

function isTypedKey(value, key) {
  key = key.toString();
  return key[0] === "[" && key.slice(-1) === "]";
}

function isOptionalTypedKey(value, key) {
  key = key.toString();
  return key[0] === "[" && key.slice(-2)[0] === "]" && key.slice(-1) === "?";
}

function isOptionalKey(value, key) {
  key = key.toString();
  return key.slice(-1) === "?" && key.slice(-2) !== "]" && key[0] !== "[";
}

function isStaticKey(value, key) {
  key = key.toString();
  return key.slice(-1) !== "?" && key[0] !== "[" && key.slice(-1) !== "]";
}

function getTypeList(type) {
  const typeList = [];
  let i = -1;
  const n = type.length;
  while (++i < n) {
    if (type.substring(i, i + 6) === "Array<") {
      let start = i;
      let o = 1;
      i += 6;
      while (++i < n && o) {
        if (type[i] === "<") {
          o += 1;
        } else if (type[i] === ">") {
          o -= 1;
        }
      }
      typeList.push(type.substring(start, i));
    } else {
      let start = i;
      while (i < n && type[i] !== "|") {
        i += 1;
      }
      typeList.push(type.substring(start, i));
    }
  }
  return typeList;
}

function validateEachPropertyType(props) {
  const { type, value } = props;
  const isSimpleArray = type.slice(-2) === "[]";
  const isComplexArray = type.substring(0, 5) === "Array";
  if (value && Array.isArray(value)) {
    if (isSimpleArray) {
      return validateSimpleArray.call(this, props);
    } else if (isComplexArray) {
      return validateComplexArray.call(this, props);
    }
  }
  return validateType.call(this, props);
}

function validatePropertyType(props) {
  const { type, value, data } = props;
  const isValid = reduceValidator("isValid");
  const typeList = getTypeList(type);
  let i = -1;
  const n = typeList.length;
  let temp;

  while (++i < n) {
    temp = validateEachPropertyType.call(this, {
      type: typeList[i],
      value,
      data,
    });
    if (isValid(temp)) {
      return temp;
    }
  }

  return isValidationResponse(temp)
    ? temp
    : false;
}

function validateNestedType(property, type, value) {
  return new Validator(type, this.validators).validate(value);
}

/**
 * validateProperty
 * @param {object} props
 * @param {string} props.key
 * @param {string|object} props.type
 * @param {string|object} props.data
 * @returns {any} Validator result or boolean
 */
function validateProperty(props) {
  const { type, value } = props;
  if (typeof type === "string") {
    return validatePropertyType.call(this, props);
  } else if (typeof type === "object") {
    return validateNestedType.call(this, props);
  } else if (typeof type === "function") {
    return type(props);
  }
  return type === value;
}

/**
 * Converts the validator object to its 'working' form
 * @param {Object} dictionary
 * @returns {Object} Converted dictionary interface
 */
function getDictionaryInterface(data) {
  const dataKeys = keys(data);
  const typedKeys = keys(this.dictionary, isTypedKey);
  const typedKeysStripped = typedKeys.map((a) => a.substring(1, a.length - 1));
  const optionalKeys = keys(this.dictionary, isOptionalKey);
  const optionalKeysStripped = optionalKeys.map((a) => a.substring(0, a.length - 1));
  const optionalTypedKeys = keys(this.dictionary, isOptionalTypedKey);
  const optionalTypedKeysStripped = optionalTypedKeys.map((a) => a.substring(1, a.length - 2));
  const staticKeys = keys(this.dictionary, isStaticKey);
  const keysList = [];
  const dictionaryInterface = {};

  // Typed
  let i = -1;
  let n = typedKeys.length;
  while (++i < n) {
    let x = -1;
    const y = dataKeys.length;
    const validator = new Validator({ key: typedKeysStripped[i] });
    while (++x < y) {
      if (
        staticKeys.indexOf(dataKeys[x]) === -1 &&
        optionalKeysStripped.indexOf(dataKeys[x]) === -1
      ) {
        if (validator.validate({ key: dataKeys[x] }).isValid) {
          keysList.push(dataKeys[x]);
          dictionaryInterface[dataKeys[x]] = this.dictionary[typedKeys[i]];
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
      dictionaryInterface[optionalKeysStripped[i]] = this.dictionary[optionalKeys[i]];
    }
  }

  // Optional typed
  i = -1;
  n = optionalTypedKeys.length;
  while (++i < n) {
    const validator = new Validator({ key: optionalTypedKeysStripped[i] });
    let x = -1;
    const y = dataKeys.length;
    while (++x < y) {
      if (keysList.indexOf(dataKeys[x]) === -1) {
        if (validator.validate({ key: dataKeys[x] }).isValid) {
          keysList.push(dataKeys[x]);
          dictionaryInterface[dataKeys[x]] = this.dictionary[optionalTypedKeys[i]];
        }
      }
    }
  }

  // Static
  i = -1;
  n = staticKeys.length;
  while (++i < n) {
    keysList.push(staticKeys[i]);
    dictionaryInterface[staticKeys[i]] = this.dictionary[staticKeys[i]];
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

export default class Validator {
  static create(object) {
    for (var name in object) {
      STATIC_VALIDATOR[name] = object[name];
    }
  }

  /**
   * @param {object} dictionary The data to validate
   * @param {object=} validators The instance validators
   */
  constructor(dictionary, validators) {
    this.validators = Object.assign({}, STATIC_VALIDATOR, validators);
    this.dictionary = dictionary;
  }

  validateArray(data) {
    const res = {
      data: data,
      isValid: true,
      invalid: [],
      dictionary: this.dictionary,
      value: validateProperty.call(this, {
        type: this.dictionary,
        value: data,
        data: data,
      }),
    };
    return res;
  }

  validateObject(data) {
    const res = {
      data,
      isValid: true,
      invalid: [],
      dictionary: this.dictionary,
      value: {},
    };

    let dictionaryInterface = typeof data === "object" && getDictionaryInterface.call(this, data);
    const dictionaryKeys = keys(dictionaryInterface);

    let i = -1;
    const n = dictionaryKeys.length;

    while (++i < n) {
      let temp = validateProperty.call(this, {
        key: dictionaryKeys[i],
        type: dictionaryInterface[dictionaryKeys[i]],
        value: data[dictionaryKeys[i]],
        data,
      });

      if (Array.isArray(temp)) {
        res.value[dictionaryKeys[i]] = temp.map(reduceValidator("value"));
      } else {
        res.value[dictionaryKeys[i]] = temp;
      }

      if (isValidationResponse(temp)) {
        res.value[dictionaryKeys[i]] = temp.value;
        if (!temp.isValid) {
          res.isValid = false;
        }
      } else if (Array.isArray(temp)) {
        if (temp.map(reduceValidator("isValid")).filter((a) => !a).length) {
          res.isValid = false;
        }
      } else if (!temp) {
        res.isValid = false;
      }
    }

    res.invalid = getInvalidPaths.call(this, res.value, data, dictionaryInterface);
    return res;
  }

  validate(data) {
    if (typeof data === "object" && typeof this.dictionary === "object") {
      return this.validateObject(data);
    } else if (Array.isArray(data)) {
      return this.validateArray(data);
    }
    return validateProperty.call(this, {
      type: this.dictionary,
      value: data,
      data,
    });
  }
}

Validator.INVALID = INVALID;