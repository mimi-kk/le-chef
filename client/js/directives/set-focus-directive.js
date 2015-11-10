app.directive("setFocus", function(){
  return{
      scope: {setFocus: "="},
      link: function(scope, element){
         if(scope.setFocus) element[0].focus();             
      }
  };
});