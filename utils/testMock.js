/**
 * Provides a template for mock recipe data structure.
 * @returns {object} Base structure of mock recipe data.
 */
const getBaseRecipeData = () => ({
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
  servings: 5,
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
  time: 30, // Assumed average cooking time
  recipeID: 101,
  imgRecipe: "https://example.com/images/chicken-breast-recipe.jpg",
});

/**
 * Generates mock data for a recipe, with the option to include invalid data for testing purposes.
 * @param {boolean} includeInvalidData - If true, sets the 'servings' attribute to an invalid string.
 * @returns {object} The mock recipe data with potential modifications based on the includeInvalidData flag.
 */
const generateMockRecipeData = (includeInvalidData = false) => {
  const recipeData = getBaseRecipeData();

  // Adjust the servings attribute based on the includeInvalidData flag
  recipeData.servings = includeInvalidData
    ? "invalid_number`"
    : recipeData.servings;

  return recipeData;
};

module.exports = {
  generateMockRecipeData,
};
