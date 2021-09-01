"use strict";

var gulp = require("gulp"),
    gp   = require("gulp-load-plugins")(),
    browserSync = require("browser-sync").create();
var del  =require("del");
var minify = require("gulp-csso");

var autoprefixer = require('autoprefixer');

//Удаляем папку build
gulp.task("remove-build",function(){
  return del("build");
})
//Копируем в папку build
gulp.task("copy-build",function(){
  return gulp
  .src(
    ["./source/fonts/**/*.{woff,woff2}",
    "./source/img/**",
    "./source/**/*.html",
  "./source/js/**/*.js"],
    {base:"source"})
  .pipe(gulp.dest("build"));
});
//--------Копируем нтмл
gulp.task("copy-html",function(){
  return gulp
  .src("./source/**/*.html",{base:"source"})
  .pipe(gulp.dest("build"))
  .on('end',browserSync.reload)
});

//-----------Создать css
gulp.task("sass", async function () {
  var plugins = [autoprefixer()];
gulp
  .src("./source/sass/style.scss")
  .pipe(gp.plumber())
  .pipe(gp.sass())
  .pipe(gp.sourcemaps.init())
  .on(
    "error",
    gp.notify.onError({
      message: "Error: <%= error.message %>",
      title: "Error running something",
    })
  )
  .pipe(gp.postcss(plugins))
  .pipe(gulp.dest("./build/css/"))
  //.pipe(gp.rename({suffix:".mini"}))
  /*.pipe(minify())
  .pipe(gulp.dest("./build/css/"))*/

  .pipe(browserSync.reload({stream:true}))
});

//-------------------------
gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "./build/",
      
    } 
 });
});


gulp.task("watch", async function () {
  gulp.watch('./source/**/*.html',gulp.series("copy-html"));
  gulp.watch("./source/sass/**/*.{scss,sass}", gulp.series("sass"));
});

gulp.task(
  "default",
  gulp.parallel(
   // gulp.parallel("copy-html","sass"),
    gulp.parallel("watch", "browser-sync")
  )
);
gulp.task("build",gulp.series("remove-build","copy-build","sass","default"));