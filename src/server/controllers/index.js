const router = require('koa-simple-router');
const BooksController = require('@controllers/BooksController');
const IndexController = require('@controllers/IndexController');
const ApiController = require('@controllers/ApiController');

const booksController = new BooksController();
const indexController = new IndexController();
const apiController = new ApiController();

module.exports = app => {
	app.use(router(_ => {
		_.get('/', indexController.actionIndex);
		_.get('/index.html', indexController.actionIndex);
		_.get('/api/list', booksController.actionIndex);
	}))
}