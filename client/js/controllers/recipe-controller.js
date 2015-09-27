app.controller("RecipesController", function($scope) {
    $scope.recipes = window.FIXTURES;
});

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

// app.controller("EditorController", [ "$scope", function($scope) {
//     $scope.data = {};

//     $scope.update = function(recipe) {
//         console.log("öpdäit", recipe);
//         $scope.data = angular.copy(recipe);
//     };

//     $scope.reset = function() {
//         $scope.recipe = angular.copy($scope.data);
//     }

//     $scope.reset();
// }]);

// app.controller("FirebaseController", function($scope, $firebaseObject) {
//     var ref = new Firebase("https://fiery-inferno-8595.firebaseio.com/");
//     var syncObject = $firebaseObject(ref);
//     syncObject.$bindTo($scope, "recipe");
// });

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
        keywords: $scope.keywords,
        ingredients: $scope.ingredients,        
        instructions: $scope.instructions
      });

      // reset the recipe input
      $scope.recipe = "";
    };

    // if the recipes are empty, add something for fun!
    // $scope.recipes.$loaded(function() {
    //   if ($scope.recipes.length === 0) {
    //     $scope.recipes.$add({
    //       title: "Firebase Docs"
    //     });
    //   }
    // });
  }
]);


// app.controller("EditRecipeController", ["$scope",  "allRecipes", 
//   // we pass our new allRecipes factory into the controller
//   function($scope,  allRecipes) {
//     // we add allRecipes array to the scope to be used in our ng-repeat
//     $scope.recipes = allRecipes;

//     // a method to create new recipes; called by ng-submit

//     var list = $firebaseArray(recipes);
//     var rec = list.$getRecord(recipeId); // record with $id === "foo" or null

//     $scope.editRecipe = function() {
//       // calling $add on a synchronized array is like Array.push(),
//       // except that it saves the changes to our database!
//       $scope.recipes.$getRecord({
//         title: $indexFor.title,
//         keywords: $indexFor.keywords,
//         ingredients: $indexFor.ingredients,        
//         instructions: $indexFor.instructions
//       });

//       // reset the recipe input
//       $scope.recipe = "";
//     };

//     // if the recipes are empty, add something for fun!
//     // $scope.recipes.$loaded(function() {
//     //   if ($scope.recipes.length === 0) {
//     //     $scope.recipes.$add({
//     //       title: "Firebase Docs"
//     //     });
//     //   }
//     // });
//   }
// ]);


// app.controller("FirebaseController", function($scope, $firebaseArray) {
//     var ref = new Firebase("https://fiery-inferno-8595.firebaseio.com/");

//     $scope.recipes = $firebaseArray(ref);

//     $scope.addRecipe = function() {
//         $scope.recipes.$add({
//             title: $scope.newRecipeTitle
//         });
//     };
// });