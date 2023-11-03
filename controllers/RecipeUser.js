'use strict';

var utils = require('../utils/writer.js');
var RecipeUser = require('../service/RecipeUserService');

module.exports.getAllRecipies = function getAllRecipies (req, res, next, userID) {
  RecipeUser.getAllRecipies(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRecipe = function getRecipe (req, res, next, userID, recipeID) {
  RecipeUser.getRecipe(userID, recipeID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
