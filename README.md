# Verified (13.7k minified)
A class for validating data created by me for [SafetyWing](https://www.safetywing.com/)

## Supported types

- `string`
- `number`
- `boolean`
- `object`
- `any`
- `null`
- `undefined`
- `function`
- `T[]`
- `Array<T>`

You can also use any literal value.

## Usage
```js
import Validator from "verified";
const isString = new Validator("string");
const isNumber = new Validator("number");
const isList = new Validator("any[]");
const isObject = new Validator("object");

isString.validate("Cat").isValid -> true
isNumber.validate(0).isValid -> true
isList.validate([0, 1, 2, 3]).isValid -> true
isObject.validate({ cat: "Meow" }).isValid -> true
```

### A more detailed example
```js
import Validator from "verified";

// Let's imagine we have some data coming from the user on our server
const types = {
  "UserID": function (value) {
    return /^A([0-9]{5}|[0-9]{8})$/.test(value);
  },

  "FullName": function (value) {
    return /^[A-Z][a-z]+ [A-Z][a-z]+$/.test(value);
  },

  "ZipCode": function (value) {
    return /^[0-9]${5}/.test(value);
  },

  "PostalCode": function (value) {
    return /^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/.test(value);
  },

  "Date": function (value) {
    return new Date(value).toString() !== "Invalid Date";
  },

  "MedicalHistory": {
    doctor: "string",
    reason: "string",
    date: "Date",
    hospital: "string",
  }
};

const validator = new Validator({
  userID: "UserID",
  fullName: "FullName",
  zipCode: "ZipCode|PostalCode",
  medicalHistory: "MedicalHistory[]",
});
```

## Object structure

### Valid

```js
import Validator from "verified";
let v = new Validator({
  name: "string"
});

v.validate({
  name: "Sean MacIsaac"
});

-> {
  value: {
    name: true
  },
  data: {
    name: "Sean MacIsaac"
  },
  type: {
    name: "string"
  },
  isValid: true,
  invalid: []
}
```

### Invalid

When an object is invalidated, you will get a list of the invalid values and their paths.

```js
import Validator from "verified";
let v = new Validator({
  name: "string"
});

v.validate({
  name: undefined
});

-> {
  value: {
    name: false
  },
  data: {
    name: undefined
  },
  type: {
    name: "string"
  },
  isValid: false,
  invalid: [{
    pathname: "name",
    value: undefined,
    expected: "string"
  }]
}
```

## Custom types

You can create custom types to reduce repetive boilerplate

### Global types

```js
Validator.create({
  Shoe: function (value) {
    const types = {
      size: "number",
      brand: "string"
    };
    return new Validator(types).validate(value)
  }
});
```

Or you can define the type literally

```js
Validator.create({
  Shoe: {
    size: "number",
    brand: "string"
  }
});
```

```js
new Validator({
  shoes: "Shoe[]"
})
  .validate({
    shoes: [{
      size: 12,
      brand: "Nike"
    }, {
      size: 11,
      brand: "Asics"
    }]
  });

-> {
  value: {
    shoes: [{
      size: true,
      brand: true
    }, {
      size: true,
      brand: true
    }]
  },
  data: {
    shoes: [{
      size: 12,
      brand: "Nike"
    }, {
      size: 11,
      brand: "Asics"
    }]
  },
  type: {
    shoes: "Shoe[]"
  },
  isValid: true,
  invalid: []
}
```

### Local types

This is a validation type which exists only on a specific instance of `Validator`

```js
const validator = new Validator({
  shoes: "Shoe[]",
}, {
  Shoe: function (value) {
    const types = {
      size: "number",
      brand: "string"
    };
    return new Validator(types).validate(value)
  },
  // Or as an object literal
  Boot: {
    size: "number",
    brand: "string",
    season: "string"
  }
});
```

### Union types
```js
const validator = new Validator({
  "[string]": "Array<Shoe|string>"
});

validator.validate({
  shoes: [{
    size: 12,
    brand: "Nike"
  }],
  fruits: [
    "Apple",
    "Carrots"
  ],
});
```

#### Optional parameters

`parameter?`

#### Typed object keys

`[string]: { value: "string" }`

#### Optional typed object keys

`[string]?: { value: "string" }`

## Extending types
Sometimes we want to share properties from one type to the next, extending a type allows you to do just that.

```js
Validator.create({
  Boot: function (value) {
    return new Validator({
      type: "string"
    })
  }
});

const validator = new Validator("Shoe").extend("Boot");

validator.validate({
  size: 13,
  brand: "Nike",
  type: "Hiking",
});
```