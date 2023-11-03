'use strict';


/**
 * Get gym program reports
 * <ΛΑ-7>   Ο γυμναστής θα πρέπει να έχει την δυνατότητα να βλέπει και να διορθώνει τα προγράμματα γυμναστικής από τυχόν λάθη 
 *
 * trainerID Integer The trainer ID that deletes the gym program
 * reportID Integer The ID of the report that is being deleted.
 * no response value expected for this operation
 **/
exports.deleteReport = function(trainerID,reportID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get gym program report
 * <ΛΑ-7>   Ο γυμναστής θα πρέπει να έχει την δυνατότητα να βλέπει και να διορθώνει τα προγράμματα γυμναστικής από τυχόν λάθη 
 *
 * trainerID Integer The trainer ID
 * reportID Integer The report ID
 * returns Report
 **/
exports.getGymProgramReport = function(trainerID,reportID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "ByUser" : "ByUser",
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
 * trainerID String The trainer Id
 * returns AllReport
 **/
exports.getGymProgramReports = function(trainerID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "ByUser" : "ByUser",
  "ID" : 0,
  "isGym-Diet" : true
}, {
  "ByUser" : "ByUser",
  "ID" : 0,
  "isGym-Diet" : true
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update/Correct fitness program report
 * <ΛΑ-7>   Ο γυμναστής θα πρέπει να έχει την δυνατότητα να βλέπει και να διορθώνει τα προγράμματα γυμναστικής από τυχόν λάθη 
 *
 * trainerID Integer The trainer
 * reportID Integer The report ID
 * gymProgramDetails List The Gym Program Details
 * no response value expected for this operation
 **/
exports.updateReport = function(trainerID,reportID,gymProgramDetails) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

