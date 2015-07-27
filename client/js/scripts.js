(function(){
  var app = angular.module('leChef', []);
  
  app.controller("RecipeController", function(){
  this.recipes = recipes;
  });

  var recipes = [{
    id: "1",
    date: "",
    author: "Ella",
    title: "Polenta",
    lead: "Curry Grilled Vegetables with Chickpeas",
    readytime: [{
        preptime: ""
    }, {
        cooktime: ""
    }],
    instructions: "Drain and rinse. Bring to boild and let simmer for 15 minutes",
    keywords: ["Glutenfree", "Healthy", "Corn"],
    ingredients: ["Polenta", "Milk", "Olive Oil"],
    images: "../images/polenta-200x200px.jpg",
    videos: [],
    mass: [{
        us: {
            "fahrenheit": "",
            "teaspoon": "",
            "tablespoon": "",
            "cup": "",
            "ounce": "",
            "pound": ""
        }
    }, {
        metric: {
            g: "",
            kg: "",
            ml: "",
            l: "",
            celsius: ""
        }
    }],
    rating: [],
  }];      
})();