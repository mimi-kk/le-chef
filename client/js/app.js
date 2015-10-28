var app = angular.module("leChef", [
    "ngRoute",
    "ngSanitize",
    "ngAnimate",
    "ngTouch",
    "ngIOS9UIWebViewPatch",
    "firebase",
    "720kb.socialshare",
    "flow"
]);

app.config(["flowFactoryProvider", function (flowFactoryProvider) {
    flowFactoryProvider.defaults = {
      target: "/images/upload.php",
      permanentErrors: [500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 1
    };
    flowFactoryProvider.on("catchAll", function (event) {
      console.log("catchAll", arguments);
    });
  }
]);

app.run(["$rootScope", "$location", "$anchorScroll", "$routeParams", 
  function($rootScope, $location, $anchorScroll, $routeParams) {
    $rootScope.$on("$routeChangeSuccess", function(newRoute, oldRoute) {
      $location.hash($routeParams.scrollTo);
      $anchorScroll();  
    });
  }
]);