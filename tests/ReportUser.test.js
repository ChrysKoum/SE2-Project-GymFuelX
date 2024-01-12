// Import necessary modules
const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../index.js");
const { testForNonNumericUserID } = require("../utils/testUtils.js");

// Import necessary functions from service/ReportUserService.js
const {
  createGymReport,
  createDietReport,
} = require("../service/ReportUserService.js");

// Define the test data
const userID = generateTestUserID();
const recipeID = generateTestRecipeID();
  const postReport = {
    ByUser: 6,
    ID: 0,
    "isGym-Diet": true, // Here we mean that if is true is for the Gym Program and if is false for Recipe
  };

// Define a utility function to validate the response for an invalid report
function validateInvalidReport(t, body, statusCode) {
  t.is(statusCode,400,"Should return 400 Bad Request for non-numeric userID");
  t.assert(body.message, "Response should have a message");
  t.is(
    body.message,
    "request.body['isGym-Diet'] should be boolean, request.body.ID should be integer, request.body.ByUser should be integer",
    "Response message should indicate an boolean is required for isGym-Diet, integer for ID and ByUser"
  );
  t.deepEqual(
    body.errors,
    [
      {
        errorCode: 'type.openapi.validation',
        message: 'should be boolean',
        path: '.body[\'isGym-Diet\']',
      },
      {
        errorCode: 'type.openapi.validation',
        message: 'should be integer',
        path: '.body.ID',
      },
      {
        errorCode: 'type.openapi.validation',
        message: 'should be integer',
        path: '.body.ByUser',
      },
    ],
    "Response errors should match the expected structure"
  );
}
// Initialize the test environment
test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
    throwHttpErrors: false,
  });
});

// Cleanup after tests
test.after.always((t) => {
  t.context.server.close();
});

// Test for successful posting a report for a Gym Program
test("POST gym program report for a valid userID createGymReport", async (t) => {
  const GymProgramReport = await createGymReport(userID);

  t.truthy(
    typeof GymProgramReport,
    undefined,
    "GymProgramReport should be a undefined"
  );
});

// Test for successful posting a report for a Gym Program
test("POST gym program report for a valid userID using createGymReport API endpoint ", async (t) => {
  const { body, statusCode } = await t.context.got.post(
    `user/${userID}/gymprogram`,
    {
      json: postReport,
    }
  );
  console.log(body);
  t.is(statusCode, 200);
});

// example test for non-numeric userID (400 response)
const userIDfor400 = [
  1.2,
  "abc",
  true,
  "@special",
  null,
  undefined,
  "!",
  "@",
  "^",
  "&",
  "*",
];

// Replace the duplicated test with a call to the utility function
test("GET user with non-numeric user ID returns 400", async (t) => {
  await testForNonNumericUserID(
    ["userID"],
    t,
    async (userID) => {
      return t.context.got.get(`user/${userID}/gymprogram`);
    },
    400,
    "Bad Request"
  );
});

// Test for error posting a report for a Gym program report with false data - 400 
test("POST gym program with invalid data returns error", async (t) => {
  const postReportInvalid = {
    ByUser: [],
    ID: {},
    "isGym-Diet": 23155,
  };
    const { body, statusCode } = await t.context.got.post(
      `user/${userID}/gymprogram`,
      { json: postReportInvalid }
    );

    // Assertions
    validateInvalidReport(t, body, statusCode);
});

// Example test for non-existent userID (404 response)
const nonNumericUserIDsFor404 = ["", []];

test("POST gym program report with non-numeric userID returns 404 error", async (t) => {
  for (const nonNumericUserID of nonNumericUserIDsFor404) {
    const { body, statusCode } = await t.context.got.post(
      `user/${nonNumericUserID}/gymprogram`,
      {
        json: postReport,
      }
    );

    // Assertions
    t.is(statusCode, 404, "Should return 404 Not Found for non-numeric userID");
    t.assert(body.message, "Response should have a message");
    t.is(
      body.message,
      "not found",
      "Response message should indicate the user ID is not found"
    );
    t.deepEqual(
      body.errors,
      [
        {
          path: `/user/${nonNumericUserID}/gymprogram`,
          message: "not found",
        },
      ],
      "Response errors should match the expected structure for a 404 error"
    );
  }
});

// Example test for expected response headers
test("POST gym program report returns expected headers", async (t) => {

  const { headers, statusCode } = await t.context.got.post(
    `user/${userID}/gymprogram`,
    {
      json: postReport,
    }
  );

  t.is(statusCode, 200);
  t.truthy(headers["content-type"]); // Check for expected headers
});

