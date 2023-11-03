'use strict';


/**
 * Add a new recipe
 * <ΛΑ-8>   Ο διατροφολόγος πρέπει να μπορεί να διαχειρίζεται τις συνταγές. 
 *
 * body NutritionistID_recipe_body 
 * nutritionistID Integer The nutritionist's ID
 * returns Recipe
 **/
exports.addRecipe = function(body,nutritionistID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "IngredientsName" : [ "IngredientsName", "IngredientsName" ],
  "difficulty" : "difficulty",
  "servings" : "servings",
  "recipeType" : "recipeType",
  "Instructions" : [ "Instructions", "Instructions" ],
  "NutritionalTable" : [ "NutritionalTable", "NutritionalTable" ],
  "IngredientsQuantity" : [ "IngredientsQuantity", "IngredientsQuantity" ],
  "time" : 6,
  "recipeID" : 0,
  "imgRecipe" : "imgRecipe"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete recipe
 * <ΛΑ-9>   Ο διατροφολόγος πρέπει να μπορεί να βλέπει τις αναφορές που γίνονται από τους χρήστες στις συνταγές. 
 *
 * nutritionistID Integer The nutritionist ID that delete the recipe
 * recipeID Integer The ID of the recipe that is being deleted.
 * no response value expected for this operation
 **/
exports.deleteRecipe = function(nutritionistID,recipeID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get recipe
 * <ΛΑ-8>   Ο διατροφολόγος πρέπει να μπορεί να διαχειρίζεται τις συνταγές. 
 *
 * nutritionistID Integer The nutritionist ID that see the recipe.
 * recipeID Integer The ID of the recipe .
 * returns Recipe
 **/
exports.getRecipeNutrionist = function(nutritionistID,recipeID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "IngredientsName" : [ "IngredientsName", "IngredientsName" ],
  "difficulty" : "difficulty",
  "servings" : "servings",
  "recipeType" : "recipeType",
  "Instructions" : [ "Instructions", "Instructions" ],
  "NutritionalTable" : [ "NutritionalTable", "NutritionalTable" ],
  "IngredientsQuantity" : [ "IngredientsQuantity", "IngredientsQuantity" ],
  "time" : 6,
  "recipeID" : 0,
  "imgRecipe" : "imgRecipe"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update/Correct recipe
 * <ΛΑ-8>   Ο διατροφολόγος πρέπει να μπορεί να διαχειρίζεται τις συνταγές. 
 *
 * body Recipe_recipeID_body 
 * nutritionistID Integer The nutritionist ID that update the recipe report
 * recipeID Integer The ID of the recipe that is being updated.
 * no response value expected for this operation
 **/
exports.updateRecipeNutritionist = function(body,nutritionistID,recipeID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

