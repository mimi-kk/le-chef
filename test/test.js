describe("Le Chef", function() {
	it("Works!", function() {
		expect(true).toBe(true);
	});
});


// describe("RecipesController", function(){

//     beforeEach(module('leChef'));

//     var $controller,
//         $scope;

//     beforeEach(inject(function(_$controller_-){
//        $controller = _$controller_;
//     }));    

//     describe("$scope", function(){
//         it("should create 'overview' with all recipes", function() {
//             var $scope = {},
//                 ctrl = $controller('RecipesController', {$scope});

//             expect($scope.recipes.length).toBeGreaterThan(0);
//         });
//     });
// });



describe('Unit: RecipesController', function() {
  // Load the module with RecipesController
  beforeEach(module('leChef'));

  // var ctrl, scope;

  // beforeEach(inject(function($controller, $rootScope) {
  //   // Create a new scope that's a child of the $rootScope
  //   scope = $rootScope.$new();
  //   // Create the controller
  //   ctrl = $controller('RecipesController', {
  //     $scope: scope
  //   });
  // }));

   it('should create "overview" with all recipes', inject(function($controller){
        var scope = {},
            ctrl = $controller('RecipesController', {
              $scope: scope
        });  
      expect(scope.recipes.length).toBeGreaterThan(0);
  }));
});

// describe('RecipesController', function() {
//   beforeEach(module('Le Chef'));

//   var $controller;

//   beforeEach(inject(function(_$controller_){
//     // The injector unwraps the underscores (_) from around the parameter names when matching
//     $controller = _$controller_;
//   }));

//   describe('$scope.grade', function() {
//     it('sets the strength to "strong" if the password length is >8 chars', function() {
//       var $scope = {};
//       var controller = $controller('RecipesController', { $scope: $scope });
//       $scope.password = 'longerthaneightchars';
//       $scope.grade();
//       expect($scope.strength).toEqual('strong');
//     });
//   });
// });