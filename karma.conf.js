module.exports = function(config) {
    config.set({
        basePath: "./",
        frameworks: ["jasmine"],
        // list of files / patterns to load in the browser
        files: [
            "bower_components/angular/angular.js",
            "client/js/app.js",
            "client/js/routes.js",
            "client/js/controllers/**/*.js",
            "test/*.js"
        ],
        reporters: ["progress"],
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["Chrome"],
        // singleRun: false,
        plugins: [
            "karma-chrome-launcher",
            "karma-jasmine"
        ]
    })
}