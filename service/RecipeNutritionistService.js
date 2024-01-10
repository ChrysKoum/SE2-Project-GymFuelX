"use strict";

const serviceUtils = require("./serviceUtils");

/**
 * Add a new recipe
 * <ΛΑ-8>   Ο διατροφολόγος πρέπει να μπορεί να διαχειρίζεται τις συνταγές.
 *
 * body NutritionistID_recipe_body
 * nutritionistID Integer The nutritionist's ID
 * returns Recipe
 **/
exports.addRecipe = function (body, nutritionistID) {
  return new Promise(function (resolve, reject) {
    if (body && nutritionistID) {
      var examples = {};
      examples["application/json"] = serviceUtils.generateRecipeData();
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      reject();
    }
  });
};

/**
 * Delete recipe
 * <ΛΑ-9>   Ο διατροφολόγος πρέπει να μπορεί να βλέπει τις αναφορές που γίνονται από τους χρήστες στις συνταγές.
 *
 * nutritionistID Integer The nutritionist ID that delete the recipe
 * recipeID Integer The ID of the recipe that is being deleted.
 * no response value expected for this operation
 **/
exports.deleteRecipe = function (nutritionistID, recipeID) {
  if (nutritionistID && recipeID) {
    return new Promise(function (resolve) {
      resolve();
    });
  }
};

/**
 * Get recipe
 * <ΛΑ-8>   Ο διατροφολόγος πρέπει να μπορεί να διαχειρίζεται τις συνταγές.
 *
 * nutritionistID Integer The nutritionist ID that see the recipe.
 * recipeID Integer The ID of the recipe .
 * returns Recipe
 **/
exports.getRecipeNutrionist = function (nutritionistID, recipeID) {
  return new Promise(function (resolve, reject) {
    if (nutritionistID && recipeID) {
      var examples = {};
      examples["application/json"] = serviceUtils.generateRecipeData();
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      reject();
    }
  });
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
  return new Promise(function (resolve) {
    resolve();
  });
};
