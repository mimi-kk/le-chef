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