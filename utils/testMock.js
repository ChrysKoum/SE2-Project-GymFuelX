/**
 * Generates mock data for a recipe.
 * This function is primarily used for testing purposes, providing a consistent and static set of recipe data.
 * It includes details such as ingredients, nutritional information, instructions, and other relevant attributes.
 * @param {boolean} invalidParameter - If true, the function will intentionally set the servings field to an invalid value for testing purposes.
 * @returns {object} The mock recipe data.
 */
const generateMockRecipeData = function (invalidParameter = false) {
  // Define the mock recipe data
  let recipeData = {
    IngredientsName: [
      // List of ingredients
      "Chicken Breast",
      "Olive Oil",
      "Garlic",
      "Lemon Juice",
      "Paprika",
      "Salt",
      "Black Pepper",
      "Fresh Parsley",
    ],
    difficulty: "Easy", // Difficulty level of the recipe
    servings: "5", // Number of servings, intentionally set as a string for testing purposes
    recipeType: "Main Course", // Type of the recipe
    Instructions: [
      // Cooking instructions
      "Preheat oven to 375°F (190°C).",
      "In a bowl, mix olive oil, minced garlic, lemon juice, paprika, salt, and black pepper.",
      "Place chicken breasts in a baking dish and pour the mixture over them.",
      "Bake in the preheated oven for 25-30 minutes or until chicken is cooked through.",
      "Garnish with chopped fresh parsley before serving.",
    ],
    NutritionalTable: [
      // Nutritional information
      "Calories: 165",
      "Protein: 26g",
      "Fat: 4.5g",
      "Carbohydrates: 3g",
      "Sodium: 322mg",
    ],
    IngredientsQuantity: [
      // Quantity of each ingredient
      "4 medium-sized chicken breasts",
      "2 tablespoons olive oil",
      "3 cloves garlic, minced",
      "2 tablespoons lemon juice",
      "1 teaspoon paprika",
      "1/2 teaspoon salt",
      "1/4 teaspoon black pepper",
      "2 tablespoons chopped fresh parsley",
    ],
    time: 5, // Time required to prepare the recipe, assuming this should be a number
    recipeID: 101, // Unique identifier for the recipe
    imgRecipe: "https://example.com/images/chicken-breast-recipe.jpg", // URL of the recipe image
  };
  // If invalidParameter is true, modify the servings field to an invalid value
  if (!invalidParameter) {
    recipeData.servings = "invalid_number`"; // Set servings to an invalid value
  } else {
    recipeData.servings = 5; // Set servings to a valid value
  }
  return recipeData; // Return the mock recipe data
};

// Export the function for use in other modules
module.exports = {
  generateMockRecipeData,
};
