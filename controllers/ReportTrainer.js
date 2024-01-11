'use strict';

var utils = require('../utils/writer.js');
/**
 * Controller for handling trainer reports.
 * @module ReportTrainer
 */
var ReportTrainer = require('../service/ReportTrainerService');

module.exports.deleteReport = function deleteReport (req, res,  trainerID, reportID) {
  ReportTrainer.deleteReport(trainerID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGymProgramReport = function getGymProgramReport (req, res,  trainerID, reportID) {
  ReportTrainer.getGymProgramReport(trainerID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGymProgramReports = function getGymProgramReports (req, res,  trainerID) {
  ReportTrainer.getGymProgramReports(trainerID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateReport = function updateReport (req, res,  body, trainerID, reportID) {
  ReportTrainer.updateReport(body, trainerID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
