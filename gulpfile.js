'use strict'

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');

// babel
const babel = require('gulp-babel');

// less and plugin
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });


// browser-sync
const browserSync = require('browser-sync').create();


gulp.task('less', () => {
    return gulp.src('./src/less/**.less')
        .pipe(sourcemaps.init())
        .pipe(less({
          plugins: [autoprefix]
        }).on('error', (error) => console.log(error)))
        .pipe(sourcemaps.write('./cssmap'))
        .pipe(gulp.dest('./dest/css'))
});

gulp.task('toes5', (args) => {
    return gulp.src('./src/js/**.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('./jsmap'))
        .pipe(gulp.dest('./dest/js'));
});


gulp.task('watch', () => {
    browserSync.init({
        server: "./"
    });
    return gulp.watch('./src/less/**.less', ['less', browserSync.reload])
});


gulp.task('build', ['less', 'toes5']);




