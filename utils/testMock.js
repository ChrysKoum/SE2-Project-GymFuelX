/**
 * Generates mock data for a recipe.
 * This function is primarily used for testing purposes, providing a consistent and static set of recipe data.
 * It includes details such as ingredients, nutritional information, instructions, and other relevant attributes.
 */
const generateMockRecipeData = function (invalidParameter = false) {
  let recipeData;
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
  } else {
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
  generateMockRecipeData
};
