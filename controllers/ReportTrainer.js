'use strict';

var utils = require('../utils/writer.js');
/**
 * Controller for handling trainer reports.
 * @module ReportTrainer
 */
var ReportTrainer = require('../service/ReportTrainerService');

module.exports.deleteReport = function deleteReport(req, res, next, ...args) {
  // Assuming args[0] is 'trainerID', args[1] is 'reportID'
  const [trainerID, reportID] = args;
  ReportTrainer.deleteReport(trainerID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGymProgramReport = function getGymProgramReport(
  req,
  res,
  next,
  ...args
) {
  // Assuming args[0] is 'trainerID', args[1] is 'reportID'
  const [trainerID, reportID] = args;
  ReportTrainer.getGymProgramReport(trainerID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGymProgramReports = function getGymProgramReports(
  req,
  res,
  next,
  ...args
) {
  // Assuming args[0] is 'trainerID'
  const [trainerID] = args;
  ReportTrainer.getGymProgramReports(trainerID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateReport = function updateReport(req, res, next, ...args) {
  // Assuming args[0] is 'body', args[1] is 'trainerID', args[2] is 'reportID'
  const [body, trainerID, reportID] = args;
  ReportTrainer.updateReport(body, trainerID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
