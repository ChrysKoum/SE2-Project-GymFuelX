'use strict';

var utils = require('../utils/writer.js');
var ReportNutritionist = require('../service/ReportNutritionistService');

module.exports.deleteRecipeReport = function deleteRecipeReport (req, res, next, nutritionistID, reportID) {
  ReportNutritionist.deleteRecipeReport(nutritionistID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRecipeReport = function getRecipeReport (req, res, next, nutritionistID, reportID) {
  ReportNutritionist.getRecipeReport(nutritionistID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRecipeReports = function getRecipeReports (req, res, next, nutritionistID) {
  ReportNutritionist.getRecipeReports(nutritionistID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateRecipeReport = function updateRecipeReport (req, res, next, body, nutritionistID, reportID) {
  ReportNutritionist.updateRecipeReport(body, nutritionistID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
