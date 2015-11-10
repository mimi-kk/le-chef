app.controller("AuthController", ["$scope", "$routeParams", "$firebaseAuth", "Auth",
  function($scope, $routeParams, $firebaseAuth, Auth) {
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
      });
    }


  }
]);