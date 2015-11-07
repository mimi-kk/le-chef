app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://fiery-inferno-8595.firebaseio.com/recipes");
    return $firebaseAuth(ref);
  }
]);