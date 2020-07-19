"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Books = _interopRequireDefault(require("@models/Books"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ApiController {
  constructor() {}

  async actionIndex(ctx, next) {
    const books = new _Books.default();
    const result = await books.getData();
    ctx.body = {
      result
    };
  }

}

;
var _default = ApiController;
exports.default = _default;