app.controller("AuthController", ["$scope", "$routeParams", "$firebaseAuth", "Auth",
  function($scope, $routeParams, $firebaseAuth, Auth) {
    $scope.auth = Auth;

     $scope.auth.$onAuth(function(authData) {
     $scope.authData = authData;
    });

     $scope.login = function () {
     Auth.$authWithPassword({
     	email: $scope.email,
     	password: $scope.password
     }, function(error, authData) {
     	if (error) {console.log("Login Failed!", error);
     	} 
     	else {console.log("Authenticated successfully with payload:", authData);
     }
     });
    }

    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      Auth.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        $scope.message = "User created with uid: " + userData.uid;
      }).catch(function(error) {
        $scope.error = error;
      });
    };

    $scope.removeUser = function() {
      $scope.message = null;
      $scope.error = null;

      Auth.$removeUser({
        email: $scope.email,
        password: $scope.password
      }).then(function() {
        $scope.message = "User removed";
      }).catch(function(error) {
        $scope.error = error;
      });
    };

  }
]);