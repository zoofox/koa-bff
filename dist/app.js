"use strict";

var _moduleAlias = _interopRequireDefault(require("module-alias"));

var _koa = _interopRequireDefault(require("koa"));

var _config = _interopRequireDefault(require("./config"));

var _path = require("path");

var _co = _interopRequireDefault(require("co"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaSwig = _interopRequireDefault(require("koa-swig"));

var _koa2ConnectHistoryApiFallback = require("koa2-connect-history-api-fallback");

var _log4js = _interopRequireDefault(require("log4js"));

var _errorHandler = _interopRequireDefault(require("./middleware/errorHandler"));

var _awilix = require("awilix");

var _awilixKoa = require("awilix-koa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_moduleAlias.default.addAliases({
  '@root': __dirname,
  '@controllers': __dirname + '/controllers',
  '@models': __dirname + '/models'
});

console.log('环境', process.env.NODE_ENV);
const app = new _koa.default(); //IOC

// 创建核心的容器概念
const container = (0, _awilix.createContainer)(); // 向容器的内部注入我们需要的类

container.loadModules([`${__dirname}/services/*.js`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: _awilix.Lifetime.SCOPED
  }
}); // 终极注入

app.use((0, _awilixKoa.scopePerRequest)(container));
const {
  port,
  viewDir,
  staticDir
} = _config.default;

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


app.use((0, _koaStatic.default)(staticDir)); // app.use(historyApiFallback({ index:'/',whiteList: ['/api'] }));

console.log(port, viewDir, staticDir);
app.context.render = _co.default.wrap((0, _koaSwig.default)({
  root: viewDir,
  autoscape: true,
  cache: process.env.NODE_ENV == "development" ? false : 'memory',
  ext: 'html',
  varControls: ["[[", "]]"],
  writeBody: false
}));

_errorHandler.default.error(app, logger); //路由注册中心
// require('./controllers').default(app);
// 路由注册中心


app.use((0, _awilixKoa.loadControllers)(`${__dirname}/controllers/*.js`));
app.listen(port, () => {
  console.log('服务启动成功', port);
});