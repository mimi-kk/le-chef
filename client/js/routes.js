app.config(["$routeProvider", "$compileProvider",
    function($routeProvider, $compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

        $routeProvider.
            when("/", {
                templateUrl: "templates/recipes.html",
                controller: "RecipesController"
            }).
            when("/recipe/:id", {
                templateUrl: "templates/recipe.html",
                controller: "RecipeController"
            }).
            when("/editor/", {
                templateUrl: "templates/editor.html",
                controller: "EditRecipeController"
            }).
            when("/editor/:id", {
                templateUrl: "templates/editor.html",
                controller: "EditRecipeController"
            }).
            otherwise({
                redirectTo: "/"
            });
    }
]);