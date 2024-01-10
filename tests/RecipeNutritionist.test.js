const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

//import the functions from RecipeNutritionistService
const { getRecipeNutrionist, updateRecipeNutritionist, deleteRecipe, addRecipe } = require("../service/RecipeNutritionistService");
const app = require('../index.js');

// Setting up the server before running tests
test.before(async (t) => {
    // Creating an HTTP server for the app
    t.context.server = http.createServer(app);
    // Listening to the server and setting the URL in the test context
    t.context.prefixUrl = await listen(t.context.server);
    // Extending 'got' for HTTP requests with predefined options
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json', throwHttpErrors: false });
});

//generate random nutritionistID and recipeID
const nutritionistID = generateTestnutritionistID();
const recipeID = generateTestRecipeID();

//initialize the mock data for the recipe
const mockRecipeData = {
  IngredientsName: [
    "Chicken Breast",
    "Olive Oil",
    "Garlic",
    "Lemon Juice",
    "Paprika",
    "Salt",
    "Black Pepper",
    "Fresh Parsley",
  ],
  difficulty: "Easy",
  servings: "4",
  recipeType: "Main Course",
  Instructions: [
    "Preheat oven to 375°F (190°C).",
    "In a bowl, mix olive oil, minced garlic, lemon juice, paprika, salt, and black pepper.",
    "Place chicken breasts in a baking dish and pour the mixture over them.",
    "Bake in the preheated oven for 25-30 minutes or until chicken is cooked through.",
    "Garnish with chopped fresh parsley before serving.",
  ],
  NutritionalTable: [
    "Calories: 165",
    "Protein: 26g",
    "Fat: 4.5g",
    "Carbohydrates: 3g",
    "Sodium: 322mg",
  ],
  IngredientsQuantity: [
    "4 medium-sized chicken breasts",
    "2 tablespoons olive oil",
    "3 cloves garlic, minced",
    "2 tablespoons lemon juice",
    "1 teaspoon paprika",
    "1/2 teaspoon salt",
    "1/4 teaspoon black pepper",
    "2 tablespoons chopped fresh parsley",
  ],
  time: 35,
  recipeID: 101,
  imgRecipe: "https://example.com/images/chicken-breast-recipe.jpg",
};

//unit testing

//test for the function getRecipeNutrionist
test('Test of the function getRecipeNutrionist', async (t) => {
    //get the recipe from the function getRecipeNutrionist
    const recipe = await getRecipeNutrionist(nutritionistID, recipeID);
    // Check if all necessary attributes exist and are truthy
    t.truthy(recipe.IngredientsName, 'Checking that the IngredientsName is not empty');
    t.truthy(recipe.difficulty, 'Checking that the difficulty is not empty');
    t.truthy(recipe.servings, 'Checking that the servings is not empty');
    t.truthy(recipe.recipeType, 'Checking that the recipeType is not empty');
    t.truthy(recipe.Instructions, 'Checking that the Instructions is not empty');
    t.truthy(recipe.NutritionalTable, 'Checking that the NutritionalTable is not empty');
    t.truthy(recipe.IngredientsQuantity, 'Checking that the IngredientsQuantity is not empty');
    t.truthy(recipe.time, 'Checking that the time is not empty');
    t.truthy(recipe.imgRecipe, 'Checking that the imgRecipe is not empty');

    //vallidate the data types and structure
    //checking that IngredientsName is an array
    t.true(Array.isArray(recipe.IngredientsName), 'Checking that the IngredientsName is an array');
    //checking that difficulty, servings, recipeType are strings
    t.is(typeof recipe.difficulty, 'string', 'Checking that the difficulty is a string');
    t.is(typeof recipe.servings, 'string', 'Checking that the servings is a string');
    t.is(typeof recipe.recipeType, 'string', 'Checking that the recipeType is a string');
    //checking that Instructions, NutritionalTable, IngredientsQuantity are arrays
    t.true(Array.isArray(recipe.Instructions), 'Checking that the Instructions is an array');
    t.true(Array.isArray(recipe.NutritionalTable), 'Checking that the NutritionalTable is an array');
    t.true(Array.isArray(recipe.IngredientsQuantity), 'Checking that the IngredientsQuantity is an array');
    //checking that time and recipeID are numbers   
    t.is(typeof recipe.time, 'number', 'Checking that the time is a number');
    t.is(typeof recipe.recipeID, 'number', 'Checking that the recipeID is a number');
    t.is(typeof recipe.imgRecipe, 'string', 'Checking that the imgRecipe is a string');

});

//testing for the function addRecipe
test('Test of the function addRecipe', async (t) => {
        //get the recipe from the function addRecipe
        const result = await addRecipe(mockRecipeData, nutritionistID);
    
        console.log('Hello world\n');
        console.log(typeof result);
        // Check if  the result is an object
        t.is(
            typeof result,
            'object',
        " addRecipe should return a object"
        );
});

//testing for the function updateRecipeNutritionist
test('Test of the function updateRecipeNutritionist', async (t) => {
    //get the recipe from the function updateRecipeNutritionist
    const result = await updateRecipeNutritionist(mockRecipeData ,nutritionistID ,recipeID);
    // Check if  result is undefined
    t.truthy(
    typeof result,
        undefined,
        "updateRecipeReport should be a undefined"
      );
});

//testing for the function deleteRecipe
test('Test of the function deleteRecipe', async (t) => {
    //get the recipe from the function deleteRecipe
    const result = await deleteRecipe(nutritionistID, recipeID);
    // Check if  result is undefined
    t.truthy(
        typeof result,
        undefined,
        "deleteRecipeReport should be a undefined"
      );
});

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
});

