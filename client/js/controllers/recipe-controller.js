app.controller("RecipeController", ["$scope", "$location", "$routeParams", "Recipes",
  function($scope, $location, $routeParams, Recipes) {
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