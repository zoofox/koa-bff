const argv = require('yargs-parser')(process.argv.slice(2))

const _mode = argv.mode || 'development';
console.log(_mode)
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const { merge } = require('webpack-merge');
const { resolve, join } = require('path');
const { sync } = require('glob'); //匹配文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlAfterPlugin = require('./config/htmlAfterPlugin');
const setTitle = require('node-bash-title');

setTitle('🍺client构建')

//找views内entry.js文件
const files = sync('./src/web/views/**/*.entry.js');
console.log('🐶', files);
let _entry = {};
let _plugins = [];

// _plugins.push(
//   new CleanWebpackPlugin({
//     cleanAfterEveryBuildPatterns: ['dist']
//   })
// )
for (let item of files) {
  if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true) {
    const entryKey = RegExp.$1;
    console.log('key', entryKey);
    _entry[entryKey] = item;
    const [dist, template] = entryKey.split('-');
    _plugins.push(
      new HtmlWebpackPlugin({
        filename: `../views/${dist}/pages/${template}.html`,
        template: `src/web/views/${dist}/pages/${template}.html`,
        inject: false,
        chunks: ['runtime', entryKey]
      })
    )
  } else {
    console.log('🐷', '文件识别错误')
    process.exit(-1)
  }
}

const webpackConfig = {
  entry: _entry,
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    path: join(__dirname, './dist/assets'),
    publicPath: '/',
    filename: 'scripts/[name].bundle.js'
  },
  watch: _mode == 'development' ? true : false,
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  },
  externals:{
    jquery:'jQuery'
  },
  plugins: [..._plugins, new HtmlAfterPlugin()],
  resolve: {
    alias: {
      '@': resolve('src/web'),
    },
  }
}
module.exports = merge(webpackConfig, _mergeConfig);