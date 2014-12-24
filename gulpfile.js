var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var watch = require('gulp-watch');
var bowerFiles = require('main-bower-files');

gulp.task('html', ['inject'], function () {
    gulp.src('client/**/*.html')
        .pipe(gulp.dest('public'));
});

gulp.task('jade', function () {
    gulp.src('client/**/*.jade')
        .pipe($.jade())
        .pipe(gulp.dest('public'));
});

gulp.task('js', function () {
    gulp.src('client/**/*.js')
        .pipe(gulp.dest('public'));
});

gulp.task('css', function () {
    gulp.src('client/**/*.css')
        .pipe($.minifyCss())
        .pipe($.rename('style.css'))
        .pipe(gulp.dest('public'));
});

gulp.task('inject', function () {
    var sources = gulp.src(['public/app/**/*.js', 'public/app/**/*.css'], {read: false});

    return gulp.src('client/index.html')
        .pipe($.inject(gulp.src(bowerFiles(), {read: false}), {relative: true}))
        .pipe($.inject(sources), {relative: true})
        .pipe(gulp.dest('client'));
});

gulp.task('watch', function () {
    gulp.watch('client/**/*.js', function (e) {
        console.log('File ' + e.type + ': ' + e.path);
        gulp.start('js');
    });

    gulp.watch('client/**/*.jade', function (e) {
        console.log('File ' + e.type + ': ' + e.path);
        gulp.start('jade');
    });

    gulp.watch('client/**/*.css', function (e) {
        console.log('File ' + e.type + ': ' + e.path);
        gulp.start('css');
    });

    gulp.watch('/client/**/*.html', function (e) {
        console.log('File ' + e.type + ': ' + e.path);
        gulp.start('html');
    });
});

gulp.task('assets', function () {
    gulp.src('client/assets/**/*')
        .pipe(gulp.dest('public/assets'));

    gulp.src('client/favicon.ico')
        .pipe(gulp.dest('public'));
});

gulp.task('build', ['html', 'jade', 'js', 'css', 'assets']);

gulp.task('serve', ['build', 'watch'], function () {
    $.nodemon({script: 'server/app.js', ext: 'js', ignore: ['client/', 'node_modules/', 'dist/', 'public/']})
        .on('restart', function () {
            console.log('Restarting server...');
        });
});

gulp.task('open', ['serve'], function () {
    gulp.src('client/index.html')
        .pipe($.open('', {url: 'http://localhost:9000'}));
});

gulp.task('default', ['open']);
