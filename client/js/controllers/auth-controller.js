app.controller("AuthController", ["$scope", "$routeParams", "$location", "$firebaseAuth", "Auth",
  function($scope, $routeParams, $location, $firebaseAuth, Auth) {
    $scope.auth = Auth;

     $scope.auth.$onAuth(function(authData) {
     $scope.authData = authData;
    });

     $scope.login = function () {
      $scope.message = null;
      $scope.error = null;

     Auth.$authWithPassword({
     	email: $scope.email,
     	password: $scope.password
      }).then(function(userData) {
        $scope.message = "Loged in successfully as " + "" + userData.password.email;
      }).catch(function(error) {
        $scope.error = "Something went wrong! Please try again or contact us.";
      }).then(function() {
        if ($scope.error !== null) {
          $location.path("/auth");
        }
        else {
          $location.path("/");
        }
      });
      };
    }
]);