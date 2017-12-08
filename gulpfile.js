"use strict";

const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');

const config = {
    port: 5000,
    devBaseUrl: 'http://localhost',
    index: 'index.html',
    paths: {
          dist: './dist',
          js: './src/**/*.js',
          mainJs: './src/main.js',
          sass: './src/**/*.scss',
          mainSass: './src/main.scss'
        },
};

gulp.task('connect', () => {
    connect.server({
          root: ['dist'],
          port: config.port,
          base: config.devBaseUrl,
          livereload: true,
        });
});

gulp.task('open', ['connect'], () => {
    return gulp.src(config.index)
      .pipe(open({ uri: `${config.devBaseUrl}:${config.port}/` }));
});

gulp.task('js', () => {
    browserify(config.paths.mainJs)
      .transform('babelify', { presets: ['env'] })
      .bundle()
      .on('error', console.error.bind(console))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(`${config.paths.dist}/scripts`))
      .pipe(connect.reload());
});

gulp.task('sass', () => {
    return gulp.src(config.paths.mainSass)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(`${config.paths.dist}/css`))
      .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch(config.paths.js, ['js']);
    gulp.watch(config.paths.sass, ['sass']);
});

gulp.task('default', ['open', 'watch', 'sass']);

gulp.task('build', ['sass']);
