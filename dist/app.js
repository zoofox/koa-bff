"use strict";

var _moduleAlias = _interopRequireDefault(require("module-alias"));

var _koa = _interopRequireDefault(require("koa"));

var _config = require("./config");

var _path = require("path");

var _co = _interopRequireDefault(require("co"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaSwig = _interopRequireDefault(require("koa-swig"));

var _koa2ConnectHistoryApiFallback = require("koa2-connect-history-api-fallback");

var _log4js = _interopRequireDefault(require("log4js"));

var _errorHandler = _interopRequireDefault(require("./middleware/errorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_moduleAlias.default.addAliases({
  '@root': __dirname,
  '@controllers': __dirname + '/controllers',
  '@models': __dirname + '/models'
});

console.log('环境', process.env.NODE_ENV);
//
const app = new _koa.default();

_log4js.default.configure({
  appenders: {
    cheese: {
      type: "file",
      filename: "./logs/bff.log"
    }
  },
  categories: {
    default: {
      appenders: ["cheese"],
      level: "error"
    }
  }
});

const logger = _log4js.default.getLogger("bff-test"); // logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");


app.use((0, _koaStatic.default)(_config.staticDir)); // app.use(historyApiFallback({ index:'/',whiteList: ['/api'] }));

app.context.render = _co.default.wrap((0, _koaSwig.default)({
  root: _config.viewDir,
  autoscape: true,
  cache: process.env.NODE_ENV == "development" ? false : 'memory',
  ext: 'html',
  varControls: ["[[", "]]"],
  writeBody: false
}));

_errorHandler.default.error(app, logger); //路由注册中心


from('./controllers')(app);
app.listen(_config.port, () => {
  console.log('服务启动成功');
});