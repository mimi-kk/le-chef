var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
var scp = require("gulp-scp2");

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

gulp.task("sass", function() {
    return gulp.src("client/styles/*.sass")
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest("client/tmp"))
        .pipe(browserSync.stream());
});

gulp.task("deploy", function() {
    return gulp.src("client/**/*")
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