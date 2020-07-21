const pluginName = 'HtmlAfterPlugin';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const assetsHelp = (data) => {
	let js = [];
	const getAssetName = {
		js: (item) => `<script src="${item}"></script>`,
	};
	for (let jsitem of data.js) {
		js.push(getAssetName.js(jsitem))
	}
	return {
		js
	}
}
class HtmlAfterPlugin {
	constructor() {
		this.jsarr = [];
	}
	apply(complier) {
		complier.hooks.compilation.tap(pluginName, (compilation) => {
			HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
				pluginName,
				(htmlPluginData, cb) => {
					let _html = htmlPluginData.html;
					/**
					 * {
						  publicPath: '/',
              js: [ '/scripts/runtime.bundle.js', '/scripts/books-create.bundle.js' ],
              css: [],
              manifest: undefined,
              favicon: undefined
						}
					 */
					console.log("🍊🍊🍊🍊", htmlPluginData.assets);
					const {
						js
					} = assetsHelp(htmlPluginData.assets);
					this.jsarr = js;
					cb(null, htmlPluginData);
				}
			);
			HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
				pluginName,
				(data, cb) => {
          let _html = data.html;
          _html = _html.replace('<!--injectjs-->', this.jsarr.join(''));
          // console.log('🍌',this.jsarr.join(''))
					_html = _html.replace(/@components/g, '../../../components');
					_html = _html.replace(/@layouts/g, '../../layouts');
					data.html = _html;
					cb(null, data);
				}
			);
		})
	}
}

module.exports = HtmlAfterPlugin;