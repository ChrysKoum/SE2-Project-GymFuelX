'use strict';


/**
 * Get the list of all the Recipies
 * <ΛΑ-1>   O χρήστης πρέπει να μπορεί να αναζητά συνταγές και προγράμματα γυμναστικής 
 *
 * userID Integer the user's ID
 * returns AllRecipe
 **/
exports.getAllRecipies = function(userID) {
  return new Promise(function(resolve, reject) {
    if (userID) {
      var examples = {};
      examples['application/json'] = [ {
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
    }, {
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
    } ];
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      reject();
    }
  });
}


/**
 * Get a specific recipe's details
 * <ΛΑ-3>   O χρήστης πρέπει να μπορεί να δει τις θρεπτικές λεπτομέρειες για κάθε συνταγή 
 *
 * userID Integer the user's ID
 * recipeID Integer The ID of the recipe
 * returns Recipe
 **/
exports.getRecipe = function(userID,recipeID) {
  return new Promise(function(resolve, reject) {
    if (userID && recipeID) {
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
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      reject();
    }
  });
}

