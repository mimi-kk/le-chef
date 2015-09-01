app.controller("RecipesController", function($scope) {
    $scope.recipes = window.FIXTURES;
});

app.controller("RecipeController", function($scope, $location, $routeParams) {
    $scope.recipe = window.FIXTURES[$routeParams.id];
});