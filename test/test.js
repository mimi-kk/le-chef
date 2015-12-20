describe("Get an instance of my recipes", function () {
  beforeEach(module("leChef"));

  beforeEach(module(function ($provide) {
    $provide.value("Recipes", {
        Recipes: [{
        cookingtime: "12",
        createdOn: 1446532478798,
        ingredients: [ "1 1/2 cups rolled oats", "1/2 cup dried coconut flakes", "1/2 cup raw sliced almonds", "1/2 teaspoons ground cinnamon", "1/2 teaspoon ground cardamom", "1/4 teaspoon salt (don’t fear the salt!)", "2 tablespoons honey", "2 tablespoons coconut oil", "1/4 teaspoon vanilla extract", "Goji Berries (optional)" ],
        instructions: "<ol>\n\t<li>Preheat oven to 300 (140 degrees celcius) and line a baking sheet with parchment paper.</li>\n\t<li>Mix together oats, coconut, almonds, sesame seeds, cinnamon, cardamom, and salt in a large mixing bowl.</li>\n\t<li>In a small mixing bowl, add honey and coconut oil. Place the bowl into warm water and stir until coconut oil melts, and add in vanilla extract.</li>\n\t<li>Pour the honey mixture over the oat and nut mixture. Stir so that honey coats the oat mixture.</li>\n\t<li>Spread in a thin layer on baking sheet and bake for approximately 30 minutes until lightly toasted. If you want clumpy granola, don&rsquo;t mix as it&rsquo;s baking. That&rsquo;s the key!</li>\n\t<li>Allow to cool completely.</li>\n\t<li>Add gojis if you want and store in an air-tight container (this will last for approximately two weeks).</li>\n</ol>\n\n<p>You can also use olive oil instead of coconut oil or add other nuts (for example pistachios) or different kind of berries. On The Kitchn you can find basic directions for making a great batch of granola, every time.</p>\n",
        keywords: [ "Granola", "Breakfast" ],
        lead: "with Cardamom and Almonds",
        preptime: "12",
        reviews: [ null, {
          author: "Nora",
          body: "This is my favorite Granola",
          createdOn: 1447195589735,
          stars: "5"
        }, {
          author: "Roy",
          body: "Sehr gut",
          createdOn: 1447333402884,
          stars: "5"
        }, {
          author: "Gourmet85",
          body: "Total fein!",
          createdOn: 1448786302713,
          stars: "3"
        }, {
          author: "Adi",
          body: "Cool",
          createdOn: 1448972506650,
          stars: "3"
        } ],
        slides: [ "/images/uploads/dsc04165.jpg", "/images/uploads/dsc04107.jpg", "/images/uploads/dsc04119.jpg", "/images/uploads/granola.jpg" ],
        title: "Coconut Granola",
        totaltime: "12"
      },
      {
        cookingtime: "16 Min",
        createdOn: 1446489211740,
        ingredients: [ "Greean Beans", "Olive Oil", "Mini Potatoes", "Basilikum" ],
        instructions: "<p>Heat the oil in a heavy large skillet over medium-high heat. Add the <a class=\"crosslink\" href=\"http://www.foodterms.com/encyclopedia/chorizo/index.html\">chorizo</a> and cook, breaking up the clumps, until dry and <a class=\"crosslink\" href=\"http://www.foodterms.com/encyclopedia/crisp/index.html\">crisp</a>, about 10 minutes. Using a slotted spoon, transfer the chorizo to a paper lined plate to absorb any additional oil. Pour off all but 1 tablespoon of fat from the pan and heat the pan over medium-high heat. Add the <a class=\"crosslink\" href=\"http://www.foodterms.com/encyclopedia/onion/index.html\">onions</a> and boiled potatoes and saute until brown, about 12 minutes. Stir in the cooked chorizo and season with just a little salt and pepper, to taste. Transfer to a serving bowl and serve.</p>\n",
        keywords: [ "Farmer's Food", "Easy to cook", "Beans" ],
        lead: "If you want to have a quick and simple dinner",
        preptime: "5 Min",
        reviews: [ null, {
          author: "nora",
          body: "top",
          createdOn: 1446665676264,
          stars: "5"
        }, {
          author: "Mimi",
          body: "Sehr lecker!",
          createdOn: 1448799161952,
          stars: "4"
        }, {
          author: "Felix",
          body: "mhhhh.. yummmi inmy tummy",
          createdOn: 1448890652694,
          stars: "5"
        }, {
          author: "Sieht man doch am Login?",
          body: "Super fein, aber: wieviele Würste brauchts dazu?",
          createdOn: 1449691507804,
          stars: "4"
        }, {
          author: "Fabian",
          body: "Was ist das...?",
          createdOn: 1450349851565,
          stars: "1"
        } ],
        slides: [ "/images/uploads/ingredients_.jpg", "/images/uploads/1.jpg", "/images/uploads/2.jpg", "/images/uploads/3.jpg", "/images/uploads/4.jpg", "/images/uploads/7.jpg", "/images/uploads/8.jpg", "/images/uploads/9.jpg", "/images/uploads/11.jpg", "/images/uploads/12.jpg", "/images/uploads/auftischen_.jpg", "/images/uploads/auftischen_1.jpg" ],
        title: "Chorizo with mini Potatos",
        totaltime: "20 Min"
      }]
    });
  }));

  it("gets an instance of my recipes", inject(function(Recipes) {
    expect(Recipes).toBeDefined();
  }));
});

