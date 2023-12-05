
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

test('Test of the stracture that get gives', async (t) => {

    const { body, statusCode } = await t.context.got.get(
        `nutritionist/${nutritionistID}/recipe/${recipeID}`
    );

    //status Code should be 200
    t.is(statusCode, 200, "Should return 200 OK for valid userID");

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

    console.log('my prints');
    console.log(body);
    console.log(typeof body.recipeID);
})


test.after.always((t) => {
    t.context.server.close();
});

function generateTestnutritionistID() {
    return Math.floor(Math.random() * 100000) + 1;
}

function generateTestRecipeID() {
    return Math.floor(Math.random() * 1000000) + 1;
}
