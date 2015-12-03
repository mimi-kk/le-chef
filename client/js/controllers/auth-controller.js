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