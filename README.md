# Verified
A class for validating data created by me for [SafetyWing](https://www.safetywing.com/)

## Basic usage

```js
let v = new Verified({ name: "string" });

v.validate({
  name: "Sean MacIsaac"
});

-> {
  data: {
    name: "Sean MacIsaac"
  },
  type: {
    name: "string
  },
  isValid: true,
  invalid: [],
  value: {
    name: true,
  }
}
```
### Supported types

- `string`
- `number`
- `boolean`
- `object`
- `any`
- `null`
- `T[]`
- `Array<T>`

You can also use any literal value.

### Adding custom types

#### Global types

```js
Verified.create("Shoe", function (value) {
  return new Verified({
    size: "number",
    brand: "string"
  }).validate(value)
});

new Verified({
    shoes: "Shoe[]"
  })
  .validate({
    shoes: [
      {
        size: 12,
        brand: "Nike"
      },
      {
        size: 11,
        brand: "Asics"
      }
    ]
  });
```

#### Local types

This is a validation type which exists only on a specific instance of `Verified`

```js
const validator = new Verified({
  shoes: "Shoe[]",
}, {
  Shoe: function (value) {
    ...
  }
});
```

### Union types
```js
const validator = new Verified({
  "[string]": "Array<Shoe|string>"
});

validator.validate({
  shoes: [{ size: 12, brand: "Nike" }],
  fruits: ["Apple", "Carrots"],
});
```

#### Optional parameters

`parameter?`

#### Typed object keys

`[string]: { value: "string" }`

#### Optional typed object keys

`[string]?: { value: "string" }`