app.controller("RecipesController", ["$scope", "$location", "Recipes",
  function($scope, $location, Recipes) {
  	$scope.recipes = Recipes;
    $scope.currentPath = window.location;
  }]
);