/**
 * Test for Recipe report
 */

const postRecipeReport = {
  ByUser: 6,
  ID: 0,
  "isGym-Diet": false, // Here we mean that if is true is for the Gym Program and if is false for Recipe
};

// Test for successful posting a report for a Recipe report
test("POST recipe report for a valid userID createRecipeReport", async (t) => {
  const RecipeReport = await createDietReport(userID, recipeID);

  t.truthy(
    typeof RecipeReport,
    undefined,
    "RecipeReport should be a undefined"
  );
});

// Test for successful posting a report for a Recipe report
test("POST recipe program for a valid userID using createRecipeReport API endpoint ", async (t) => {
  const userID = generateTestUserID();

  const { statusCode } = await t.context.got.post(
    `user/${userID}/recipe/${recipeID}`,
    {
      json: postRecipeReport,
    }
  );
  t.is(statusCode, 200);
});

// Test for error posting a report for a Recipe report with false ids - 400 
test("POST recipe with invalid IdS returns error 400", async (t) => {

  for (const invalidID of userIDfor400) {
    const { body, statusCode } = await t.context.got.post(
      `user/${invalidID}/recipe/${invalidID}`,
      {
        json: postRecipeReport,
      }
    );

    // Assertions
    t.is(
      statusCode,
      400,
      "Should return 400 Bad Request for non-numeric userID"
    );
    t.assert(body.message, "Response should have a message");
    t.is(
      body.message,
      "request.params.userID should be integer, request.params.recipeID should be integer",
      "Response message should indicate an integer is required"
    );
    t.deepEqual(
      body.errors,
      [
        {
          errorCode: "type.openapi.validation",
          message: "should be integer",
          path: ".params.userID",
        },
        {
          errorCode: "type.openapi.validation",
          message: "should be integer",
          path: ".params.recipeID",
        },
      ],
      "Response errors should match the expected structure"
    );
  }
});

// Test for error posting a report for a Recipe report with false data - 400 
test("POST recipe with invalid data returns error", async (t) => {
  const postRecipeReportInvalid = {
    ByUser: [],
    ID: {},
    "isGym-Diet": 235,
  };
    const { body, statusCode } = await t.context.got.post(
      `user/${userID}/recipe/${recipeID}`,
      { json: postRecipeReportInvalid }
    );

    // Assertions
    validateInvalidReport(t, body, statusCode);
});

// Test for error posting a report for a Recipe report with not existing ids - 404
test("POST recipe with non-numeric userID returns 404 error", async (t) => {

  for (const invalidID of nonNumericUserIDsFor404) {
    const { body, statusCode } = await t.context.got.post(
      `user/${invalidID}/recipe/${invalidID}`,
      {
        json: postRecipeReport,
      }
    );

    // Assertions
    t.is(statusCode, 404, "Should return 404 Not Found for non-numeric userID");
    t.assert(body.message, "Response should have a message");
    t.is(
      body.message,
      "not found",
      "Response message should indicate the user ID is not found"
    );
    t.deepEqual(
      body.errors,
      [
        {
          path: `/user/${invalidID}/recipe/${invalidID}`,
          message: "not found",
        },
      ],
      "Response errors should match the expected structure for a 404 error"
    );
  }
});

// Example test for no allowed user access (405 response)
test("POST recipe report with non-numeric returns 405 error", async (t) => {
    const nonNumericRecipeID = '';
    const { body, statusCode } = await t.context.got.post(
      `user/${userID}/recipe/${nonNumericRecipeID}`,
      {
        json: postRecipeReport,
      }
    );

    // Assertions
    t.is(statusCode, 405, "Should return 405 Not Allowed for this userID");
    t.assert(body.message, "Response should have a message");
    t.is(
      body.message,
      "POST method not allowed",
      "Response message should indicate the user ID is Allowed to access"
    );
    t.deepEqual(
      body.errors,
      [
        {
          path: `/user/${userID}/recipe/${nonNumericRecipeID}`,
          message: "POST method not allowed",
        },
      ],
      "Response errors should match the expected structure for a 405 error"
    );
});

// Example test for expected response headers
test("POST recipe returns expected headers", async (t) => {

  const { headers, statusCode } = await t.context.got.post(
    `user/${userID}/recipe/${recipeID}`,
    {
      json: postRecipeReport,
    }
  );

  t.is(statusCode, 200);
  t.truthy(headers["content-type"]); 
});

function generateTestRecipeID() {
  return Math.floor(Math.random() * 1000000) + 1;
}

function generateTestUserID() {
  return Math.floor(Math.random() * 100000) + 1;
}
