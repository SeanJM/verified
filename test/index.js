import "source-map-support/register";
import tinyTest from "tiny-test";
import customValidators from "./custom-validators";
import extendValidatorTest from "./extend-validator";
import getTypeInterfaceTest from "./get-type-interface";
import objectTest from "./object";
import validatePrimitives from "./validate-primitives";
import validatorTest from "./validator";

tinyTest((test, load) => {
  customValidators(test);
  extendValidatorTest(test);
  getTypeInterfaceTest(test);
  objectTest(test);
  validatorTest(test);
  validatePrimitives(test);
  load();
});