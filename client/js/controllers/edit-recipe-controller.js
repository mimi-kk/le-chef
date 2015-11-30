app.controller("EditRecipeController", ["$scope", "Recipes", "$location", "$routeParams", "currentAuth",
  function($scope, Recipes, $location, $routeParams, currentAuth, focus) {
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

      /*CK Editor Options*/
      $scope.options = {
        toolbar : [{ 
          items : [
            "Bold",
            "Italic",
            "NumberedList",
            "BulletedList",
            "Link",
            "Unlink"
          ]
        }]
      };

      $scope.add = function(key) {
        $scope.recipe[key].push("");
      };

      $scope.remove = function(key, index) {
        $scope.recipe[key].splice(index, 1);
      };

      $scope.addRecipe = function() {
        for(i = 0; i < $scope.upload.flow.files.length; i++) {
          $scope.recipe.slides.push("/images/uploads/"+$scope.upload.flow.files[i].relativePath);
        };

        $scope.recipe.createdOn = Date.now();

        $scope.recipes = Recipes;

        $scope.recipes.$add($scope.recipe).then(function() {
          alert("Your recipe has been succefully saved!");
          $location.path("/");
        });
        
        // reset the recipe input
        $scope.initRecipe();
      };

      $scope.cancelEditRecipe = function(){
        alert("If you wish jellyfish!");
        if ($scope.recipe.$id) {
          $location.path("/recipe/" + $scope.recipe.$id);
        } else {
          $location.path("/");
        }
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
        if (window.confirm("Do you really want to delete your recipe?")){
          $scope.recipes.$remove($scope.recipe).then(function(){
            alert("Your recipe has been succefully deleted!");
            $location.path("/");
          });
        }
      };

      $scope.initRecipe();
    }
]);