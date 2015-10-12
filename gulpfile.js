var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
var ftp = require("vinyl-ftp");
var gutil = require("gulp-util");

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

gulp.task("deploy", function () {
    var connection = ftp.create({
        host: "noerdli.ch",
        user: "noerdli",
        password: "TEv593uPk",
        parallel: 10,
        log: gutil.log
    });

    var globs = [
        "client/**/*"
    ];

    return gulp.src(globs, { base: "client", buffer: false } )
        .pipe(connection.newer("/lechef.noerdli.ch")) // only upload newer files
        .pipe(connection.dest("/lechef.noerdli.ch"));

});