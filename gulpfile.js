var gulp = require("gulp");
var babel = require("gulp-babel");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var sourceMap = require("gulp-sourcemaps");
var thr = require("through2");

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
  .pipe(gulp.dest("demo"))
  .pipe(reload({stream:true}));
});

gulp.task("versionify",["babel"],()=>{
  return gulp.src("dist/cplayer.js")
        .pipe(thr.obj(function(file,encoding,done){
          var end = new Buffer('console.log("\\n%ccPlayer%cv'+require("./package.json").version+'%c\\n\\n", "padding:7px;background:#cd3e45;font-family:\'Sitka Heading\';font-weight:bold;font-size:large;color:white", "padding:7px;background:#ff5450;font-family:\'Sitka Text\';font-size:large;color:#eee", "");');
          file.contents = Buffer.concat([file.contents,end]);
          this.push(file);
          done();
        }))
        .pipe(gulp.dest("dist"));
})

gulp.task("compress",["babel","versionify","sass"],()=>{
  gulp.src("dist/cplayer.js")
  .pipe(uglify())
  .pipe(rename({"suffix":".min"}))
  .pipe(gulp.dest("dist"));
  return 0;
});
gulp.task("_compress",["babel","versionify"],()=>{
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