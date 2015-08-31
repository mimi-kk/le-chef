var app = angular.module('leChef', [
    "ngRoute",
    "RecipeController"
]);

app.config(["$routeProvider",
    function($routeProvider){
        $routeProvider.
            when("/", {
                templateUrl: "templates/recipes.html",
                controller: "RecipeController"
            }).
            when("/recipe", {
                templateUrl: "templates/recipe.html",
                controller: "RecipeController"
            }).
            otherwise({
                redirectTo: "/"
            }); 
}]);