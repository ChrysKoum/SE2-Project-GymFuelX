const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');
const app = require('../index');
const utils = require('../utils/writer.js');



const { getAllRecipies, getRecipe } = require("../service/RecipeUserService.js");


test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: "json", throwHttpErrors: false });
  });
  
  test.after.always((t) => {
    t.context.server.close();
  });
  

  test("getRecipe returns the correct structure for a valid userID and recipeID", async (t) => {
    const userID = 12;
    const recipeID = 15;
    const recipe= await getRecipe(userID, recipeID);

    t.truthy(recipe.recipeType);
    t.truthy(recipe.imgRecipe);
    t.truthy(recipe.Instructions);
    t.truthy(recipe.IngredientsName);
    t.truthy(recipe.NutritionalTable);
    t.truthy(recipe.IngredientsQuantity);
    t.truthy(recipe.time);
    t.truthy(recipe.difficulty);
    t.truthy(recipe.servings);

    // Validate the response structure and data types
    t.is(
        typeof recipe.recipeType,
        "string",
        "recipeType should be a string"
      );
      t.is(
        typeof recipe.imgRecipe,
        "string",
        "imgRecipe should be a string"
      );
      t.is(
          typeof recipe.Instructions,
          'object',
          "Instructions should be a object"
      );
      t.is(
          typeof recipe.IngredientsName,
          'object',
          "IngredientsName should be a object"
      );
      t.is(
          typeof recipe.NutritionalTable,
          'object',
          "NutritionalTable should be a object"
      );
      t.is(
          typeof recipe.NutritionalTable,
          'object',
          "NutritionalTable should be a object"
      );
      t.is(
          typeof recipe.IngredientsQuantity,
          'object',
          "IngredientsQuantity should be a object"
      );
      t.is(
          typeof recipe.time,
          "number",
          "time should be a number"
      );
      t.is(
          typeof recipe.difficulty,
          "string",
          "difficulty should be a string"
      );
      t.is(
          typeof recipe.servings,
          "string",
          "servings should be a string"
      );
    
  });
  
 

  test("getRecipe API endpoint returns a response with the correct structure and data types", async (t) => {
    t.timeout(5000);
    const userID = 12;
    const recipeID = 15;
    const { body, statusCode } = await t.context.got(
      `user/${userID}/recipe/${recipeID}`
    );
  
    // Assuming the API returns a 200 status code for valid requests
    t.is(statusCode, 200, "Should return 200 OK for valid userID and recipeIDs");
  
    //test response body
    t.truthy(body.recipeType);
    t.truthy(body.imgRecipe);
    t.truthy(body.Instructions);
    t.truthy(body.IngredientsName);
    t.truthy(body.NutritionalTable);
    t.truthy(body.IngredientsQuantity);
    t.truthy(body.time);
    t.truthy(body.difficulty);
    t.truthy(body.servings);

    // Validate the response structure and data types
    t.is(
      typeof body.recipeType,
      "string",
      "recipeType should be a string"
    );
    t.is(
      typeof body.imgRecipe,
      "string",
      "imgRecipe should be a string"
    );
    t.is(
        typeof body.Instructions,
        'object',
        "Instructions should be a object"
    );
    t.is(
        typeof body.IngredientsName,
        'object',
        "IngredientsName should be a object"
    );
    t.is(
        typeof body.NutritionalTable,
        'object',
        "NutritionalTable should be a object"
    );
    t.is(
        typeof body.NutritionalTable,
        'object',
        "NutritionalTable should be a object"
    );
    t.is(
        typeof body.IngredientsQuantity,
        'object',
        "IngredientsQuantity should be a object"
    );
    t.is(
        typeof body.time,
        "number",
        "time should be a number"
    );
    t.is(
        typeof body.difficulty,
        "string",
        "difficulty should be a string"
    );
    t.is(
        typeof body.servings,
        "string",
        "servings should be a string"
    );
    
  });


test('getRecipe with minimum valid user ID and recipeID returns correct response', async (t) => {
    const userID = 12;
    const recipeID = 15;
    const { body, statusCode } = await t.context.got(`user/1/recipe/1`);
    t.is(statusCode, 200, "Should return 200 OK for valid userID and recipeID");
});
test('getRecipe with maximum valid user ID and recipeID returns correct response', async (t) => {
    const { body, statusCode } = await t.context.got(`user/100000/recipe/100000`);
    t.is(statusCode, 200, "Should return 200 OK for valid userID and recipeID");
});

