'use strict';

var utils = require('../utils/writer.js');
var ReportTrainer = require('../service/ReportTrainerService');

module.exports.deleteReport = function deleteReport (req, res, next, trainerID, reportID) {
  ReportTrainer.deleteReport(trainerID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGymProgramReport = function getGymProgramReport (req, res, next, trainerID, reportID) {
  ReportTrainer.getGymProgramReport(trainerID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGymProgramReports = function getGymProgramReports (req, res, next, trainerID) {
  ReportTrainer.getGymProgramReports(trainerID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateReport = function updateReport (req, res, next, body, trainerID, reportID) {
  ReportTrainer.updateReport(body, trainerID, reportID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
