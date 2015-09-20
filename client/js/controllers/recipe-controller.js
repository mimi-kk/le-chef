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

app.controller("EditorController", [ "$scope", function($scope) {
    $scope.data = {};

    $scope.update = function(recipe) {
        $scope.data = angular.copy(recipe);
    };

    $scope.reset = function() {
        $scope.recipe = angular.copy($scope.data);
    }

    $scope.reset();
}]);