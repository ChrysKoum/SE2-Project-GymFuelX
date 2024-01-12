'use strict';

var utils = require('../utils/writer.js');
var ReportNutritionist = require('../service/ReportNutritionistService');

// Function to delete a recipe report
module.exports.deleteRecipeReport = function deleteRecipeReport(
  req,
  res,
  next,
  ...args
) {
  // Assuming args[0] is 'nutritionistID', args[1] is 'reportID'
  const [nutritionistID, reportID] = args;
  ReportNutritionist.deleteRecipeReport(nutritionistID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Function to get a recipe report
module.exports.getRecipeReport = function getRecipeReport(
  req,
  res,
  next,
  ...args
) {
  // Assuming args[0] is 'nutritionistID', args[1] is 'reportID'
  const [nutritionistID, reportID] = args;
  ReportNutritionist.getRecipeReport(nutritionistID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Function to get all recipe reports
module.exports.getRecipeReports = function getRecipeReports(
  req,
  res,
  next,
  ...args
) {
  // Assuming args[0] is 'nutritionistID'
  const [nutritionistID,] = args;
  ReportNutritionist.getRecipeReports(nutritionistID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Function to update a recipe report
module.exports.updateRecipeReport = function updateRecipeReport(
  req,
  res,
  next,
  ...args
) {
  // Assuming args[0] is 'body', args[1] is 'nutritionistID', args[2] is 'reportID'
  const [body, nutritionistID, reportID] = args;
  ReportNutritionist.updateRecipeReport(body, nutritionistID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
