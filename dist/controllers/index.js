"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaSimpleRouter = _interopRequireDefault(require("koa-simple-router"));

var _BooksController = _interopRequireDefault(require("@controllers/BooksController"));

var _IndexController = _interopRequireDefault(require("@controllers/IndexController"));

var _ApiController = _interopRequireDefault(require("@controllers/ApiController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const booksController = new _BooksController.default();
const indexController = new _IndexController.default();
const apiController = new _ApiController.default();

var _default = app => {
  app.use((0, _koaSimpleRouter.default)(_ => {
    _.get('/', indexController.actionIndex);

    _.get('/index.html', indexController.actionIndex);

    _.get('/api/list', booksController.actionIndex);
  }));
};

exports.default = _default;