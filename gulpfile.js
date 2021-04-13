const gulp = require('gulp')
const browserSync = require('browser-sync')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: "src"
    }
  })
})

gulp.task('styles', function () {
  return gulp.src('src/sass/**/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({
      prefix: "",
      suffix: ".min"
    }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('src/css')) // leave compiled .sass files in css .css file
    .pipe(browserSync.stream()) // restart serve after previous line 
})

gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.+(scss|sass)', gulp.parallel('styles'))
  gulp.watch('src/*.html').on('change', browserSync.reload)
})

gulp.task('start', gulp.parallel('watch', 'server', 'styles'))