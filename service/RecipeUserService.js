'use strict';
const serviceUtils = require("./serviceUtils");


/**
 * Get the list of all the Recipies
 * <ΛΑ-1>   O χρήστης πρέπει να μπορεί να αναζητά συνταγές και προγράμματα γυμναστικής 
 *
 * userID Integer the user's ID
 * returns AllRecipe
 **/
exports.getAllRecipies = function (userID) {
  return serviceUtils.getRecipeExampleResponse();
};


/**
 * Get a specific recipe's details
 * <ΛΑ-3>   O χρήστης πρέπει να μπορεί να δει τις θρεπτικές λεπτομέρειες για κάθε συνταγή 
 *
 * userID Integer the user's ID
 * recipeID Integer The ID of the recipe
 * returns Recipe
 **/
exports.getRecipe = function (userID, recipeID) {
  return serviceUtils.getRecipeExampleResponse(true);
};

