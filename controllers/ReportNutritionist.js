'use strict';

var utils = require('../utils/writer.js');
var ReportNutritionist = require('../service/ReportNutritionistService');

// Function to delete a recipe report
module.exports.deleteRecipeReport = function deleteRecipeReport (req, res, next, nutritionistID, reportID) {
  ReportNutritionist.deleteRecipeReport(nutritionistID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Function to get a recipe report
module.exports.getRecipeReport = function getRecipeReport (req, res, next, nutritionistID, reportID) {
  ReportNutritionist.getRecipeReport(nutritionistID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Function to get all recipe reports
module.exports.getRecipeReports = function getRecipeReports (req, res, next, nutritionistID) {
  ReportNutritionist.getRecipeReports(nutritionistID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Function to update a recipe report
module.exports.updateRecipeReport = function updateRecipeReport (req, res, next, body, nutritionistID, reportID) {
  ReportNutritionist.updateRecipeReport(body, nutritionistID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
