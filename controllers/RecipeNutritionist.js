'use strict';

var utils = require('../utils/writer.js');
/**
 * Controller for handling recipe nutritionist operations.
 * @module RecipeNutritionist
 */
var RecipeNutritionist = require('../service/RecipeNutritionistService');

module.exports.addRecipe = function addRecipe(req, res, next, ...args) {
  // Assuming args[0] is 'body' and args[1] is 'nutritionistID'
  const [body, nutritionistID] = args;

  RecipeNutritionist.addRecipe(body, nutritionistID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.deleteRecipe = function deleteRecipe(req, res, next, ...args) {
  // Assuming args[0] is 'nutritionistID' and args[1] is 'recipeID'
  const [nutritionistID, recipeID] = args;

  RecipeNutritionist.deleteRecipe(nutritionistID, recipeID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRecipeNutrionist = function getRecipeNutrionist (req, res, next, ...args) {
  // Assuming args[0] is 'nutritionistID' and args[1] is 'recipeID'
  const [nutritionistID, recipeID] = args;
  RecipeNutritionist.getRecipeNutrionist(nutritionistID, recipeID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateRecipeNutritionist = function updateRecipeNutritionist(
  req,
  res,
  next,
  ...args
) {
  // Assuming args[0] is 'body', args[1] is 'nutritionistID', and args[2] is 'recipeID'
  const [body, nutritionistID, recipeID] = args;
  RecipeNutritionist.updateRecipeNutritionist(body, nutritionistID, recipeID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
