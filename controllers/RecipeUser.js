"use strict";

// Importing utility functions and service module
var utils = require("../utils/writer.js");
var RecipeUser = require("../service/RecipeUserService");

/**
 * Function to retrieve all recipes associated with a given user.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the stack.
 * @param {Number} userID - The unique identifier of the user.
 */
module.exports.getAllRecipies = function getAllRecipies(
  req,
  res,
  next,
  userID
) {
  // Calling the service to get all recipes for the user
  RecipeUser.getAllRecipies(userID)
    .then(function (response) {
      // Sending the response back to the client in JSON format
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Handling any errors and sending the error response
      utils.writeJson(res, response);
    });
};

/**
 * Function to retrieve a specific recipe for a given user.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the stack.
 * @param {Number} userID - The unique identifier of the user.
 * @param {Number} recipeID - The unique identifier of the recipe.
 */
module.exports.getRecipe = function getRecipe(
  req,
  res,
  next,
  userID,
  recipeID
) {
  // Calling the service to get a specific recipe for the user
  RecipeUser.getRecipe(userID, recipeID)
    .then(function (response) {
      // Sending the response back to the client in JSON format
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Handling any errors and sending the error response
      utils.writeJson(res, response);
    });
};
