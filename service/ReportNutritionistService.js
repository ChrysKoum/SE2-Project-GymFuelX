'use strict';

const serviceUtils = require("./serviceUtils");

/**
 * delete recipe report
 * <ΛΑ-9>   Ο διατροφολόγος πρέπει να μπορεί να βλέπει τις αναφορές που γίνονται από τους χρήστες στις συνταγές. 
 *
 * nutritionistID Integer The nutritionist ID that delete the recipe report
 * reportID Integer The ID of the recipe report that is being deleted.
 * no response value expected for this operation
 **/
exports.deleteRecipeReport = function(nutritionistID,reportID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get recipe report
 * <ΛΑ-9>   Ο διατροφολόγος πρέπει να μπορεί να βλέπει τις αναφορές που γίνονται από τους χρήστες στις συνταγές. 
 *
 * nutritionistID Integer The nutritionist ID that see the recipe report
 * reportID Integer The ID of the recipe report.
 * returns Report
 **/
exports.getRecipeReport = function(nutritionistID,reportID) {
  return new Promise(function(resolve, reject) {
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
 * Get recipe reports
 * <ΛΑ-9>   Ο διατροφολόγος πρέπει να μπορεί να βλέπει τις αναφορές που γίνονται από τους χρήστες στις συνταγές. 
 *
 * nutritionistID Integer The nutritionist ID that see the recipe reports
 * returns AllReport
 **/
exports.getRecipeReports = function(nutritionistID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples["application/json"] = serviceUtils.generateReportData();
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update/Correct recipe report
 * <ΛΑ-9>   Ο διατροφολόγος πρέπει να μπορεί να βλέπει τις αναφορές που γίνονται από τους χρήστες στις συνταγές. 
 *
 * body List 
 * nutritionistID Integer The nutritionist ID that update the recipe report
 * reportID Integer The ID of the recipe report that is being updated.
 * no response value expected for this operation
 **/
exports.updateRecipeReport = function(body,nutritionistID,reportID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