//Put Request
test('PUT RecipeNutritionist returns corect response with required fields', async (t) => {
    // Fetching data from the API and testing the  status code
    const { statusCode } = await t.context.got.put(
        `nutritionist/${nutritionistID}/recipe/${recipeID}`, {
        json: mockRecipeData,
    });
    // Assertions
    t.is(statusCode, 200, 'Should return 200 ');
});

//Post Request
test('Post RecipeNutritionist Success and getting 200', async (t) => {
    
    const nutritionistID = generateTestnutritionistID();
    // Fetching data from the API and body structure testing the  status code
    const { body, statusCode } = await t.context.got.post(
        `nutritionist/${nutritionistID}/recipe/`, {
        json: mockRecipeData,
    });
    // Assertions
    t.is(statusCode, 200, 'Should return 200 ');
    // Check if all necessary attributes exist and are truthy
    t.like(body, {
        IngredientsName: [ 'IngredientsName', 'IngredientsName' ],
        difficulty: 'difficulty',
        servings: 'servings',
        recipeType: 'recipeType',
        Instructions: [ 'Instructions', 'Instructions' ],
        NutritionalTable: [ 'NutritionalTable', 'NutritionalTable' ],
        IngredientsQuantity: [ 'IngredientsQuantity', 'IngredientsQuantity' ],
        time: 6,
        recipeID: 0,
        imgRecipe: 'imgRecipe'
      }, 'Should return the correct response body');
    console.log(body);
});

//Post Request
test('Post RecipeNutritionist returns error 400 with bad parameters', async (t) => {
  // NutritionistID contains some invalid parameters
  const nutritionistID = "@";
  // Fetching data from the API and testing the  status code
  const { body, statusCode } = await t.context.got.post(
    `nutritionist/${nutritionistID}/recipe/`,
    {
      json: mockRecipeData,
    }
  );
    // Assertions
  t.is(statusCode, 400, "Should return 400 Bad Request for non-numeric userID");
});

//Post Request
test('Post RecipeNutritionist returns error 404 with non existed id', async (t) => {
  // NutritionistID contains is empty
  const nutritionistID = "";
   // Fetching data from the API and testing body sructure and the  status code
  const { body, statusCode } = await t.context.got.post(
    `nutritionist/${nutritionistID}/recipe/`,
    {
      json: mockRecipeData,
    }
  );

  t.is(statusCode, 404, "Should return 404 Not Found for non existed id");
});


//Put Request
test('PUT RecipeNutritionist returns error 400 with bad parameters', async (t) => {
    // Assuming mockRecipeData contains some invalid parameters
    const mockRecipeData = {
        IngredientsName: ["Chicken Breast", "Olive Oil", "Garlic", "Lemon Juice", "Paprika", "Salt", "Black Pepper", "Fresh Parsley"],
        difficulty: "Easy",
        servings: "invalid_number`", // Intentionally incorrect type for testing
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
    // Fetching data from the API and testing body sructure and the  status code
    const { body, statusCode } = await t.context.got.put(
        `nutritionist/${nutritionistID}/recipe/${recipeID}`, {
        json: mockRecipeData,
    });
    // Assertions
    //status Code should be 400
    t.is(statusCode, 400, 'Should return 400 Bad Request for non-numeric userID');
    //checking the body structure
    t.is(body.message, 'request.body.time should be integer');
    t.like(body.errors, [
        {
            path: '.body.time',
            message: 'should be integer',
            errorCode: 'type.openapi.validation'
        }
    ]);
});

//Delete Recipe
test('Test of the Delete Recipe with success', async (t) => {
    // Fetching data from the API and testing the  status code
    const { statusCode } = await t.context.got.delete(
        `nutritionist/${nutritionistID}/recipe/${recipeID}`
    );

    //status Code should be 200
    t.is(statusCode, 200, "Should return 200 when recipe is deleted");
});

test('Test of the Delete Recipe with 400 error code', async (t) => {
    const wrongRecipeId = '@';
    // Fetching data from the API and testing body sructure and the  status code
    const { body, statusCode } = await t.context.got.delete(
        `nutritionist/${nutritionistID}/recipe/${wrongRecipeId}`
    );
    //status Code should be 400
    t.is(statusCode, 400, "Should return 400 when there is a bad parameter");
    //checking the body structure
    t.like(body.errors, [
        {
          path: '.params.recipeID',
          message: 'should be integer',
          errorCode: 'type.openapi.validation'
        }
      ]);
});
//Delete Recipe
test('Test of the Delete Recipe with 405 error code', async (t) => {
    const nonExistingRecipeId = '';
    // Fetching data from the API and testing body sructure and the  status code
    const { statusCode, body } = await t.context.got.delete(
        `nutritionist/${nutritionistID}/recipe/${nonExistingRecipeId}`
    );
    //status Code should be 405
    t.is(statusCode, 405, "Should return 405 DELETE method not allowed");
    t.deepEqual(body.message, 'DELETE method not allowed'); 
});


//Closing the server after all tests are run
test.after.always((t) => {
    t.context.server.close();
});


// Helper functions
// Generate a random userID
function generateTestnutritionistID() {
    return Math.floor(Math.random() * 100000) + 1;
}

// Generate a random recipeID
function generateTestRecipeID() {
    return Math.floor(Math.random() * 1000000) + 1;
}
