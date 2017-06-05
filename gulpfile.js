const gulp = require('gulp')
const connect = require('gulp-connect')
const htmlmin = require('gulp-htmlmin')
const cleanCSS = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')

gulp.task('connect', () => {
	connect.server({
		root: 'src',
		livereload: true
	})
})

gulp.task('html', () => {
	gulp.src('./src/*.html')
		.pipe(connect.reload())
})

gulp.task('watch', () => {
	gulp.watch(['./src/**'], ['html'])
})

gulp.task('minify-html', () => {
	return gulp.src('./src/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./dist'))
})

gulp.task('minify-css', () => {
	return gulp.src('./src/css/*')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('./dist/css'))
})

gulp.task('minify-img', () => {
	return gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/images'))
})

gulp.task('move-js', () => {
	return gulp.src([
		'./src/js/bootstrap.min.js',
		'./src/js/jquery-3.2.1.min.js',
		'./src/js/main.js'
	], {base: './src'})
		.pipe(gulp.dest('./dist'))
})

gulp.task('move-files', () => {
	return gulp.src([
		'./src/.htaccess',
		'./src/favicon.ico',
		'./src/robots.txt'
	], {base: './src'})
		.pipe(gulp.dest('./dist/'))
})

gulp.task('build', ['move-files', 'minify-html', 'minify-img', 'minify-css', 'move-js'])

gulp.task('server', ['connect', 'watch'])

gulp.task('default', ['connect', 'watch'])
