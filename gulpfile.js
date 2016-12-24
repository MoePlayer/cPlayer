var gulp = require("gulp");
var babel = require("gulp-babel");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
//var clean = require("gulp-clean-css");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var sourceMap = require("gulp-sourcemaps");

gulp.task("default",["compress"],()=>{
    console.log("Compressing has been done.");
});
gulp.task("babel",()=>{
    return gulp.src("src/js/*.js")
    .pipe(sourceMap.init())
    .pipe(babel({"presets": ["es2015"]}))
    .pipe(sourceMap.write('.'))
    .pipe(gulp.dest("dist"));
});
gulp.task("sass",()=>{
  gulp.src("src/scss/cplayer.scss")
  .pipe(sass({outputStyle:"expanded",sourceMap:true}))
  .pipe(autoprefixer("last 20 version"))
  .pipe(gulp.dest("dist"));
  return gulp.src("src/scss/cplayer.scss")
  .pipe(sass({outputStyle:"compressed"}))
  .pipe(autoprefixer("last 20 version"))
  .pipe(rename({suffix:".min"}))
  .pipe(gulp.dest("dist"))
  .pipe(gulp.dest("demo"))
  .pipe(reload({stream:true}));
});
gulp.task("compress",["babel","sass"],()=>{
  gulp.src("dist/cplayer.js")
  .pipe(uglify())
  .pipe(rename({"suffix":".min"}))
  .pipe(gulp.dest("dist"));
  return 0;
});
gulp.task("_compress",["babel"],()=>{
  gulp.src("dist/cplayer.js")
  .pipe(uglify())
  .pipe(rename({"suffix":".min"}))
  .pipe(gulp.dest("dist"));
  return 0;
});
gulp.task("createDemo",["compress"],()=>{
    return gulp.src("dist/*").pipe(gulp.dest("demo"));
});
gulp.task("_createDemo",["_compress"],()=>{
    return gulp.src("dist/*").pipe(gulp.dest("demo"));
});
gulp.task("serve",["createDemo"],()=>{
  browserSync.init({
    server:{
        baseDir:"./demo"
    }
  });
  gulp.watch("src/scss/*.scss",["sass"]);
  gulp.watch("src/js/*.js",["_createDemo"]);
  gulp.watch("demo/*.min.js").on("change",reload);
  gulp.watch("demo/*.html").on("change",reload);
})