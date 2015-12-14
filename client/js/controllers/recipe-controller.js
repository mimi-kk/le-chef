app.controller("RecipeController", ["$scope", "$location", "$routeParams", "$compile", "Recipes",
  function($scope, $location, $routeParams, $compile, Recipes) {
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
      
      $scope.html = $scope.recipe.instructions;

      if (typeof $scope.recipe.reviews === "undefined") {
        $scope.recipe.reviews = [{}];
      }

      $scope.calculateAverage = function(AverageData){
        var sum = 0;
        
        if ($scope.recipe.reviews.length > 1) {
          for(var i = 1; i < $scope.recipe.reviews.length; i++){
            sum += parseInt($scope.recipe.reviews[i].stars, 10);
          }

          var average = sum/($scope.recipe.reviews.length-1);
          var roundedAverage = Math.round(average);
          return { 
            average: roundedAverage,
            markedStars: new Array(roundedAverage)
          };
        } else {
          return sum;
        }
      };
    });

    $scope.direction = "left";
    $scope.currentIndex = 0;

    $scope.setCurrentSlideIndex = function(index) {
      $scope.currentIndex = index;
    };

    $scope.isCurrentSlideIndex = function(index) {
      return $scope.currentIndex === index;
    };

    $scope.prevSlide = function() {
      $scope.currentIndex = ($scope.currentIndex < $scope.recipe.slides.length - 1) ? ++$scope.currentIndex : 0;
    };

    $scope.nextSlide = function() {
      $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.recipe.slides.length - 1;
    };

    $scope.goToEditor = function() {
      $location.path("/editor/" + $scope.recipe.$id);
    };
  }
]);