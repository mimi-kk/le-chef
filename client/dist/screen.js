var app = angular.module("leChef", [
    "ngRoute",
    "ngSanitize",
    "ngAnimate",
    "ngTouch",
    "ngIOS9UIWebViewPatch",
    "ngAria",
    "ckeditor",
    "firebase",
    "720kb.socialshare",
    "flow",
    "angular-spinkit",
    "toastr"
]);

app.config(["flowFactoryProvider", function(flowFactoryProvider) {
    flowFactoryProvider.defaults = {
      target: "/images/upload.php",
      permanentErrors: [500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 1
    };
    flowFactoryProvider.on("catchAll", function(event) {
      console.log("catchAll", arguments);
    });
  }
]);

app.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    positionClass: 'toast-bottom-left'
  });
});

app.run(["$rootScope", "$location", "$anchorScroll", "$routeParams", 
  function($rootScope, $location, $anchorScroll, $routeParams) {
    $rootScope.$on("$routeChangeSuccess", function(newRoute, oldRoute) {
      $location.hash($routeParams.scrollTo);
      $anchorScroll();  
    });
  }
]);

app.run(["$rootScope", "$location", 
  function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      if (error === "AUTH_REQUIRED") {
        $location.path("/auth");
      }
    });
  }
]);
app.config(["$routeProvider", "$compileProvider", 
    function($routeProvider, $compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

        $routeProvider
        .when("/", {
            templateUrl: "templates/recipes.html",
            controller: "RecipesController",
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                return Auth.$waitForAuth();
            }]
        }})
        .when("/recipe/:id", {
            templateUrl: "templates/recipe.html",
            controller: "RecipeController",
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                return Auth.$waitForAuth();
            }]
        }})
        .when("/editor/", {
            templateUrl: "templates/editor.html",
            controller: "EditorController",
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireAuth();
            }]
        }})
        .when("/editor/:id", {
            templateUrl: "templates/editor.html",
            controller: "EditorController",
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireAuth();
            }]
        }})
        .when("/auth", {
            templateUrl: "templates/auth.html",
            controller: "AuthController",
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                return Auth.$waitForAuth();
            }]
        }})
        .when("/reset", {
            templateUrl: "templates/reset.html",
            controller: "AuthController",
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                return Auth.$waitForAuth();
            }]
        }})
        .when("/new-password", {
            templateUrl: "templates/new-password.html",
            controller: "AuthController",
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                return Auth.$waitForAuth();
            }]
        }})
        .otherwise({
            redirectTo: "/"
        });
    }
]);
app.controller("AuthController", ["$scope", "$routeParams", "$location", "$firebaseAuth", "Auth",
  function($scope, $routeParams, $location, $firebaseAuth, Auth) {
    $scope.auth = Auth;

    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });

    $scope.login = function() {
      $scope.message = null;
      $scope.error = null;

      Auth
      .$authWithPassword({
       	email: $scope.email,
       	password: $scope.password})
      .then(function(userData) {
        $scope.message = "Loged in successfully as " + "" + userData.password.email;})
      .catch(function(error) {
        $scope.error = "Something went wrong! Please try again or reset password.";})
      .then(function() {
        if ($scope.error !== null) {
          $location.path("/auth");
        }
        else {
          $location.path("/");
        }
      });
    };

    $scope.resetPassword = function() {
      $scope.message = null;
      $scope.error = null;

      Auth
      .$resetPassword({
        email: $scope.email})
      .then(function(error) {
        if ($scope.error === null) {
          $scope.message = "Password reset email sent successfully. Check your inbox.";
        } else {
          $scope.error = "Error sending password reset email:";
        }
      });
    };

    $scope.changePassword = function() {
      $scope.message = null;
      $scope.error = null;

      Auth
      .$changePassword({
        email: $scope.email,
        oldPassword: $scope.oldPassword,
        newPassword: $scope.newPassword})
      .then(function(error) {
        if ($scope.error === null) {
          $scope.message = "Password changed successfully";
        } else {
          $scope.error = "Error changing password:";
        }
      });
    };
  }
]);
app.controller("EditorController", ["$scope", "toastr", "Recipes", "$location", "$routeParams", "currentAuth",
  function($scope, toastr, Recipes, $location, $routeParams, currentAuth, focus) {
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
        toolbar: [{ 
          items: [
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
        for(var i = 0; i < $scope.upload.flow.files.length; i++) {
          $scope.recipe.slides.push("/images/uploads/"+$scope.upload.flow.files[i].relativePath);
        };

        $scope.recipe.createdOn = Date.now();

        $scope.recipes = Recipes;

        $scope.recipes.$add($scope.recipe).then(function() {
          toastr.success("Your recipe has been succefully saved!");
          $location.path("/");
        });
        
        // reset the recipe input
        $scope.initRecipe();
      };

      $scope.cancelEditRecipe = function() {
        toastr.success("If you wish jellyfish!");
        if ($scope.recipe.$id) {
          $location.path("/recipe/" + $scope.recipe.$id);
        } else {
          $location.path("/");
        }
      };

      $scope.editRecipe = function() {
        for (var i = 0; i < $scope.upload.flow.files.length; i++) {
          $scope.recipe.slides.push("/images/uploads/"+$scope.upload.flow.files[i].relativePath);
        }

        $scope.recipes.$save($scope.recipe).then(function() {
          toastr.success("Your recipe has been succefully updated!");
          $location.path("/recipe/" + $scope.recipe.$id);
        });
      };

      $scope.deleteRecipe = function(){
        if (window.confirm("Do you really want to delete your recipe?")){
          $scope.recipes.$remove($scope.recipe).then(function(){
            toastr.success("Your recipe has been succefully deleted!");
            $location.path("/");
          });
        }
      };

      $scope.initRecipe();
    }
]);
app.controller("RecipeController", ["$scope", "toastr", "$location", "$routeParams", "$compile", "Recipes",
  function($scope, toastr, $location, $routeParams, $compile, Recipes) {
    $scope.addReview = function() {
      $scope.recipe.reviews.push($scope.recipe.review);
      $scope.recipe.review.createdOn = Date.now();
      $scope.recipe.review = {};

      $scope.recipes.$save($scope.recipe).then(function(){
        $scope.reviewForm.$setPristine();
        toastr.success("Your review has been succefully sent!");
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
app.controller("RecipesController", ["$scope", "$location", "Recipes", "$http",
  function($scope, $location, Recipes, $http) {
  	$scope.loading = true;
  	
    $http.get("https://fiery-inferno-8595.firebaseio.com/recipes/")
      .success(function(data) {})
      .catch(function(err) {})
      .finally(function() {
        $scope.loading = false;
      });
  	
    $scope.recipes = Recipes;
    $scope.currentPath = window.location;
  }]
);
app.directive("eventFocus", function(focus) {
    return function(scope, elem, attr) {
        elem.on(attr.eventFocus, function() {
        focus(attr.eventFocusId);
    });

    // Removes bound events in the element itself
    // when the scope is destroyed
    scope.$on("$destroy", function() {
            element.off(attr.eventFocus);
        });
    };
})
app.directive("imageSlider", function(){ 
    return {
        restrict: "E",
        templateUrl: "templates/slider.html"
    }; 
});
app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://fiery-inferno-8595.firebaseio.com/recipes");
    return $firebaseAuth(ref);
  }
]);
app.factory("Recipes", ["$firebaseArray",
  function($firebaseArray) {
    var ref = new Firebase("https://fiery-inferno-8595.firebaseio.com/recipes/");
    return $firebaseArray(ref);
  }
]);
app.factory("focus", function($timeout, $window) {
  return function(id) {
  // timeout makes sure that is invoked after any other event has been triggered.
  // e.g. click events that need to run before the focus or
  // inputs elements that are in a disabled state but are enabled when those events
  // are triggered.
    $timeout(function() {
      var element = $window.document.getElementById(id);
      if(element)
      element.focus();
    });
  };
})