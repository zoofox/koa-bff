class IndexController{
	constructor(){

	}
	async actionIndex(ctx,next){
		ctx.body = await ctx.render('index',{
            data:"backend data"
        })
        // ctx.body = await ctx.render('index-vue')
	}
};

export default IndexController;