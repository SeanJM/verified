import "source-map-support/register";
import tinyTest from "tiny-test";
import validatorTest from "./validator";
import getTypeInterfaceTest from "./get-type-interface";
import setTest from "./set";

tinyTest((test, load) => {
  validatorTest(test);
  getTypeInterfaceTest(test);
  setTest(test);
  load();
});