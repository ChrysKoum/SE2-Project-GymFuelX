// This file contains functions to generate dummy data for different entities

// Function to generate dummy data for a report
// Returns an array of objects with report-related attributes
exports.generateReportData = function () {
  return [
    {
      ByUser: 6, // Indicates the user by whom the report is generated
      ID: 0, // The ID of the report
      "isGym-Diet": true, // Boolean indicating whether the report is related to gym/diet
    },
    {
      ByUser: 6, // Similar structure for another report object
      ID: 0,
      "isGym-Diet": true,
    },
  ];
};

// Function to generate dummy data for a user
// Returns an object with user-related attributes
exports.generateUserData = function () {
  return {
    birthday: "2000-01-23T04:56:07.000+00:00", // User's birthday
    meal: "meal", // User's meal preference
    allergies: "allergies", // User's allergies
    goal: "goal", // User's fitness goal
    gender: "gender", // User's gender
    level: "level", // User's fitness level
    weight: 1.4658129805029452, // User's weight
    restrictions: "restrictions", // Dietary restrictions of the user
    userID: 0, // User's ID
    username: "username", // User's username
    height: 6.027456183070403, // User's height
  };
};

// Function to generate dummy data for a recipe
// Returns an object with recipe-related attributes
exports.generateRecipeData = function () {
  return {
    IngredientsName: ["IngredientsName", "IngredientsName"], // Array of ingredient names
    difficulty: "difficulty", // Difficulty level of the recipe
    servings: "servings", // Servings information
    recipeType: "recipeType", // Type of recipe
    Instructions: ["Instructions", "Instructions"], // Cooking instructions
    NutritionalTable: ["NutritionalTable", "NutritionalTable"], // Nutritional information
    IngredientsQuantity: ["IngredientsQuantity", "IngredientsQuantity"], // Quantities of ingredients
    time: 6, // Time required to prepare the recipe
    recipeID: 0, // Recipe ID
    imgRecipe: "imgRecipe", // Image URL or reference for the recipe
  };
};
