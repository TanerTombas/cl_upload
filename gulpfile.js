var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename')
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');


gulp.task('sass', function() {
    return gulp.src('./resource/sass/*.scss')
    .pipe(sass({style: 'expanded'}))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('./src/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('scripts',function() {
  return gulp.src('./resource/js/*.js')
         .pipe(concat('jquery.clupload.js'))
         .pipe(gulp.dest('./src/js/'))
         .pipe(rename({suffix: '.min'}))
         .pipe(uglify())
         .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', function() {
  gulp.watch('./resource/sass/*.scss', ['sass']);
  gulp.watch('./resource/js/*.js', ['scripts']);
});