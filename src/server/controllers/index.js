const router = require('koa-simple-router');
import router from 'koa-simple-router';
const BooksController = require('@controllers/BooksController');
import BooksController from '@controllers/BooksController';
import IndexController from '@controllers/IndexController';
import ApiController from '@controllers/ApiController';

const booksController = new BooksController();
const indexController = new IndexController();
const apiController = new ApiController();

export default app => {
	app.use(router(_ => {
		_.get('/', indexController.actionIndex);
		_.get('/index.html', indexController.actionIndex);
		_.get('/api/list', booksController.actionIndex);
	}))
}