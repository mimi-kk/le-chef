app.controller("RecipesController", ["$scope", "$location", "Recipes", "$http",
  function($scope, $location, Recipes, $http) {
  	$scope.loading = true;
  	$http.get('https://fiery-inferno-8595.firebaseio.com/recipes/')
    .success(function (data) {
    })
    .catch(function (err) {
    })
    .finally(function () {
      $scope.loading = false;
    });
  	$scope.recipes = Recipes;
    $scope.currentPath = window.location;
  }]
);