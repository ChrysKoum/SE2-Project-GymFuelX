'use strict';


/**
 * Add a new recipe
 * <ΛΑ-8>   Ο διατροφολόγος πρέπει να μπορεί να διαχειρίζεται τις συνταγές. 
 *
 * body NutritionistID_recipe_body 
 * nutritionistID Integer The nutritionist's ID
 * returns Recipe
 **/
exports.addRecipe = function () {
  return recipeUtils.getRecipeExampleResponse(true);
};



/**
 * Delete recipe
 * <ΛΑ-9>   Ο διατροφολόγος πρέπει να μπορεί να βλέπει τις αναφορές που γίνονται από τους χρήστες στις συνταγές. 
 *
 * nutritionistID Integer The nutritionist ID that delete the recipe
 * recipeID Integer The ID of the recipe that is being deleted.
 * no response value expected for this operation
 **/
exports.deleteRecipe = function () {
  return recipeUtils.resolveNoValue();
};


/**
 * Get recipe
 * <ΛΑ-8>   Ο διατροφολόγος πρέπει να μπορεί να διαχειρίζεται τις συνταγές. 
 *
 * nutritionistID Integer The nutritionist ID that see the recipe.
 * recipeID Integer The ID of the recipe .
 * returns Recipe
 **/
exports.getRecipeNutrionist = function () {
  return recipeUtils.getRecipeExampleResponse(true);
};


/**
 * Update/Correct recipe
 * <ΛΑ-8>   Ο διατροφολόγος πρέπει να μπορεί να διαχειρίζεται τις συνταγές. 
 *
 * body Recipe_recipeID_body_1 
 * nutritionistID Integer The nutritionist ID that update the recipe report
 * recipeID Integer The ID of the recipe that is being updated.
 * no response value expected for this operation
 **/
exports.updateRecipeNutritionist = function () {
  return recipeUtils.resolveNoValue();
};

