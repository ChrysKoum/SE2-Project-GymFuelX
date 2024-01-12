'use strict';

var utils = require('../utils/writer.js'); // Importing the writer.js module from the utils folder
var ReportUser = require('../service/ReportUserService'); // Importing the ReportUserService module from the service folder

// Function to create a diet report
module.exports.createDietReport = function createDietReport(
  req,
  res,
  next,
  ...args
) {
  // Assuming args[0] is 'body', args[1] is 'userID', args[2] is 'recipeID'
  const [body, userID, recipeID] = args;
  ReportUser.createDietReport(body, userID, recipeID)
    .then(function (response) {
      utils.writeJson(res, response); // Writing the response as JSON using the writeJson function from the utils module
    })
    .catch(function (response) {
      utils.writeJson(res, response); // Writing the response as JSON using the writeJson function from the utils module
    });
};

// Function to create a gym report
module.exports.createGymReport = function createGymReport(
  req,
  res,
  next,
  ...args
) {
  // Assuming args[0] is 'body', args[1] is 'userID'
  const [body, userID] = args;
  ReportUser.createGymReport(body, userID)
    .then(function (response) {
      utils.writeJson(res, response); // Writing the response as JSON using the writeJson function from the utils module
    })
    .catch(function (response) {
      utils.writeJson(res, response); // Writing the response as JSON using the writeJson function from the utils module
    });
};
