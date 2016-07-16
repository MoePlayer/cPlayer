var gulp = require("gulp");
var babel = require("gulp-babel");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var clean = require("gulp-clean-css");
var autoprefixer = require("gulp-autoprefixer");

gulp.task("default",["babel","compress"],()=>{
	console.log("Babeling and Compressing has been done.");
});
gulp.task("babel",()=>{
	return gulp.src("src/js/*.js")
		.pipe(babel({"presets": ["es2015"]}))
		.pipe(rename({
			"suffix":".babeled"
		}))
		.pipe(gulp.dest("dist"));
});
gulp.task("compress",()=>{
	gulp.src("src/js/*.js")
		.pipe(babel({"presets":["es2015"]}))
		.pipe(uglify())
		.pipe(rename({"suffix":".min"}))
		.pipe(gulp.dest("dist"));
	return gulp.src("src/scss/*.scss")
		.pipe(sass())
		.pipe(autoprefixer("last 5 version"))
		.pipe(clean())
		.pipe(rename({"suffix":".min"}))
		.pipe(gulp.dest("dist"));
});
gulp.task("createDemo",["compress"],()=>{
	return gulp.src("dist/*").pipe(gulp.dest("demo"));
})