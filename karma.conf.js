module.exports = function(config) {
    config.set({
        basePath: "./",
        frameworks: ["jasmine"],
        // list of files / patterns to load in the browser
        files: [
            "bower_components/angular/angular.js",
            "bower_components/angular-mocks/angular-mocks.js",
            "bower_components/angular-routes/angular-routes.js",
            "bower_components/angular-route/angular-route.js",
            "bower_components/angular-animate/angular-animate.js",
            "bower_components/angular-touch/angular-touch.js",
            "bower_components/angular-sanitize/angular-sanitize.js",
            "bower_components/angular-ios9-uiwebview-patch/angular-ios9-uiwebview-patch.js",
            "bower_components/angular-mocks/angular-mocks.js",
            "bower_components/angularfire/dist/angularfire.min.js",
            "bower_components/firebase/firebase.js",
            "bower_components/angularjs-socialshare/src/js/angular-socialshare.js",
            "bower_components/ng-flow/dist/ng-flow-standalone.min.js",
            "client/js/app.js",
            "client/js/routes.js",
            "client/js/controllers/recipe-controller.js",
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