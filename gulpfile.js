"use strict";

const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const buffer = require('vinyl-buffer');
const log = require('gulplog');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const svgmin = require('gulp-svgmin');

const config = {
    port: 5000,
    devBaseUrl: 'http://localhost',
    index: 'index.html',
    paths: {
          dist: './dist',
          js: './src/**/*.js',
          mainJs: './src/main.js',
          sass: './src/**/*.scss',
          css: './src/**/*.css',
          mainSass: './src/main.scss',
          html: './src/index.html',
        },
};

gulp.task('connect', () => {
    connect.server({
          root: ['.'],
          port: config.port,
          base: config.devBaseUrl,
          livereload: true,
        });
});

gulp.task('open', ['connect'], () => {
    return gulp.src(config.index)
      .pipe(open({ uri: `${config.devBaseUrl}:${config.port}/` }));
});

gulp.task('html', () => {
  return gulp.src(config.paths.html)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      useShortDoctype: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkAttributes: true
    }))
    .pipe(gulp.dest('.'))
    .pipe(connect.reload());
});

gulp.task('js', () => {
    const b = browserify({
      entries: config.paths.mainJs,
      debug: true,
      transform: [['babelify', { presets: ['env'] }]]
    });

    return b.bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .on('error', log.error)
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(`${config.paths.dist}/scripts`))
      .pipe(connect.reload());
});

gulp.task('sass', () => {
    return gulp.src(config.paths.mainSass)
      .pipe(sass())
        .on('error', sass.logError)
      .pipe(gulp.dest('./src/css'))
      .pipe(connect.reload());
});

gulp.task('css', () => {
  return gulp.src(config.paths.css)
    .pipe(sourcemaps.init())
    .pipe(postcss([require('autoprefixer')]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${config.paths.dist}`))
    .pipe(connect.reload());
})

gulp.task('svg', () => {
  return gulp.src('./src/svg/FairOaksLogo.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./static'));
});

gulp.task('watch', () => {
  gulp.watch(config.paths.js, ['js']);
  gulp.watch(config.paths.sass, ['sass']);
  gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['open', 'watch', 'sass', 'css', 'js', 'html', 'svg']);

gulp.task('build', ['sass', 'css', 'js']);
