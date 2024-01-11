'use strict';

var utils = require('../utils/writer.js');
/**
 * Controller for handling recipe nutritionist operations.
 * @module RecipeNutritionist
 */
var RecipeNutritionist = require('../service/RecipeNutritionistService');

module.exports.addRecipe = function addRecipe (req, res,  body, nutritionistID) {
  RecipeNutritionist.addRecipe(body, nutritionistID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteRecipe = function deleteRecipe (req, res,  nutritionistID, recipeID) {
  RecipeNutritionist.deleteRecipe(nutritionistID, recipeID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRecipeNutrionist = function getRecipeNutrionist (req, res, nutritionistID, recipeID) {
  RecipeNutritionist.getRecipeNutrionist(nutritionistID, recipeID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateRecipeNutritionist = function updateRecipeNutritionist (req, res,  body, nutritionistID, recipeID) {
  RecipeNutritionist.updateRecipeNutritionist(body, nutritionistID, recipeID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
