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

console.log(v1.invalid)
console.log(v2.invalid)