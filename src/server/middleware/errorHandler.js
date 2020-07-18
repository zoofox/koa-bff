const errorHandler = {
	error(app,logger){
		app.use(async (ctx,next)=>{
			try{
				await next();
			}catch(e){
				logger.error(e);
				ctx.status = ctx.status||500;
				ctx.body = '500请求';
			}
		})

		app.use(async (ctx,next)=>{
			await next();
			if(404 !== ctx.status){
				return;
			}
			ctx.status = 200;//404百度降权
			ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
		})
	}
};
module.exports = errorHandler;