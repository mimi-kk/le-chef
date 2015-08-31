var app = angular.module('leChef', [
    "ngRoute",
    "RecipeController",
    "RecipeIdController"
]);

app.config(["$routeProvider",
    function($routeProvider){
        $routeProvider.
            when("/", {
                templateUrl: "templates/recipes.html",
                controller: "RecipeController"
            }).
            when("/recipe/:id", {
                templateUrl: "templates/recipe.html",
                controller: "RecipeIdController",
                controllerAs: "idController"
            }).
            otherwise({
                redirectTo: "/"
            }); 
}]);