const { DefinePlugin } = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

const promisify = require("util").promisify;
const temp = ".zrnqTXCAoIoxjs.js";
const spawn = require("child_process").spawn;
const unlink = promisify(require("fs").unlink);
const testFile = path.resolve(__dirname, "test", temp);
const nodeExternals = require("webpack-node-externals");

class RemoveTest {
  apply(compiler) {
    compiler.hooks.afterEmit.tap("Running tests", function () {
      console.log(testFile);
      const cmd = spawn("node", [testFile], { stdio: "inherit" });
      cmd.on("exit", function () {
        return unlink(testFile)
          .then(() => unlink(testFile + ".map"))
          .catch((err) => console.log(err));
      });
    });
  }
}

const resolve = {
  extensions: [".js"],
  alias: {
    "@constants": path.resolve(__dirname, "src/constants/index.js"),
    "@predicates": path.resolve(__dirname, "src/predicates/index.js"),
    "@verified": path.resolve(__dirname, "src/index.js"),
    "@validate": path.resolve(__dirname, "src/validate/index.js"),
    "@tools": path.resolve(__dirname, "src/tools/index.js"),
    "@get": path.resolve(__dirname, "src/get/index.js"),
    "@src": path.resolve(__dirname, "src/"),
  },
};

const test = {
  mode: "development",
  target: "node",
  devtool: "source-map",
  entry: "./test/index.js",

  output: {
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, "test"),
    filename: temp,
  },

  externals: [nodeExternals()],
  resolve,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["env"],
          plugins: [
            "transform-object-rest-spread",
          ],
        },
      },
    }],
  },

  plugins: [
    new RemoveTest(),
  ],
};

const def = {
  mode: process.env.NODE_ENV === "production"
    ? "production"
    : "development",

  entry: "./src/index.js",
  output: {
    libraryTarget: "commonjs2",
    libraryExport: "default",
    path: path.resolve(__dirname),
    filename: "index.js",
  },

  resolve,

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["env"],
          plugins: [
            "transform-object-rest-spread",
          ],
        },
      },
    }],
  },

  plugins: process.env.NODE_ENV === "production"
    ? [
      new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
      new UglifyJsPlugin(),
    ]
    : [
      new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
    ],
};

module.exports = process.env.NODE_ENV === "test" ? test : def;