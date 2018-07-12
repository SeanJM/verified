# Verified
A class for validating data created by me for [SafetyWing](https://www.safetywing.com/)

## Supported types

- `string`
- `number`
- `boolean`
- `object`
- `any`
- `null`
- `undefined`
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
    ...
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