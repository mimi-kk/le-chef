var app = angular.module("leChef", [
    "ngRoute", 
    "ngAnimate",
    "firebase",
    "720kb.socialshare"
]);

app.config(function($routeProvider) {
    $routeProvider.
    when("/", {
        templateUrl: "templates/recipes.html",
        controller: "RecipesController"
    }).
    when("/recipe/:id", {
        templateUrl: "templates/recipe.html",
        controller: "RecipeController"
    }).
    when("/editor/", {
        templateUrl: "templates/editor.html",
        controller: "AddRecipeController"
    }).
    when("/editor/:id", {
        templateUrl: "templates/editor.html",
        controller: "EditRecipeController"
    }).
    otherwise({
        redirectTo: "/"
    });
});

window.fbAsyncInit = function() {
    FB.init({
      appId      : '774079302702991',
      xfbml      : true,
      version    : 'v2.4'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));