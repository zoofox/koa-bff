import {extend}  from('lodash');
import {join}  from('path');

let config = {
	"viewDir": join(__dirname, "..", 'views'),
	"staticDir": join(__dirname, "..", 'assets'),
}

if(process.env.NODE_ENV == 'development'){
	const localConfig = {
		port:9000
	}
	config = extend(config, localConfig);
}

if(process.env.NODE_ENV == 'production'){
	const prodConfig = {
		port:9001
	}
	config = extend(config, prodConfig);
}

export default config;