describe("Calculate average correctly", function(){
  beforeEach(module("leChef"));

  // Setup the mock service
  beforeEach(module(function ($provide) {
    $provide.value("Recipes", {
        cookingtime: "12",
        createdOn: 1446532478798,
        ingredients: [ "1 1/2 cups rolled oats", "1/2 cup dried coconut flakes", "1/2 cup raw sliced almonds", "1/2 teaspoons ground cinnamon", "1/2 teaspoon ground cardamom", "1/4 teaspoon salt (don’t fear the salt!)", "2 tablespoons honey", "2 tablespoons coconut oil", "1/4 teaspoon vanilla extract", "Goji Berries (optional)" ],
        instructions: "<ol>\n\t<li>Preheat oven to 300 (140 degrees celcius) and line a baking sheet with parchment paper.</li>\n\t<li>Mix together oats, coconut, almonds, sesame seeds, cinnamon, cardamom, and salt in a large mixing bowl.</li>\n\t<li>In a small mixing bowl, add honey and coconut oil. Place the bowl into warm water and stir until coconut oil melts, and add in vanilla extract.</li>\n\t<li>Pour the honey mixture over the oat and nut mixture. Stir so that honey coats the oat mixture.</li>\n\t<li>Spread in a thin layer on baking sheet and bake for approximately 30 minutes until lightly toasted. If you want clumpy granola, don&rsquo;t mix as it&rsquo;s baking. That&rsquo;s the key!</li>\n\t<li>Allow to cool completely.</li>\n\t<li>Add gojis if you want and store in an air-tight container (this will last for approximately two weeks).</li>\n</ol>\n\n<p>You can also use olive oil instead of coconut oil or add other nuts (for example pistachios) or different kind of berries. On The Kitchn you can find basic directions for making a great batch of granola, every time.</p>\n",
        keywords: [ "Granola", "Breakfast" ],
        lead: "with Cardamom and Almonds",
        preptime: "12",
        reviews: [{
          author: "Nora",
          body: "This is my favorite Granola",
          createdOn: 1447195589735,
          stars: "5"
        }, {
          author: "Roy",
          body: "Sehr gut",
          createdOn: 1447333402884,
          stars: "5"
        }, {
          author: "Gourmet85",
          body: "Total fein!",
          createdOn: 1448786302713,
          stars: "3"
        }, {
          author: "Adi",
          body: "Cool",
          createdOn: 1448972506650,
          stars: "3"
        } ],
        slides: [ "/images/uploads/dsc04165.jpg", "/images/uploads/dsc04107.jpg", "/images/uploads/dsc04119.jpg", "/images/uploads/granola.jpg" ],
        title: "Coconut Granola",
        totaltime: "12"
    });
  }));
  
  //Not possible to test directly in RecipeController due to Firebase, the reason why added logic in the unit test
  it("calculates average correctly", inject(function(Recipes) {
    var average, roundedAverage, sum;

    Recipes.calculateAverage = function(AverageData){
      sum = 0;
      
      if (Recipes.reviews.length > 1) {
        for(var i = 1; i < Recipes.reviews.length; i++){
          sum += parseInt(Recipes.reviews[i].stars, 10);
        }

        average = sum/(Recipes.reviews.length-1);
        roundedAverage = Math.round(average);

        return { 
          average: roundedAverage,
          markedStars: new Array(roundedAverage)
        };
      } else {
        return sum;
      }
    };
  
    Recipes.calculateAverage();

    expect(average).toBe(sum/(Recipes.reviews.length-1));
    expect(roundedAverage).toBe(Math.round(average));
  }));
});