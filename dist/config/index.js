"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _path = require("path");

let config = {
  "viewDir": (0, _path.join)(__dirname, "..", 'views'),
  "staticDir": (0, _path.join)(__dirname, "..", 'assets')
}; //will not built in dist

if (false) {
  console.log('tree shaking test');
}

if (process.env.NODE_ENV == 'development') {
  const localConfig = {
    port: 9000
  };
  config = (0, _lodash.extend)(config, localConfig);
}

if (process.env.NODE_ENV == 'production') {
  const prodConfig = {
    port: 9001
  };
  config = (0, _lodash.extend)(config, prodConfig);
}

var _default = config;
exports.default = _default;