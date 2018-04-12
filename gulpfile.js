var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    scss = 'styles/';

gulp.task('css', function() {
	return gulp.src(scss + 'style.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'expanded',
		indentType: 'tab',
		indentWidth: '1'
	}).on('error', sass.logError))
	.pipe(postcss([
		autoprefixer('last 2 versions', '> 1%')
	]))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(sourcemaps.write(scss + 'maps'))
	.pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
    gulp.watch([scss + '**/*.css', scss + '**/*.scss' ], ['css']);
});

gulp.task('default', ['css', 'watch'], function () {
   gulp.watch(scss + 'style.scss', ['watch']);
});
