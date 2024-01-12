// Description: This file contains utility functions for testing.
// A async function that is testing for non numeric user IDs.
async function testForNonNumericUserID(
  ParamsTesting,
  t,
  requestFunction,
  expectedStatusCode,
  errorMessage,
  path
) {
  // Array of test cases with various non-numeric user IDs
  let nonNumericUserIDs = [
    1.2, // Decimal number
    "abc", // String
    true, // Boolean
    "@special", // Special characters
    null, // Null value
    undefined, // Undefined value
    "!",
    "@",
    "^",
    "&",
    "*", // Various special characters
  ];
  if(expectedStatusCode == 404){
    nonNumericUserIDs = ["", []];
  }

  // Loop through each test case
  for (const userID of nonNumericUserIDs) {
    const nonNumericUserID = userID;
    // Make a request with the non-numeric user ID
    const { body, statusCode } = await requestFunction(nonNumericUserID);

    // Assertions
    t.is(
      statusCode,
      expectedStatusCode,
      `Should return ${expectedStatusCode} ${errorMessage} for non-numeric userID`
    ); // Check if the status code matches the expected value
    t.assert(body.message, "Response should have a message"); // Ensure there's a response message
    if (ParamsTesting.length == 1) {
      if (expectedStatusCode == 404) {
        t.is(
          body.message,
          "not found",
          "Response message should indicate not found"
        ); // Check if the response message is as expected

        t.deepEqual(
          body.errors,
          [
            {
              path: `/${path[0]}/${nonNumericUserID}/${path[1]}`,
              message: "not found",
            },
          ],
          "Response errors should match the expected structure"
        ); // Validate the structure and content of response errors
      }
      else {
        t.is(
          body.message,
          `request.params.${ParamsTesting[0]} should be integer`,
          "Response message should indicate an integer is required"
        ); // Check if the response message is as expected

        t.deepEqual(
          body.errors,
          [
            {
              path: `.params.${ParamsTesting[0]}`,
              message: "should be integer",
              errorCode: "type.openapi.validation",
            },
          ],
          "Response errors should match the expected structure"
        ); // Validate the structure and content of response errors
      }
    } else {
      if (expectedStatusCode == 404) {
        t.is(
          body.message,
          "not found",
          "Response message should indicate not found"
        ); // Check if the response message is as expected

        t.deepEqual(
          body.errors,
          [
            {
              path: `/${path[0]}/${nonNumericUserID}/${path[1]}/${nonNumericUserID}`,
              message: "not found",
            },
          ],
          "Response errors should match the expected structure"
        ); // Validate the structure and content of response errors
      }
      else{
        t.is(
          body.message,
          `request.params.${ParamsTesting[0]} should be integer, request.params.${ParamsTesting[1]} should be integer`,
          `Response message should indicate an integer is required for ${ParamsTesting[0]} and ${ParamsTesting[1]}`
        ); // Check if the response message is as expected

        t.deepEqual(
          body.errors,
          [
            {
              path: `.params.${ParamsTesting[0]}`,
              message: "should be integer",
              errorCode: "type.openapi.validation",
            },
            {
              path: `.params.${ParamsTesting[1]}`,
              message: "should be integer",
              errorCode: "type.openapi.validation",
            },
          ],
          "Response errors should match the expected structure"
        ); // Validate the structure and content of response errors
      }
    }
    
  }
}

// Helper function to generate a random test ID
function generateTestID() {
  return Math.floor(Math.random() * 100000) + 1;
}

/**
 * Generates mock data for a recipe.
 * This function is primarily used for testing purposes, providing a consistent and static set of recipe data.
 * It includes details such as ingredients, nutritional information, instructions, and other relevant attributes.
 */
const generateMockRecipeData = function (invalidParameter = false) {
  let recipeData
  // If invalidParameter is true, modify the servings field to an invalid value
  if (invalidParameter) {
     recipeData = {
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
      servings: "invalid_number`", // Intentionally incorrect type for testing
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
      time: "5", // Assuming this should be a number
      recipeID: 101,
      imgRecipe: "https://example.com/images/chicken-breast-recipe.jpg",
    };
  }else{
    recipeData = {
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
    servings: "4", // Default servings value
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
  }

  return recipeData;
};


module.exports = {
  testForNonNumericUserID,
  generateMockRecipeData,
  generateTestID,
};

