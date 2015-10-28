app.controller("RecipesController", ["$scope", "$firebaseArray", "$location",
  function($scope, $firebaseArray, $location) {
    var ref = new Firebase("https://fiery-inferno-8595.firebaseio.com/recipes/");
    $scope.recipes = $firebaseArray(ref);
    console.log($scope.recipes.length);
    $scope.currentPath = window.location;
  }]
);