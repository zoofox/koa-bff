import Books from '@models/Books';

class ApiController {
	constructor() {

	}
	async actionIndex(ctx, next) {
		const books = new Books;
		const result = await books.getData();
		ctx.body = {
			result
		};
	}
};

export default ApiController;