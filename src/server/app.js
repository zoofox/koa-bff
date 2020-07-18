const moduleAlias = require('module-alias')
moduleAlias.addAliases({
  '@root'  : __dirname,
  '@controllers': __dirname + '/controllers',
  '@models': __dirname + '/models',
})
const Koa = require('koa');
const {port,viewDir,staticDir} = require('./config');
console.log('环境',process.env.NODE_ENV);
const {join} = require('path');
const co = require('co');//
const app = new Koa();
const serve = require('koa-static');
const render = require('koa-swig');
const { historyApiFallback } = require('koa2-connect-history-api-fallback');
const log4js = require("log4js");
const errorHandler = require('./middleware/errorHandler');

log4js.configure({
  appenders: { cheese: { type: "file", filename: "./logs/bff.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
});

const logger = log4js.getLogger("bff-test");


// logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");



app.use(serve(staticDir))
// app.use(historyApiFallback({ index:'/',whiteList: ['/api'] }));

app.context.render = co.wrap(render({
	root:viewDir,
	autoscape:true,
	cache:process.env.NODE_ENV == "development" ? false : 'memory',
	ext:'html',
	varControls:["[[","]]"],
	writeBody: false
}))
errorHandler.error(app,logger);
//路由注册中心
require('./controllers')(app);

app.listen(port, ()=>{
	console.log('服务启动成功');
})