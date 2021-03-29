const { src, dest, series, parallel, watch } = require('gulp')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const terser = require('gulp-terser')
const browsersync = require('browser-sync')
const imagemin = require('gulp-imagemin')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const browserify = require('browserify')
const babelify = require('babelify')
const sourcemaps = require('gulp-sourcemaps')
const watchify = require('watchify')

const inputOutput = {
  src: './src',
  dest: './dist'
}

function clean() {
  return del(inputOutput.dest)
}

function css() {
  return src(inputOutput.src + '/style.css')
    .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(postcss([
	      cssnano()
      ]))
    .pipe(sourcemaps.write())
    .pipe(dest(inputOutput.dest))
}

function html() {
  return src(inputOutput.src + '/index.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
      removeRedundantAttributes: true,
      removeEmptyAttribute: true
    }))
    .pipe(dest(inputOutput.dest))
}

function js() {
  return browserify({
    entries: inputOutput.src + '/script.jsx',
    debug: true,
    extensions: ['.js', '.jsx']
  })
    .transform(babelify.configure({
      presets: ['@babel/preset-env', '@babel/preset-react']
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(dest(inputOutput.dest))
}

function image() {
  return src(inputOutput.src + '/assets/svg/*')
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [
        {
          removeViewBox: true
        }
      ]
    }))
    .pipe(dest(inputOutput.dest + '/images'))
}

function serve(callback) {
  browsersync.init({
    server: {
      baseDir: inputOutput.dest
    }
  })

  callback()
}

function reload(callback) {
  browsersync.reload()

  callback()
}

// --------------------------------------------

const build = series(
  clean, 
  parallel(css, html, js, image),
)

watch([inputOutput.src + '/**/*.css', inputOutput.src + '/**/*.html'], series(build, reload))
watch([inputOutput.src + '/**/*.jsx', inputOutput.src + '/**/*.js'], series(js, reload))

exports.default = series(
  build,
  serve
)
