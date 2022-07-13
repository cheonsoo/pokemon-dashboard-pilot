"use strict";

const { resolve } = require("path");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  mode: "development",

  resolve: {
    extensions: [".mjs", ".jsx", ".js"]
  },

  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules\/@babel/ },
      {
        test: /\.mjs$/,
        type: "javascript/auto",
        exclude: /node_modules\/@babel/
      }
    ]
  }
};
