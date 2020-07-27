import { route, GET } from 'awilix-koa';
@route('/')


class IndexController {
  constructor() {

  }
  @route('/')
  @GET()
  async actionIndex(ctx, next) {
    ctx.body = await ctx.render('index/pages/index', {
      data: "backend data"
    })
    // ctx.body = await ctx.render('index/pages/index')
  }
};

module.exports = IndexController;