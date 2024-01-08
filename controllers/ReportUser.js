'use strict';

var utils = require('../utils/writer.js'); // Importing the writer.js module from the utils folder
var ReportUser = require('../service/ReportUserService'); // Importing the ReportUserService module from the service folder

// Function to create a diet report
module.exports.createDietReport = function createDietReport (req, res, next, body, userID, recipeID) {
  ReportUser.createDietReport(body, userID, recipeID)
    .then(function (response) {
      utils.writeJson(res, response); // Writing the response as JSON using the writeJson function from the utils module
    })
    .catch(function (response) {
      utils.writeJson(res, response); // Writing the response as JSON using the writeJson function from the utils module
    });
};

// Function to create a gym report
module.exports.createGymReport = function createGymReport (req, res, next, body, userID) {
  ReportUser.createGymReport(body, userID)
    .then(function (response) {
      utils.writeJson(res, response); // Writing the response as JSON using the writeJson function from the utils module
    })
    .catch(function (response) {
      utils.writeJson(res, response); // Writing the response as JSON using the writeJson function from the utils module
    });
};
