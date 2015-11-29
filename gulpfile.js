var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
var scp = require("gulp-scp2");
var Server = require("karma").Server;
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var minifyCss = require("gulp-minify-css");
 
gulp.task("default", function() {
    console.log("Default task!");
});

gulp.task("server", ["sass"], function() {
    browserSync.init({
        server: {
            baseDir: "client",
            routes: {
                "/bower_components": "bower_components"
            }
        },
        notify: false,
        open: false
    });

    gulp.watch("client/*.html").on("change", browserSync.reload);
    gulp.watch("client/templates/*.html").on("change", browserSync.reload);
    gulp.watch("client/styles/*.sass", ["sass"]);
});

gulp.task("test", function (done) {
  new Server({
    configFile: __dirname + "/karma.conf.js",
    singleRun: true
  }, done).start();
});

gulp.task("sass", function() {
    return gulp.src("client/styles/*.sass")
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest("client/tmp"))
        .pipe(browserSync.stream());
});

gulp.task("minify-css", function() {
  return gulp.src("client/tmp/screen.css")
    .pipe(minifyCss({compatibility: "ie8"}))
    .pipe(gulp.dest("client/dist"));
});
 
gulp.task("concat", function() {
  return gulp.src("client/js/**/*.js")
    .pipe(concat("screen.js"))
    .pipe(gulp.dest("client/dist"));
});

gulp.task("uglify", function() {
  return gulp.src("client/dist/screen.js")
    .pipe(uglify())
    .pipe(gulp.dest("client/dist"));
});

gulp.task("deploy", function() {
    return gulp.src(["client/**/*","!client/js/**/*", "!client/styles/*", "!client/tmp/*", "bower_components/**"])
        .pipe(scp({
            host: "noerdli.ch",
            username: "noerdli",
            password: "TEv593uPk",
            port: 2121,
            dest: "/lechef.noerdli.ch"
        }))
        .on("error", function(err) {
            console.log(err);
        });
});