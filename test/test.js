describe("Le Chef", function() {
	it("Works!", function() {
		expect(true).toBe(true);
	});
});


describe('RecipesController', function(){
  beforeEach(module('leChef'));
  
  var scope, ctrl;

  beforeEach(inject(function($controller, $rootScope, Recipes) {
    scope = $rootScope.$new();
    ctrl = $controller("RecipesController", {
      $scope: scope,
      Recipes : function(){
        return [
          {"": ""},
          {"": ""}
        ]}
      });
  }));

  it('should create "overview" with all recipes', function() { 
    scope.$digest();
    expect(scope.recipes.length).toBeGreaterThan(0);
  });
});



// describe('Unit: RecipesController', function() {
//   // Load the module with RecipesController
//   beforeEach(module('leChef'));

  // var ctrl, scope;

  // beforeEach(inject(function($controller, $rootScope) {
  //   // Create a new scope that's a child of the $rootScope
  //   scope = $rootScope.$new();
  //   // Create the controller
  //   ctrl = $controller('RecipesController', {
  //     $scope: scope
  //   });
  // }));

//    it('should create "overview" with all recipes', inject(function($controller){
//         var scope = {},
//             ctrl = $controller('RecipesController', {
//               $scope: scope
//         });  
//       expect(scope.recipes.length).toBeGreaterThan(0);
//   }));
// });