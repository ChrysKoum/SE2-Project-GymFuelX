const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');
const app = require('../index');

// Importing functions from RecipeUserService
const { getAllRecipies, getRecipe } = require("../service/RecipeUserService.js");

// Setting up the server before running tests
test.before(async (t) => {
    // Creating an HTTP server for the app
    t.context.server = http.createServer(app);
    // Listening to the server and setting the URL in the test context
    t.context.prefixUrl = await listen(t.context.server);
    // Extending 'got' for HTTP requests with predefined options
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: "json", throwHttpErrors: false });
});

//Closing the server after all tests are run
test.after.always((t) => {
    t.context.server.close();
});

// Function to validate the structure and values of a recipe object
function validateRecipe(t, recipe) {

    // Check if all necessary attributes exist and are truthy
    // Followed by type checks for each attribute
    // This ensures the recipe object is structured correctly and contains valid data
    t.truthy(recipe.recipeType);
    t.truthy(recipe.imgRecipe);
    t.truthy(recipe.Instructions);
    t.truthy(recipe.IngredientsName);
    t.truthy(recipe.NutritionalTable);
    t.truthy(recipe.IngredientsQuantity);
    t.truthy(recipe.time);
    t.truthy(recipe.difficulty);
    t.truthy(recipe.servings);

    // Validate the data types and structure

    //check if recipeType is a string
    t.is(
        typeof recipe.recipeType,
        "string",
        "recipeType should be a string"
    );
    //check if imgRecipe is a string
    t.is(
        typeof recipe.imgRecipe,
        "string",
        "imgRecipe should be a string"
    );
    //check if Instructions is an object
    t.is(
        typeof recipe.Instructions,
        'object',
        "Instructions should be an object"
    );
    //check if IngredientsName is an object
    t.is(
        typeof recipe.IngredientsName,
        'object',
        "IngredientsName should be an object"
    );
    //check if NutritionalTable is an object
    t.is(
        typeof recipe.NutritionalTable,
        'object',
        "NutritionalTable should be an object"
    );
    //check if IngredientsQuantity is an object
    t.is(
        typeof recipe.IngredientsQuantity,
        'object',
        "IngredientsQuantity should be an object"
    );
    //check if time is a number
    t.is(
        typeof recipe.time,
        "number",
        "time should be a number"
    );
    //check if difficulty is a string
    t.is(
        typeof recipe.difficulty,
        "string",
        "difficulty should be a string"
    );
    //check if servings is a string
    t.is(
        typeof recipe.servings,
        "string",
        "servings should be a string"
    );
}

// Test case to ensure getRecipe returns correct structure for valid user and recipe IDs
test("getRecipe returns the correct structure for a valid userID and recipeID", async (t) => {
    // Sample user and recipe IDs for testing
    const userID = 12;
    const recipeID = 15;
    // Test to fetch a recipe and validate its structure using validateRecipe function
    const recipe = await getRecipe(userID, recipeID);

    // Validate the structure and values of the recipe object
    validateRecipe(t, recipe);

});

// Test case for the API endpoint of getRecipe
test("getRecipe API endpoint returns a response with the correct structure and data types", async (t) => {
    // Setting a timeout for the test
    // Fetching data from the API and testing the response structure and status code
    t.timeout(5000);
    const userID = 12;
    const recipeID = 15;
    const { body, statusCode } = await t.context.got(
        `user/${userID}/recipe/${recipeID}`
    );

    // Assuming the API returns a 200 status code for valid requests
    t.is(statusCode, 200, "Should return 200 OK for valid userID and recipeIDs");
        
    //test response body
    const recipe=body;
    validateRecipe(t, recipe);
    
});

// Additional test cases for various scenarios, like testing with minimum and maximum valid IDs
// Also includes tests for invalid IDs, checking for correct response codes and error messages
// These cover edge cases and ensure robust error handling in the API


// Test for minimum valid userID
test('getRecipe with minimum valid user ID and recipeID returns correct response', async (t) => {
    // Fetching data from the API and testing the response structure and status code
    const { body, statusCode } = await t.context.got(`user/1/recipe/1`);
    // Assertions
    t.is(statusCode, 200, "Should return 200 OK for valid userID and recipeID");
});
//Test for maximum valid userID
test('getRecipe with maximum valid user ID and recipeID returns correct response', async (t) => {
    const { body, statusCode } = await t.context.got(`user/10000000/recipe/10000000`);
    // Assertions
    t.is(statusCode, 200, "Should return 200 OK for valid userID and recipeID");
});

//create cases of invalid userIDs and recipeIDs for error 400
const userIDfor400 = [1.2, 'abc', true, '@special', null, undefined, '!', '@', '^', '&', '*',];
const recipeIDfor400 = [1.2, 'abc', true, '@special', null, undefined, '!', '@', '^', '&', '*',];

//Test for invalid userID 
test('getRecipe with non-numeric user ID returns 400', async (t) => {

    // Looping through the invalid userIDs 
    for (const userID of userIDfor400) {
        const nonNumericUserID = userID;
        // Fetching data from the API 
        const { body, statusCode } = await t.context.got(`user/${nonNumericUserID}/recipe/23`);
        // Assertions
        // Check if the status code is 400
        t.is(statusCode, 400, 'Should return 400 Bad Request for non-numeric userID');
        t.assert(body.message);
        // Check if the error message is correct
        t.is(body.message, 'request.params.userID should be integer');
        // Check if the error structure is correct
        t.deepEqual(body.errors, [
            {
                path: '.params.userID',
                message: 'should be integer',
                errorCode: 'type.openapi.validation'
            }
        ]);
    }
});

