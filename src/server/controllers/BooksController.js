import Books from '@models/Books';
import { Readable } from 'stream';
import cheerio from 'cheerio';
import { route, GET } from 'awilix-koa';

@route('/books')
class BooksController {
	constructor() {

  }
  @route('/list')
  @GET()
	async actionIndex(ctx, next) {
		// const books = new Books;
		// const result = await books.getData();
		// ctx.body = {
		// 	result
    // };
  const html = await ctx.render('books/pages/list')

    if(ctx.request.header['x-pjax']){
      console.log('站内切换')
      const $ = cheerio.load(html);
      ctx.status = 200;
      ctx.type = 'html';

      $('.pjaxcontent').each(function(){
        ctx.res.write($(this).html());
      })
      $('.lazyload-js').each(function(){
        ctx.res.write(`<script src="${$(this).attr('src')}"></script>`);
      })

      ctx.res.end();

    }else{
      console.log('直接刷新');
      //bigpipe
      //Transfer-Encoding: chunked
      function ssrStreamPromise(){
        return new Promise((resolve,reject)=>{
          const htmlStream = new Readable();
          htmlStream.push(html);
          htmlStream.push(null);

          ctx.status = 200;
          ctx.type = 'html';

          htmlStream.on('error',err=>{
            reject(err)
          }).pipe(ctx.res);
        })
      }
      await ssrStreamPromise();
    }
	}
};

export default BooksController;