app.config(["$routeProvider", "$compileProvider", 
    function($routeProvider, $compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

        $routeProvider.
            when("/", {
                templateUrl: "templates/recipes.html",
                controller: "RecipesController",
                resolve: {
                    "currentAuth": ["Auth", function(Auth) {
                    return Auth.$waitForAuth();
                }]
            }
            }).
            when("/recipe/:id", {
                templateUrl: "templates/recipe.html",
                controller: "RecipeController",
                resolve: {
                    "currentAuth": ["Auth", function(Auth) {
                    return Auth.$waitForAuth();
                }]
            }
            }).
            when("/editor/", {
                templateUrl: "templates/editor.html",
                controller: "EditorController",
                resolve: {
                    "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireAuth();
                }]
            }
            }).
            when("/editor/:id", {
                templateUrl: "templates/editor.html",
                controller: "EditorController",
                resolve: {
                    "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireAuth();
                }]
            }
            }).
            when("/auth", {
                templateUrl: "templates/auth.html",
                controller: "AuthController",
                resolve: {
                    "currentAuth": ["Auth", function(Auth) {
                    return Auth.$waitForAuth();
                }]
            }
            }).
            when("/reset", {
                templateUrl: "templates/reset.html",
                controller: "AuthController",
                resolve: {
                    "currentAuth": ["Auth", function(Auth) {
                    return Auth.$waitForAuth();
                }]
            }
            }).
            when("/new-password", {
                templateUrl: "templates/new-password.html",
                controller: "AuthController",
                resolve: {
                    "currentAuth": ["Auth", function(Auth) {
                    return Auth.$waitForAuth();
                }]
            }
            }).
            otherwise({
                redirectTo: "/"
            });
    }
]);