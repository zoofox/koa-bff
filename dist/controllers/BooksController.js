"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Books = _interopRequireDefault(require("@models/Books"));

var _stream = require("stream");

var _cheerio = _interopRequireDefault(require("cheerio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BooksController {
  constructor() {}

  async actionIndex(ctx, next) {
    // const books = new Books;
    // const result = await books.getData();
    // ctx.body = {
    // 	result
    // };
    const html = await ctx.render('books/pages/list');

    if (ctx.request.header['x-pjax']) {
      console.log('站内切换');

      const $ = _cheerio.default.load(html);

      ctx.status = 200;
      ctx.type = 'html';
      $('.pjaxcontent').each(function () {
        ctx.res.write($(this).html());
      });
      $('.lazyload-js').each(function () {
        ctx.res.write(`<script src="${$(this).attr('src')}"></script>`);
      });
      ctx.res.end();
    } else {
      console.log('直接刷新'); //bigpipe
      //Transfer-Encoding: chunked

      function ssrStreamPromise() {
        return new Promise((resolve, reject) => {
          const htmlStream = new _stream.Readable();
          htmlStream.push(html);
          htmlStream.push(null);
          ctx.status = 200;
          ctx.type = 'html';
          htmlStream.on('error', err => {
            reject(err);
          }).pipe(ctx.res);
        });
      }

      await ssrStreamPromise();
    }
  }

}

;
var _default = BooksController;
exports.default = _default;