const userIDfor400 = [1.2, 'abc', true, '@special', null, undefined, '!', '@', '^', '&', '*',];
const recipeIDfor400 = [1.2, 'abc', true, '@special', null, undefined, '!', '@', '^', '&', '*',];

test('getRecipe with non-numeric user ID returns 400', async (t) => {
    for (const userID of userIDfor400) {
        const nonNumericUserID = userID;
        const { body, statusCode } = await t.context.got(`user/${nonNumericUserID}/recipe/23`);
        // Assertions
        t.is(statusCode, 400, 'Should return 400 Bad Request for non-numeric userID');
        t.assert(body.message);
        t.is(body.message, 'request.params.userID should be integer');
        t.deepEqual(body.errors, [
            {
                path: '.params.userID',
                message: 'should be integer',
                errorCode: 'type.openapi.validation'
            }
        ]);
    }
});


test('getRecipe with valid user ID and non Numeric recipeID returns 400', async (t) => {
    for (const recipeID of recipeIDfor400) {
        const nonNumericrecipeID = recipeID;
        const { body, statusCode } = await await t.context.got(`user/23/recipe/${nonNumericrecipeID}`);
        // Assertions
        t.is(statusCode, 400, 'Should return 400 Bad Request for non-numeric  recipeID');
        t.assert(body.message);
        t.is(body.message, 'request.params.recipeID should be integer');
        t.deepEqual(body.errors, [
            {
                path: '.params.recipeID',
                message: 'should be integer',
                errorCode: 'type.openapi.validation'
            }
        ]);
    }
});

const userIDfor404 = ['', []]
test('getRecipe with non-numeric user ID and valid recipeID returns 404', async (t) => {
    for (const userID of userIDfor404) {
        const nonNumericUserID = userID;

        const { body, statusCode } = await t.context.got(`user/${nonNumericUserID}/recipe/23`);

        // Assertions
        t.is(statusCode, 404, 'Should return 404 User not found.');
        t.assert(body.message);
        t.is(body.message, 'not found');
        t.deepEqual(body.errors, [
            {
                path: '/user//recipe/23',
                message: 'not found',
            }
        ]);
    }
});

const recipeIDfor404 = ['', []]
test('getRecipe with valid user ID and non-numeric recipeID returns 404', async (t) => {
    for (const recipeID of recipeIDfor404) {
        const nonNumericrecipeID = recipeID;

        const { body, statusCode } = await t.context.got(`user/44/recipe/${nonNumericrecipeID}/`);

        // Assertions
        t.is(statusCode, 404, 'Should return 404 recipe not found.');
        t.assert(body.message);
        t.is(body.message, 'not found');
        t.deepEqual(body.errors, [
            {
                path: '/user/44/recipe//',
                message: 'not found',
            }
        ]);
    }
});

test('getRecipe returns expected headers', async (t) => {
    const userID = 12;
    const recipeID = 15;
    const { headers, statusCode } = await t.context.got(`user/${userID}/recipe/${recipeID}`);

    t.is(statusCode, 200, "Should return 200 OK for valid userID and recipeID");
    t.truthy(headers['content-type'], 'Response should have content-type header');
});


///////test for getAllRecipies function


