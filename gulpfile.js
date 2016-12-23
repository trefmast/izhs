var gulp                = require('gulp'),
    concatCSS           = require('gulp-concat-css'),
    less                = require('gulp-less'),
    uglifycss           = require('gulp-uglifycss'),
    rename              = require('gulp-rename'),
    autoprefixer        = require('gulp-autoprefixer'),
    browserSync         = require('browser-sync');

gulp.task('html', function(){
    gulp.src('app/*.html')
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('less', function () {
    return gulp.src('less/*.less')
    .pipe(less())
    .pipe(autoprefixer({browsers: ['last 5 versions']}))
    .pipe(gulp.dest('css'));
});
 
gulp.task('css', function () {
    return gulp.src('css/*.css')
    .pipe(concatCSS('main.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: true
    });
});


gulp.task('watch', function () {
    gulp.watch('app/*.html', ['html']);
    gulp.watch('css/*.css', ['css']);
    gulp.watch('less/*.less', ['less']);
});

gulp.task('default', ['browser-sync', 'html', 'css', 'less', 'watch']);