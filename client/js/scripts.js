var app = angular.module("leChef", [
    "ngRoute", 
    "ngAnimate",
    "firebase"
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
    when("/editor/", {
        templateUrl: "templates/editor.html",
        controller: "AddRecipeController"
    }).
    when("/editor/:id", {
        templateUrl: "templates/editor.html",
        controller: "EditRecipeController"
    }).
    otherwise({
        redirectTo: "/"
    });
});