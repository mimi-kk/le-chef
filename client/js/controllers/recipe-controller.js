app.controller("RecipesController", function($scope) {
    $scope.recipes = window.FIXTURES;

    $scope.direction = 'left';
    $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.currentIndex = ($scope.currentIndex < $scope.recipes.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.recipes.length - 1;
        };
});

app.controller("RecipeController", function($scope, $location, $routeParams) {
    $scope.recipe = window.FIXTURES[$routeParams.id];
});