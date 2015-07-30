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
            fahrenheit: "",
            teaspoon: "",
            tablespoon: "",
            cup: "",
            ounce: "",
            pound: ""
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
  }, {
    id: "1",
    date: "",
    author: "Ella",
    title: "Porridge",
    lead: "Blueberries ‘n’ Cream Amaranth",
    readytime: [{
        preptime: ""
    }, {
        cooktime: ""
    }],
    instructions: "Drain and rinse. Bring to boild and let simmer for 15 minutes",
    keywords: ["Glutenfree", "Healthy", "Amaranth"],
    ingredients: ["Amaranth", "Water", "Blueberries"],
    images: "../images/amaranth-200x200px.jpg",
    videos: [],
    mass: [{
        us: {
            fahrenheit: "",
            teaspoon: "",
            tablespoon: "",
            cup: "",
            ounce: "",
            pound: ""
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
  }, {
    id: "1",
    date: "",
    author: "Ella",
    title: "Pizza",
    lead: "Baby spinach 'n' red onions",
    readytime: [{
        preptime: ""
    }, {
        cooktime: ""
    }],
    instructions: "Make dough. Roll the dough out onto a surface covered in cornmeal",
    keywords: ["Pizza", "Healthy", "Italian"],
    ingredients: ["Spinach", "Onions", "Flour"],
    images: "../images/pizza-200x200px.jpg",
    videos: [],
    mass: [{
        us: {
            fahrenheit: "",
            teaspoon: "",
            tablespoon: "",
            cup: "",
            ounce: "",
            pound: ""
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
  }, {
    id: "1",
    date: "",
    author: "Ella",
    title: "Carrot Soup",
    lead: "Curry 'n' coconut",
    readytime: [{
        preptime: ""
    }, {
        cooktime: ""
    }],
    instructions: "Heat olive oil over medium heat. Cook for 3-4 minutesd and let simmer for 15 minutes.",
    keywords: ["Glutenfree", "Healthy", "Summer"],
    ingredients: ["Carrots", "Water", "Coconut milk"],
    images: "../images/carrot-200x200px.jpg",
    videos: [],
    mass: [{
        us: {
            fahrenheit: "",
            teaspoon: "",
            tablespoon: "",
            cup: "",
            ounce: "",
            pound: ""
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
  }, {
    id: "1",
    date: "",
    author: "Ella",
    title: "Tacos",
    lead: "Avocado and Microgreens",
    readytime: [{
        preptime: ""
    }, {
        cooktime: ""
    }],
    instructions: "Drain and rinse. Bring to boild and let simmer for 15 minutes",
    keywords: ["Glutenfree", "Healthy", "Mexican"],
    ingredients: ["Lentils", "Greens", "Corn meal"],
    images: "../images/tacos-200x200px.jpg",
    videos: [],
    mass: [{
        us: {
            fahrenheit: "",
            teaspoon: "",
            tablespoon: "",
            cup: "",
            ounce: "",
            pound: ""
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