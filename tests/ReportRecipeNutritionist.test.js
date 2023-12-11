const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../index.js");

const {updateRecipeReport} = require("../service/ReportNutritionistService");

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

reportID = generateTestReportID();
nutritionistID = generateTestNutritionID();

// Test for successful posting a report for a Gym Program
test("PUT recipe report for a valid userID updateRecipeReport", async (t) => {
  const putData = {
    ByUser: "ByUser",
    ID: 0,
    "isGym-Diet": true,
  };

  const putRecipeReport = await updateRecipeReport(
    putData,
    nutritionistID,
    reportID
  );

  t.truthy(
    typeof putRecipeReport,
    undefined,
    "updateRecipeReport should be a undefined"
  );
});

// Test for successful posting a report for a Gym Program
test("PUT recipe report for a valid userID using updateRecipeReport API endpoint ", async (t) => {
  const putData = {
    ByUser: "ByUser",
    ID: 0,
    "isGym-Diet": true,
  };

  const { body, statusCode } = await t.context.got.put(
    `nutritionist/${nutritionistID}/report/${reportID}`,
    {
      json: putData,
    }
  );
  console.log(body);
  t.is(statusCode, 200);
});

// Example test for invalid userID (400 response)
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

test("POST gym program with invalid data returns error", async (t) => {
  const putData = {
    ByUser: "ByUser",
    ID: 0,
    "isGym-Diet": true,
  };

  for (const userID of userIDfor400) {
    const invalidID = userID;
    const { body, statusCode } = await t.context.got.put(
      `nutritionist/${invalidID}/report/${invalidID}`,
      {
        json: putData,
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
      "request.params.NutritionistID should be integer, request.params.reportID should be integer",
      "Response message should indicate an integer is required"
    );
    t.deepEqual(
      body.errors,
      [
        {
        errorCode: 'type.openapi.validation',
        message: 'should be integer',
        path: '.params.NutritionistID',
      },
     {
       errorCode: 'type.openapi.validation',
       message: 'should be integer',
       path: '.params.reportID',
     },
      ],
      "Response errors should match the expected structure"
    );
  }
});

// Example test for non-existent userID (404 response)
const nonNumericUserIDsFor404 = ["", []];

test("PUT recipe report with non-numeric returns 404 error", async (t) => {
  const putData = {
    ByUser: "ByUser",
    ID: 0,
    "isGym-Diet": true,
  };

  for (const nonNumericID of nonNumericUserIDsFor404) {
    const { body, statusCode } = await t.context.got.put(
      `nutritionist/${nonNumericID}/report/${nonNumericID}`,
      {
        json: putData,
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
          path: `/nutritionist/${nonNumericID}/report/${nonNumericID}`,
          message: "not found",
        },
      ],
      "Response errors should match the expected structure for a 404 error"
    );
  }
});

// Example test for expected response headers
test("POST gym program returns expected headers", async (t) => {
  const putData = {
    ByUser: "ByUser",
    ID: 0,
    "isGym-Diet": true,
  };

  const { headers, statusCode } = await t.context.got.put(
    `nutritionist/${nutritionistID}/report/${reportID}`,
    {
      json: putData,
    }
  );

  t.is(statusCode, 200);
  t.truthy(headers["content-type"]); // Check for expected headers
});

function generateTestNutritionID() {
  return Math.floor(Math.random() * 100000) + 1;
}

function generateTestReportID() {
  return Math.floor(Math.random() * 100000) + 1;
}