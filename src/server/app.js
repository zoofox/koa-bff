import moduleAlias  from 'module-alias' 
moduleAlias.addAliases({
  '@root': __dirname,
  '@controllers': __dirname + '/controllers',
  '@models': __dirname + '/models',
})
import Koa  from 'koa';
import config  from './config';
console.log('环境', process.env.NODE_ENV);
import { join }  from 'path';
import co  from 'co';//

import serve  from 'koa-static';
import render  from 'koa-swig';
import { historyApiFallback }  from 'koa2-connect-history-api-fallback';
import log4js  from "log4js";
import errorHandler  from './middleware/errorHandler';

const app = new Koa();

//IOC
import { createContainer, Lifetime } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-koa';
// 创建核心的容器概念
const container = createContainer();
// 向容器的内部注入我们需要的类
container.loadModules([`${__dirname}/services/*.js`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});
// 终极注入
app.use(scopePerRequest(container));

const { port, viewDir, staticDir } = config;

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
console.log(port,viewDir,staticDir)
app.context.render = co.wrap(render({
  root: viewDir,
  autoscape: true,
  cache: process.env.NODE_ENV == "development" ? false : 'memory',
  ext: 'html',
  varControls: ["[[", "]]"],
  writeBody: false
}))
errorHandler.error(app, logger);

//路由注册中心
// require('./controllers').default(app);

// 路由注册中心
app.use(loadControllers(`${__dirname}/controllers/*.js`));

app.listen(port, () => {
  console.log('服务启动成功',port);
})