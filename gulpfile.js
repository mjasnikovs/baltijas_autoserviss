const gulp = require('gulp')
const connect = require('gulp-connect')
const htmlmin = require('gulp-htmlmin')
const cleanCSS = require('gulp-clean-css')

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
		.pipe(gulp.dest('dist'))
})

gulp.task('minify-css', () => {
	return gulp.src('./src/css/*')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist/css'))
})

const filesToCopy = [
	'./src/.htaccess',
	'./src/favicon.ico',
	'./src/robots.txt'
]

gulp.task('move-files', () => {
	return gulp.src(filesToCopy, {base: './'})
		.pipe(gulp.dest('./public/'))
})

gulp.task('server', ['connect', 'watch'])

gulp.task('default', ['connect', 'watch'])