//Test for invalid recipeID
test('getRecipe with valid user ID and non Numeric recipeID returns 400', async (t) => {
    // Looping through the invalid recipeIDs
    for (const recipeID of recipeIDfor400) {
        const nonNumericrecipeID = recipeID;
        // Fetching data from the API
        const { body, statusCode } = await await t.context.got(`user/23/recipe/${nonNumericrecipeID}`);
        // Assertions
        // Check if the status code is 400
        t.is(statusCode, 400, 'Should return 400 Bad Request for non-numeric  recipeID');
        t.assert(body.message);
        // Check if the error message is correct
        t.is(body.message, 'request.params.recipeID should be integer');
        // Check if the error structure is correct
        t.deepEqual(body.errors, [
            {
                path: '.params.recipeID',
                message: 'should be integer',
                errorCode: 'type.openapi.validation'
            }
        ]);
    }
});

//create cases of invalid userIDs for error 404
const userIDfor404 = ['', []]
// Test for non-existent userID (404 response)
test('getRecipe with empty user ID and valid recipeID returns 404', async (t) => {
    // Looping through the invalid userIDs
    for (const userID of userIDfor404) {
        const nonNumericUserID = userID;
        // Fetching data from the API
        const { body, statusCode } = await t.context.got(`user/${nonNumericUserID}/recipe/23`);

        // Assertions
        t.is(statusCode, 404, 'Should return 404 User not found.');
        t.assert(body.message);
        // Check if the error message is correct
        t.is(body.message, 'not found');
        // Check if the error structure is correct
        t.deepEqual(body.errors, [
            {
                path: '/user//recipe/23',
                message: 'not found',
            }
        ]);
    }
});

//create cases of invalid recipeIDs for error 404
const recipeIDfor404 = ['', []]
test('getRecipe with valid user ID and empty recipeID returns 404', async (t) => {
    // Looping through the invalid recipeIDs
    for (const recipeID of recipeIDfor404) {
        const nonNumericrecipeID = recipeID;
        // Fetching data from the API
        const { body, statusCode } = await t.context.got(`user/44/recipe/${nonNumericrecipeID}/`);

        // Assertions
        t.is(statusCode, 404, 'Should return 404 recipe not found.');
        t.assert(body.message);
        // Check if the error message is correct
        t.is(body.message, 'not found');
        // Check if the error structure is correct
        t.deepEqual(body.errors, [
            {
                path: '/user/44/recipe//',
                message: 'not found',
            }
        ]);
    }
});
// Test for validating response headers
test('getRecipe returns expected headers', async (t) => {
    const userID = 12;
    const recipeID = 15;
    // Fetching data from the API
    const { headers, statusCode } = await t.context.got(`user/${userID}/recipe/${recipeID}`);
    // Assertions
    // Check if the status code is 200
    t.is(statusCode, 200, "Should return 200 OK for valid userID and recipeID");
    t.truthy(headers['content-type'], 'Response should have content-type header');
});

// Test for getAllRecipies function
test("getAllRecipies returns the correct structure for a valid userID", async (t) => {
    const userID = 12;
    // Test to fetch all recipes for a user and validate their structure using validateRecipe function
    const recipies = await getAllRecipies(userID);
    //Iterate through all the recipes
    for (const recipe of recipies) {
        validateRecipe(t, recipe);
    }
});

// Test for the API endpoint of getAllRecipies
test("getAllRecipies API endpoint returns a response with the correct structure and data types", async (t) => {
    // Setting a timeout for the test
    t.timeout(5000);
    // Fetching data from the API and testing the response structure and status code
    const userID = 12;
    const { body, statusCode } = await t.context.got(
        `user/${userID}/recipe`
    );

    // Assuming the API returns a 200 status code for valid requests
    t.is(statusCode, 200, "Should return 200 OK for valid userID");

    //test response body
    for (const recipe of body) {
        validateRecipe(t, recipe);
    }
});

//Test for invalid userID
test('getAllRecipies with non-numeric user ID returns 400', async (t) => {
    for (const userID of userIDfor400) {
        const nonNumericUserID = userID;
        // Fetching data from the API
        const { body, statusCode } = await t.context.got(`user/${nonNumericUserID}/recipe`);
        // Assertions
        t.is(statusCode, 400, 'Should return 400 Bad Request for non-numeric userID');
        t.assert(body.message);
        // Check if the error message is correct
        t.is(body.message, 'request.params.userID should be integer');
        // Check if the error structure is correct
        t.deepEqual(body.errors, [
            {
                path: '.params.userID',
                message: 'should be integer',
                errorCode: 'type.openapi.validation'
            }
        ]);
    }
});


//Test for non-existent userID 404 response)
test('getAllRecipies with empty userID returns 404', async (t) => {
    for (const userID of userIDfor404) {
        const nonNumericUserID = userID;

        const { body, statusCode } = await t.context.got(`user/${nonNumericUserID}/recipe`);

        // Assertions
        t.is(statusCode, 404, 'Should return 404 User not found.');
        t.assert(body.message);
        // Check if the error message is correct
        t.is(body.message, 'not found');
        // Check if the error structure is correct
        t.deepEqual(body.errors, [
            {
                path: '/user//recipe',
                message: 'not found',
            }
        ]);
    }
});

//Test for validating response headers
test('getAllRecipies returns expected headers', async (t) => {
    const userID = 12;
    const { headers, statusCode } = await t.context.got(`user/${userID}/recipe`);

    t.is(statusCode, 200, "Should return 200 OK for valid userID");
    t.truthy(headers['content-type'], 'Response should have content-type header');
});