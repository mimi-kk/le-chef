/*Do not delete yet to test*/
// app.controller("RecipesController", function($scope) {
//     $scope.recipes = window.FIXTURES;
// });

// app.controller("RecipeController", function($scope, $location, $routeParams) {
//     $scope.recipe = window.FIXTURES[$routeParams.id];
// });

app.factory("createRecipes", ["$firebaseArray",
   function($firebaseArray) {
     var ref = new Firebase("https://fiery-inferno-8595.firebaseio.com/recipes/");
     return $firebaseArray(ref);
   }
]);

app.controller("RecipesController", [ "$scope", "$firebaseArray", 
    function($scope, $firebaseArray) {
        var ref = new Firebase("https://fiery-inferno-8595.firebaseio.com/recipes/");
        $scope.recipes = $firebaseArray(ref);
    }
]);

app.controller("RecipeController", function($scope, $location, $routeParams, $firebaseArray) {
    $scope.recipes.$loaded().then(function(payload) {
    $scope.recipe = payload.$getRecord($routeParams.id);})

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

app.controller("AddRecipeController", ["$scope", "createRecipes",
  function($scope, createRecipes) {
    $scope.recipes = createRecipes;

    $scope.addRecipe = function() {
      $scope.recipes.$add({
        title: $scope.recipe.title,
        lead: $scope.recipe.lead,
        preptime: $scope.recipe.preptime,
        cookingtime: $scope.recipe.cookingtime,
        // keywords: $scope.keywords,
        // ingredients: $scope.ingredients,
        instructions: $scope.recipe.instructions
      });
        
      alert("Your recipe has been succefully saved!")
      
      // reset the recipe input
      $scope.recipe = "";
    };

    $scope.keywords = [];
    $scope.ingredients = [];

        $scope.addKeyword = function() {
          $scope.keywords.push("");
        };
        
        $scope.addIngredient = function() {
          $scope.ingredients.push("");
        };

        $scope.removeKeyword = function() {
          var lastKeyword = $scope.keywords.length-1;
          $scope.keywords.splice(lastKeyword);
        };

        $scope.removeIngredient = function() {
          var lastIngredient = $scope.keywords.length-1;
          $scope.ingredients.splice(lastIngredient);
        };
      }
]);

app.controller("EditRecipeController", function($scope, $location, $routeParams, $firebaseArray) {
    $scope.recipes.$loaded().then(function(recipeid) {
      $scope.recipe = recipeid.$getRecord($routeParams.id);
    })

    $scope.editRecipe = function(){
    $scope.recipes.$save($scope.recipe).then(function(){
      console.log($scope.recipe);
    });
    alert("Your recipe has been succefully updated!")
}
});