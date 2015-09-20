var app = angular.module("leChef", [
    "ngRoute", 
    "ngAnimate"
]);

app.config(function($routeProvider) {
    $routeProvider.
    when("/", {
        templateUrl: "templates/recipes.html",
        controller: "RecipesController"
    }).
    when("/recipe/:id", {
        templateUrl: "templates/recipe.html",
        controller: "RecipeController"
    }).
    when("/editor/:id", {
        templateUrl: "templates/editor.html",
        controller: "EditorController"
    }).
    otherwise({
        redirectTo: "/"
    });
});