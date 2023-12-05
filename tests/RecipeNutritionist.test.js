
const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const { booksGET } = require("../service/RecipeNutritionistService");
const app = require('../index.js');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

const nutritionistID = generateTestnutritionistID();
const recipeID = generateTestRecipeID();
const maxRecipeID = Math.pow(10, 6); //the max Id a Nutritionist can have

//Get Request
test('Test of the stracture that get gives', async (t) => {

    const { body, statusCode } = await t.context.got.get(
        `nutritionist/${nutritionistID}/recipe/${recipeID}`
    );

    //status Code should be 200
    t.is(statusCode, 200, "Should return 200");

    //Checking the Arrays
    t.true(Array.isArray(body.IngredientsName) && Array.isArray(body.Instructions)
     && Array.isArray(body.NutritionalTable) && Array.isArray(body.IngredientsQuantity)
     , 'checking that all the variables that should be string are');

    //Checking the strings
    t.is(typeof body.difficulty, 'string');
    t.is(typeof body.servings, 'string');
    t.is(typeof body.recipeType, 'string');

    //Checking the RecipeID and time
    t.is(typeof body.recipeID, 'number');
    t.is(typeof body.time, 'number');

})

//Put Request
test('PUT RecipeNutritionist returns corect response with required fields', async (t) => {
    
    const mockRecipeData = {
        IngredientsName: ["Chicken Breast", "Olive Oil", "Garlic", "Lemon Juice", "Paprika", "Salt", "Black Pepper", "Fresh Parsley"],
        difficulty: "Easy",
        servings: "4",
        recipeType: "Main Course",
        Instructions: [
          "Preheat oven to 375°F (190°C).",
          "In a bowl, mix olive oil, minced garlic, lemon juice, paprika, salt, and black pepper.",
          "Place chicken breasts in a baking dish and pour the mixture over them.",
          "Bake in the preheated oven for 25-30 minutes or until chicken is cooked through.",
          "Garnish with chopped fresh parsley before serving."
        ],
        NutritionalTable: [
          "Calories: 165",
          "Protein: 26g",
          "Fat: 4.5g",
          "Carbohydrates: 3g",
          "Sodium: 322mg"
        ],
        IngredientsQuantity: [
          "4 medium-sized chicken breasts",
          "2 tablespoons olive oil",
          "3 cloves garlic, minced",
          "2 tablespoons lemon juice",
          "1 teaspoon paprika",
          "1/2 teaspoon salt",
          "1/4 teaspoon black pepper",
          "2 tablespoons chopped fresh parsley"
        ],
        time: 35,
        recipeID: 101,
        imgRecipe: "https://example.com/images/chicken-breast-recipe.jpg"
      };
      
    const { body, statusCode } = await t.context.got.put(
        `nutritionist/${nutritionistID}/recipe/${recipeID}`, {
        json: mockRecipeData,
    });
    // Assertions
    t.is(statusCode, 200, 'Should return 200 ');
    
    console.log(body);
});


test('PUT RecipeNutritionist returns error 400 with bad parameters', async (t) => {
    // Assuming mockRecipeData contains some invalid parameters
    const mockRecipeData = {
        IngredientsName: ["Chicken Breast", "Olive Oil", "Garlic", "Lemon Juice", "Paprika", "Salt", "Black Pepper", "Fresh Parsley"],
        difficulty: "Easy",
        servings: "invalid_number", // Intentionally incorrect type for testing
        recipeType: "Main Course",
        Instructions: [
          "Preheat oven to 375°F (190°C).",
          "In a bowl, mix olive oil, minced garlic, lemon juice, paprika, salt, and black pepper.",
          "Place chicken breasts in a baking dish and pour the mixture over them.",
          "Bake in the preheated oven for 25-30 minutes or until chicken is cooked through.",
          "Garnish with chopped fresh parsley before serving."
        ],
        NutritionalTable: [
          "Calories: 165",
          "Protein: 26g",
          "Fat: 4.5g",
          "Carbohydrates: 3g",
          "Sodium: 322mg"
        ],
        IngredientsQuantity: [
          "4 medium-sized chicken breasts",
          "2 tablespoons olive oil",
          "3 cloves garlic, minced",
          "2 tablespoons lemon juice",
          "1 teaspoon paprika",
          "1/2 teaspoon salt",
          "1/4 teaspoon black pepper",
          "2 tablespoons chopped fresh parsley"
        ],
        time: "5", // Assuming this should be a number
        recipeID: 101,
        imgRecipe: "https://example.com/images/chicken-breast-recipe.jpg"
    };

    try {
        const { body, statusCode } = await t.context.got.put(
            `nutritionist/${nutritionistID}/recipe/${recipeID}`, {
            json: mockRecipeData,
        });

        
    } catch (error) {
        // Assert that the error status code is 400
        t.is(error.response.statusCode, 400, 'Should return 400 with bad parameters');
        t.like(error.response.body.errors,[
            {
              path: '.body.time',
              message: 'should be integer',
              errorCode: 'type.openapi.validation'
            }
          ]);
    }
});

//Delete Recipe
test('Test of the Delete Recipe with success', async (t) => {

    const { body, statusCode } = await t.context.got.delete(
        `nutritionist/${nutritionistID}/recipe/${recipeID}`
    );

    //status Code should be 200
    t.is(statusCode, 200, "Should return 200 when recipe is deleted");

});

test('Test of the Delete Recipe with 400 error code', async (t) => {
    const wrongRecipeId = '@';

    try {
        const { body, statusCode } = await t.context.got.delete(
            `nutritionist/${nutritionistID}/recipe/${wrongRecipeId}`
        );

    } catch (error) {
        t.is(error.response.statusCode, 400, "Should return 400 when there is a bad parameter");
        t.like(error.response.body.errors,[
            {
                path: '.params.recipeID',
                message: 'should be integer',
                errorCode: 'type.openapi.validation'
            }
          ]);
    }
    

});




test.after.always((t) => {
    t.context.server.close();
});

function generateTestnutritionistID() {
    return Math.floor(Math.random() * 100000) + 1;
}

function generateTestRecipeID() {
    return Math.floor(Math.random() * 1000000) + 1;
}


