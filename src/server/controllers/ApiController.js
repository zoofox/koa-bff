import { route, GET } from 'awilix-koa';

@route('/api')
class BooksController {
  constructor({ booksService }) {
    this.booksService = booksService;
  }

  @route('/list')
  @GET()
  async actionIndex(ctx) {
    const result = await this.booksService.getData();
    ctx.body = {
      result,
    };
  }
}
export default BooksController;