test("getAllRecipies returns the correct structure for a valid userID", async (t) => {
    const userID = 12;
    const recipies= await getAllRecipies(userID);
    for (const recipe of recipies) {
        t.truthy(recipe.recipeType);
        t.truthy(recipe.imgRecipe);
        t.truthy(recipe.Instructions);
        t.truthy(recipe.IngredientsName);
        t.truthy(recipe.NutritionalTable);
        t.truthy(recipe.IngredientsQuantity);
        t.truthy(recipe.time);
        t.truthy(recipe.difficulty);
        t.truthy(recipe.servings);

        // Validate the response structure and data types
        t.is(
            typeof recipe.recipeType,
            "string",
            "recipeType should be a string"
        );
        t.is(
            typeof recipe.imgRecipe,
            "string",
            "imgRecipe should be a string"
        );
        t.is(
            typeof recipe.Instructions,
            'object',
            "Instructions should be a object"
        );
        t.is(
            typeof recipe.IngredientsName,
            'object',
            "IngredientsName should be a object"
        );
        t.is(
            typeof recipe.NutritionalTable,
            'object',
            "NutritionalTable should be a object"
        );
        t.is(
            typeof recipe.NutritionalTable,
            'object',
            "NutritionalTable should be a object"
        );
        t.is(
            typeof recipe.IngredientsQuantity,
            'object',
            "IngredientsQuantity should be a object"
        );
        t.is(
            typeof recipe.time,
            "number",
            "time should be a number"
        );
        t.is(
            typeof recipe.difficulty,
            "string",
            "difficulty should be a string"
        );
        t.is(
            typeof recipe.servings,
            "string",
            "servings should be a string"
        );
    }

});


test("getAllRecipies API endpoint returns a response with the correct structure and data types", async (t) => {
    t.timeout(5000);
    const userID = 12;
    const { body, statusCode } = await t.context.got(
        `user/${userID}/recipe`
    );

    // Assuming the API returns a 200 status code for valid requests
    t.is(statusCode, 200, "Should return 200 OK for valid userID");

    //test response body
    for (const recipe of body) {
        t.truthy(recipe.recipeType);
        t.truthy(recipe.imgRecipe);
        t.truthy(recipe.Instructions);
        t.truthy(recipe.IngredientsName);
        t.truthy(recipe.NutritionalTable);
        t.truthy(recipe.IngredientsQuantity);
        t.truthy(recipe.time);
        t.truthy(recipe.difficulty);
        t.truthy(recipe.servings);

        // Validate the response structure and data types
        t.is(
            typeof recipe.recipeType,
            "string",
            "recipeType should be a string"
        );
        t.is(
            typeof recipe.imgRecipe,
            "string",
            "imgRecipe should be a string"
        );
        t.is(
            typeof recipe.Instructions,
            'object',
            "Instructions should be a object"
        );
        t.is(
            typeof recipe.IngredientsName,
            'object',
            "IngredientsName should be a object"
        );
        t.is(
            typeof recipe.NutritionalTable,
            'object',
            "NutritionalTable should be a object"
        );
        t.is(
            typeof recipe.NutritionalTable,
            'object',
            "NutritionalTable should be a object"
        );
        t.is(
            typeof recipe.IngredientsQuantity,
            'object',
            "IngredientsQuantity should be a object"
        );
        t.is(
            typeof recipe.time,
            "number",
            "time should be a number"
        );
        t.is(
            typeof recipe.difficulty,
            "string",
            "difficulty should be a string"
        );
        t.is(
            typeof recipe.servings,
            "string",
            "servings should be a string"
        );
    }
});



test('getAllRecipies with non-numeric user ID returns 400', async (t) => {
    for (const userID of userIDfor400) {
        const nonNumericUserID = userID;
        const { body, statusCode } = await t.context.got(`user/${nonNumericUserID}/recipe`);
        // Assertions
        t.is(statusCode, 400, 'Should return 400 Bad Request for non-numeric userID');
        t.assert(body.message);
        t.is(body.message, 'request.params.userID should be integer');
        t.deepEqual(body.errors, [
            {
                path: '.params.userID',
                message: 'should be integer',
                errorCode: 'type.openapi.validation'
            }
        ]);
    }
});

test('getAllRecipies with non-numeric user ID returns 404', async (t) => {
    for (const userID of userIDfor404) {
        const nonNumericUserID = userID;

        const { body, statusCode } = await t.context.got(`user/${nonNumericUserID}/recipe`);

        // Assertions
        t.is(statusCode, 404, 'Should return 404 User not found.');
        t.assert(body.message);
        t.is(body.message, 'not found');
        t.deepEqual(body.errors, [
            {
                path: '/user//recipe',
                message: 'not found',
            }
        ]);
    }
});

test('getAllRecipies returns expected headers', async (t) => {
    const userID = 12;
    const { headers, statusCode } = await t.context.got(`user/${userID}/recipe`);

    t.is(statusCode, 200, "Should return 200 OK for valid userID");
    t.truthy(headers['content-type'], 'Response should have content-type header');
});

