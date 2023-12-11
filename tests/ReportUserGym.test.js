const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../index.js");

const {
  createGymReport,
} = require("../service/ReportUserService.js");

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
test("POST gym program for a valid userID createGymReport", async (t) => {
  const userID = generateTestUserID();

  const GymProgramReport = await createGymReport(userID);

  t.truthy(
    typeof GymProgramReport,
    undefined,
    "GymProgramReport should be a undefined"
  );
});

// Test for successful posting a report for a Gym Program
test("POST gym program for a valid userID using createGymReport API endpoint ", async (t) => {
  const userID = generateTestUserID();
  const postData = {
    GymProgramDetails: [
      {
        exerciseID: 0,
        exerciseTitle: "string",
        exerciseDescription: "string",
        explanationVideo: "string",
      },
    ],
    gymProgramID: 0,
  };

  const { body, statusCode } = await t.context.got.post(
    `user/${userID}/gymprogram`,
    {
      json: postData,
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
  const postData = {
    GymProgramDetails: [
      {
        exerciseID: 0,
        exerciseTitle: "string",
        exerciseDescription: "string",
        explanationVideo: "string",
      },
    ],
    gymProgramID: 0,
  };
  for (const userID of userIDfor400) {
    const nonNumericUserID = userID;
    const { body, statusCode } = await t.context.got.post(
      `user/${nonNumericUserID}/gymprogram`,
      {
        json: postData,
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
      "request.params.userID should be integer",
      "Response message should indicate an integer is required"
    );
    t.deepEqual(
      body.errors,
      [
        {
          path: ".params.userID",
          message: "should be integer",
          errorCode: "type.openapi.validation",
        },
      ],
      "Response errors should match the expected structure"
    );
  }
});


// Example test for non-existent userID (404 response)
const nonNumericUserIDsFor404 = ["", []];

test("POST gym program with non-numeric userID returns 404 error", async (t) => {
  const postData = {
    GymProgramDetails: [
      {
        exerciseID: 0,
        exerciseTitle: "string",
        exerciseDescription: "string",
        explanationVideo: "string",
      },
    ],
    gymProgramID: 0,
  };
  for (const nonNumericUserID of nonNumericUserIDsFor404) {
    const { body, statusCode } = await t.context.got.post(
      `user/${nonNumericUserID}/gymprogram`,
      {
        json: postData,
      }
    );

    // Assertions
    t.is(
      statusCode,
      404,
      "Should return 404 Not Found for non-numeric userID"
    );
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
test("POST gym program returns expected headers", async (t) => {
  const userID = 123;
  const postData = {
    GymProgramDetails: [
      {
        exerciseID: 0,
        exerciseTitle: "string",
        exerciseDescription: "string",
        explanationVideo: "string",
      },
    ],
    gymProgramID: 0,
  };

  const { headers, statusCode } = await t.context.got.post(
    `user/${userID}/gymprogram`,
    {
      json: postData,
    }
  );

  t.is(statusCode, 200);
  t.truthy(headers["content-type"]); // Check for expected headers
});

function generateTestUserID() {
  return Math.floor(Math.random() * 100000) + 1;
}