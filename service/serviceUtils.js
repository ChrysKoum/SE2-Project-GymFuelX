"use strict";

// Example response for reports
function getReportExampleResponse() {
  return new Promise(function (resolve) {
    var examples = {};
    examples["application/json"] = [
      {
        ByUser: "ByUser",
        ID: 0,
        "isGym-Diet": true,
      },
      {
        ByUser: "ByUser",
        ID: 0,
        "isGym-Diet": true,
      },
    ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

/**
 * Common function to get example user response.
 */
function getUserExampleResponse() {
  return new Promise(function (resolve) {
    var examples = {};
    examples["application/json"] = {
      birthday: "2000-01-23T04:56:07.000+00:00",
      meal: "meal",
      allergies: "allergies",
      goal: "goal",
      gender: "gender",
      level: "level",
      weight: 1.4658129805029452,
      restrictions: "restrictions",
      userID: 0,
      username: "username",
      height: 6.027456183070403,
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


// Function to get example recipe response
function getRecipeExampleResponse(single = false) {
  var exampleRecipe = {
    IngredientsName: ["IngredientsName", "IngredientsName"],
    difficulty: "difficulty",
    servings: "servings",
    recipeType: "recipeType",
    Instructions: ["Instructions", "Instructions"],
    NutritionalTable: ["NutritionalTable", "NutritionalTable"],
    IngredientsQuantity: ["IngredientsQuantity", "IngredientsQuantity"],
    time: 6,
    recipeID: 0,
    imgRecipe: "imgRecipe",
  };

  return new Promise(function (resolve) {
    var examples = {};
    examples["application/json"] = single
      ? exampleRecipe
      : [exampleRecipe, exampleRecipe];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

// Common resolve function for operations without response value
function resolveNoValue() {
  return new Promise(function(resolve) {
    resolve();
  });
}

module.exports = {
  getRecipeExampleResponse,
  getReportExampleResponse,
  getUserExampleResponse,
  resolveNoValue
};