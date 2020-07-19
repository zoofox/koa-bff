const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup');
console.log(rollup)
const entry = './src/server/**/*.js';
const cleanEntry = './src/server/config/index.js';
const replace = require('@rollup/plugin-replace');
const setTitle = require('node-bash-title');

setTitle('🚀server构建')

//开发环境
function builddev() {
  return watch(entry, { ignoreInitial: false })
    .pipe(gulp.src(entry))
    .pipe(
      babel({
        babelrc: false,
        "plugins": [
          ["@babel/plugin-transform-modules-commonjs"]
        ]
      })
    )
    .pipe(gulp.dest('dist'));
}
//上线环境
function buildprod() {
  return gulp.src(entry)
    .pipe(
      babel({
        babelrc: false,
        ignore: [cleanEntry],
        "plugins": [
          ["@babel/plugin-transform-modules-commonjs"]
        ]
      })
    )
    .pipe(gulp.dest('dist'));
}
//清洗环境
function buildconfig() {
  return gulp.src(entry)
    .pipe(
      rollup({
        input: [cleanEntry],
        output: {
          format: 'cjs'
        },
        plugins:[
          replace({
            'process.env.NODE_ENV':JSON.stringify('production')
          })
        ]
      })
    )
    .pipe(gulp.dest('dist'));
}
let build = gulp.series(builddev)
if (process.env.NODE_ENV == 'production') {
  build = gulp.series(buildprod, buildconfig);
}

gulp.task('default', build)
