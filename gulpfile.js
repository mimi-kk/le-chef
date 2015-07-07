var gulp = require("gulp");
var browserSync = require("browser-sync");

gulp.task("default", function() {
    console.log("Default task!");
});

gulp.task("server", function() {
    browserSync.init({
        server: "client",
        notify: false
    });
});
