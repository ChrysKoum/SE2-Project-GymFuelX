'use strict';

var utils = require('../utils/writer.js');
var ReportUser = require('../service/ReportUserService');

module.exports.createDietReport = function createDietReport (req, res, next, userID, recipeID) {
  ReportUser.createDietReport(userID, recipeID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createGymReport = function createGymReport (req, res, next, userID) {
  ReportUser.createGymReport(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
