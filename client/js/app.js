var app = angular.module("leChef", [
    "ngRoute", 
    "ngAnimate",
    "ngTouch",
    "firebase",
    "720kb.socialshare",
    "flow"
]);

app.directive("imageSlider", function(){ 
  return {
    restrict: "E",
    templateUrl: "templates/slider.html"
}; 
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