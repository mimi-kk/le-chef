// app.controller("RecipesController", function($scope) {
//     $scope.recipes = window.FIXTURES;
// });

app.controller("RecipesController", [ "$scope", "$firebaseArray", function($scope, $firebaseArray) {
        var ref = new Firebase("https://fiery-inferno-8595.firebaseio.com/");
        $scope.recipes = $firebaseArray(ref);
    }
]);

app.controller("RecipeController", function($scope, $location, $routeParams) {
    $scope.recipe = window.FIXTURES[$routeParams.id];

    $scope.review = {};

    $scope.addReview = function(recipe) {
        recipe.reviews.push(this.review);
        $scope.review = {};
    };

    $scope.direction = 'left';
    $scope.currentIndex = 0;

    $scope.setCurrentSlideIndex = function (index) {
        $scope.currentIndex = index;
    };

    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };

    $scope.prevSlide = function () {
        $scope.currentIndex = ($scope.currentIndex < $scope.recipe.slides.length - 1) ? ++$scope.currentIndex : 0;
    };

    $scope.nextSlide = function () {
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.recipe.slides.length - 1;
    };
});

app.factory("allRecipes", ["$firebaseArray",
  function($firebaseArray) {
    // create a reference to the database location where we will store our data
    var recipeId = Math.round(Math.random() * 100000000);
    var ref = new Firebase("https://fiery-inferno-8595.firebaseio.com/" + recipeId);

    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
  }
]);

app.controller("AddRecipeController", ["$scope", "allRecipes",
  // we pass our new allRecipes factory into the controller
  function($scope, allRecipes) {
    // we add allRecipes array to the scope to be used in our ng-repeat
    $scope.recipes = allRecipes;

    // a method to create new recipes; called by ng-submit
    $scope.addRecipe = function() {
      // calling $add on a synchronized array is like Array.push(),
      // except that it saves the changes to our database!
      $scope.recipes.$add({
        title: $scope.title,
        lead: $scope.lead,
        author: $scope.author,        
        instructions: $scope.instructions
      });

      // reset the recipe input
      $scope.recipe = "";
    };
  }
]);