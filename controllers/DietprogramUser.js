"use strict";

var utils = require("../utils/writer.js");
/**
 * Controller for handling diet program user operations.
 * @module DietprogramUser
 */
var DietprogramUser = require("../service/DietprogramUserService");

module.exports.getDietProgram = function getDietProgram(
  req,
  res,
  next,
  ...args
) {
  // Assuming args[0] is 'userID'
  const [userID] = args;
  DietprogramUser.getDietProgram(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
