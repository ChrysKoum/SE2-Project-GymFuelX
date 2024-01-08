'use strict';

var utils = require('../utils/writer.js');
var RecipeUser = require('../service/RecipeUserService');

// Function to get all recipes for a user
module.exports.getAllRecipies = function getAllRecipies (req, res, next, userID) {
  RecipeUser.getAllRecipies(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Function to get a specific recipe for a user
module.exports.getRecipe = function getRecipe (req, res, next, userID, recipeID) {
  RecipeUser.getRecipe(userID, recipeID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
