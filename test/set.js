import { set } from "@src/set";

export default function (test) {
  test("set: simple")
    .this(function () {
      const v = {};
      set(v, ["heaven"], "test");
      return v.heaven;
    })
    .isEqual(function () {
      return "test";
    });

  test("set: missing key")
    .this(function () {
      const v = {};
      set(v, ["heaven", "above"], "test");
      return v.heaven.above;
    })
    .isEqual(function () {
      return "test";
    });
}