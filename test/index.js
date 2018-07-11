import "source-map-support/register";
import tinyTest from "tiny-test";
import validatorTest from "./validator";
import extendValidatorTest from "./extend-validator";
import getTypeInterfaceTest from "./get-type-interface";

tinyTest((test, load) => {
  validatorTest(test);
  extendValidatorTest(test);
  getTypeInterfaceTest(test);
  load();
});