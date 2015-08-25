var app = angular.module('leChef', [
    "ngRoute",
    "RecipeController"
]);

app.config(["$routeProvider",
    function($routeProvider){
        $routeProvider.
            when("/recipes", {
                templateUrl: "templates/recipes.html",
                controller: "RecipeController"
            }).
            otherwise({
                redirectTo: "/recipes"
            }); 
}]);