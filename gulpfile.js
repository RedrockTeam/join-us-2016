'use strict'

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');

// babel
const babel = require('gulp-babel');

// less and plugin
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ 
    browsers: ['> 1%', 'ie >= 8', 'Chrome > 36', 'Firefox >= 20', 'iOS >= 7'],
});


// browser-sync
const browserSync = require('browser-sync').create();


gulp.task('less', () => {
    return gulp.src('./src/less/**.less')
        .pipe(sourcemaps.init())
        .pipe(less({
          plugins: [autoprefix]
        }).on('error', (error) => console.log(error)))
        .pipe(sourcemaps.write('./cssmap'))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('toes5', (args) => {
    return gulp.src('./src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        })).on('error', e => console.log(e))
        .pipe(sourcemaps.write('./jsmap'))
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('watch', () => {
    browserSync.init({
        server: "./"
    });
    gulp.watch('index.html').on('change', browserSync.reload);
    gulp.watch('./src/less/*.less', ['less', browserSync.reload]);
    gulp.watch('./src/js/*.js', ['toes5', browserSync.reload]);
});




gulp.task('build', ['less', 'toes5']);




