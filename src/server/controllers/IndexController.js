class IndexController {
  constructor() {

  }
  async actionIndex(ctx, next) {
    ctx.body = await ctx.render('index/pages/index', {
      data: "backend data"
    })
    // ctx.body = await ctx.render('index/pages/index')
  }
};

export default IndexController;