var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");

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
    gulp.watch("client/styles/*.sass", ["sass"]);
});

gulp.task("sass", function() {
    return gulp.src("client/styles/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("client/tmp"))
        .pipe(browserSync.stream());
});