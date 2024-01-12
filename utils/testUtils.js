// Description: This file contains utility functions for testing.
// A async function that is testing for non numeric user IDs.
async function testForNonNumericUserID(
  t,
  requestFunction,
  expectedStatusCode,
  errorMessage
) {
  // Array of test cases with various non-numeric user IDs
  const nonNumericUserIDs = [
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
    t.is(
      body.message,
      "request.params.userID should be integer",
      "Response message should indicate an integer is required"
    ); // Check if the response message is as expected
    t.deepEqual(
      body.errors,
      [
        {
          path: ".params.userID",
          message: "should be integer",
          errorCode: "type.openapi.validation",
        },
      ],
      "Response errors should match the expected structure"
    ); // Validate the structure and content of response errors
  }
}

/**
 * Generates mock data for a recipe.
 * This function is primarily used for testing purposes, providing a consistent and static set of recipe data.
 * It includes details such as ingredients, nutritional information, instructions, and other relevant attributes.
 */
const generateMockRecipeData = function () {
  return {
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
}; 

module.exports = {
  testForNonNumericUserID,
  generateMockRecipeData,
};

