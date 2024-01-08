'use strict';
const serviceUtils = require("./serviceUtils");

/**
 * Get gym program reports
 * <ΛΑ-7>   Ο γυμναστής θα πρέπει να έχει την δυνατότητα να βλέπει και να διορθώνει τα προγράμματα γυμναστικής από τυχόν λάθη 
 *
 * trainerID Integer The trainer ID that deletes the gym program
 * reportID Integer The ID of the report that is being deleted.
 * no response value expected for this operation
 **/
exports.deleteReport = function() {
  return serviceUtils.resolveNoValue();
}


/**
 * Get gym program report
 * <ΛΑ-7>   Ο γυμναστής θα πρέπει να έχει την δυνατότητα να βλέπει και να διορθώνει τα προγράμματα γυμναστικής από τυχόν λάθη 
 *
 * trainerID Integer The trainer ID
 * reportID Integer The report ID
 * returns Report
 **/
exports.getGymProgramReport = function() {
  return new Promise(function(resolve) {
    var examples = {};
    examples['application/json'] = {
  "ByUser" : 6,
  "ID" : 0,
  "isGym-Diet" : true
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get gym program reports
 * <ΛΑ-7>   Ο γυμναστής θα πρέπει να έχει την δυνατότητα να βλέπει και να διορθώνει τα προγράμματα γυμναστικής από τυχόν λάθη 
 *
 * trainerID Integer The trainer Id
 * returns AllReport
 **/

exports.getGymProgramReports = function () {
  return serviceUtils.getReportExampleResponse();
};


/**
 * Update/Correct fitness program report
 * <ΛΑ-7>   Ο γυμναστής θα πρέπει να έχει την δυνατότητα να βλέπει και να διορθώνει τα προγράμματα γυμναστικής από τυχόν λάθη 
 *
 * body List 
 * trainerID Integer The trainer
 * reportID Integer The report ID
 * no response value expected for this operation
 **/
exports.updateReport = function () {
  return serviceUtils.resolveNoValue();
};

