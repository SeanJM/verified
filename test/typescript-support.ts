/// <reference path="../index.d.ts" />
import Validator from "verified";

const v1 = new Validator("string").validate("Sean MacIsaac");
const v2 = new Validator("MaybeString", {
  MaybeString: function (value) {
    return typeof value === "string";
  },
  Phone: function (value) {
    return new Validator("number").validate(value);
  }
}).validate("Sean MacIsaac");
const v3 = new Validator({ firstName: "string" })
  .extend({ lastName: "string" })
  .validate({ firstName: "Sean", lastName: "MacIsaac" });

Validator.create({
  Address: function (value) {
    return new Validator({
      line1: "string"
    }).validate(value);
  },

  Date: "string"
});

console.log(v1.invalid)
console.log(v2.invalid)
console.log(v3.invalid)