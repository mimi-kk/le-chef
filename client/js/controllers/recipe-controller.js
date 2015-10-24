app.factory("createRecipes", ["$firebaseArray",
  function($firebaseArray) {
    var ref = new Firebase("https://fiery-inferno-8595.firebaseio.com/recipes/");
    return $firebaseArray(ref);
  }
]);

app.controller("RecipesController", ["$scope", "$firebaseArray", "$scope", "$location",
  function($scope, $firebaseArray, $location) {
    var ref = new Firebase("https://fiery-inferno-8595.firebaseio.com/recipes/");
    $scope.recipes = $firebaseArray(ref);
    $scope.currentPath = window.location;
  }]
);

app.controller("RecipeController", ["$scope", "$location", "$routeParams", "$firebaseArray",
  function($scope, $location, $routeParams, $firebaseArray) {
    $scope.addReview = function() {
      $scope.recipe.reviews.push($scope.recipe.review);
      $scope.recipe.review.createdOn = Date.now();
      $scope.recipe.review = {};
      
      $scope.recipes.$save($scope.recipe).then(function(){
        alert("Your review has been succefully sent!");
        $location.path("/recipe/" + $scope.recipe.$id);
      });
    };

    $scope.recipes.$loaded().then(function(payload) {
      $scope.recipe = payload.$getRecord($routeParams.id);

      if (typeof $scope.recipe.reviews === "undefined") {
        $scope.recipe.reviews = [{}];
      }
    });

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

    $scope.goToEditor = function () {
      $location.path("/editor/" + $scope.recipe.$id);
    };
  }
]);

app.controller("EditRecipeController", ["$scope", "createRecipes", "$location",  "$routeParams", "$firebaseArray",
  function($scope, createRecipes, $location, $routeParams, $firebaseArray) {
    $scope.initRecipe = function() {
      // Initialize new recipe (with default values)
      if (typeof $routeParams.id === "undefined") {
        $scope.recipe = {
          title: "",
          lead: "",
          preptime: "",
          cookingtime: "",
          totaltime: "",
          instructions: "",
          ingredients: [""],
          keywords: [""],
          slides: ["/images/dummy-recipe.jpg"]
        };
      } else {
          $scope.recipes.$loaded().then(function(recipeid) {
            $scope.recipe = recipeid.$getRecord($routeParams.id);
          });
        };
      }

      $scope.upload = {};

      $scope.addRecipe = function() {
        for(i = 0; i < $scope.upload.flow.files.length; i++) {
          $scope.recipe.slides.push("/images/uploads/"+$scope.upload.flow.files[i].relativePath);
        };

        $scope.recipe.createdOn = Date.now();

        $scope.recipes = createRecipes;

        $scope.recipes.$add($scope.recipe).then(function() {
          alert("Your recipe has been succefully saved!");
          $location.path("/");
        });
        
        // reset the recipe input
        $scope.initRecipe();
      };

      $scope.editRecipe = function(){
        for(i = 0; i < $scope.upload.flow.files.length; i++) {
          $scope.recipe.slides.push("/images/uploads/"+$scope.upload.flow.files[i].relativePath);
        };

        $scope.recipes.$save($scope.recipe).then(function(){
          alert("Your recipe has been succefully updated!");
          $location.path("/recipe/" + $scope.recipe.$id);
        });
      };

      $scope.deleteRecipe = function(){
        $scope.recipes.$remove($scope.recipe).then(function(){
          alert("Your recipe has been succefully deleted!");
          $location.path("/");
        });
      };

      $scope.initRecipe();
    }
]);

app.config(["flowFactoryProvider", function (flowFactoryProvider) {
    flowFactoryProvider.defaults = {
      target: "/images/upload.php",
      permanentErrors: [500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 1
    };
    flowFactoryProvider.on("catchAll", function (event) {
      console.log("catchAll", arguments);
    });
  }
]);

app.run(["$rootScope", "$location", "$anchorScroll", "$routeParams", 
  function($rootScope, $location, $anchorScroll, $routeParams) {
    $rootScope.$on("$routeChangeSuccess", function(newRoute, oldRoute) {
      $location.hash($routeParams.scrollTo);
      $anchorScroll();  
    });
  }
]);