// Importing necessary modules
const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../index");

const { getGymProgram } = require("../service/GymprogramUserService.js");

// Setup before running tests
test.before(async (t) => {
  // Creating an HTTP server for the app
  t.context.server = http.createServer(app);
  // Listening to the server and getting the URL
  t.context.prefixUrl = await listen(t.context.server);
  // Extending got for HTTP requests with predefined options
  t.context.got = got.extend({
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
    throwHttpErrors: false,
  });
});

// Teardown after all tests are completed
test.after.always((t) => {
  // Closing the server
  t.context.server.close();
});

// Test case for the getGymProgram function
test("getGymProgram returns the correct structure for a valid userID", async (t) => {
  const userID = 23;
  const program = await getGymProgram(userID);
  t.truthy(program.GymProgramDetails);
  // Checking each exercise detail in the program
  for (const exercise of program.GymProgramDetails) {
    t.truthy(exercise.exerciseDescription);
    t.truthy(exercise.explanationVideo);
    t.truthy(exercise.exerciseTitle);
  }
  // Validate the response structure and data types
  t.is(typeof program.GymProgramDetails, "object");
  t.is(typeof program.gymProgramID, "number");
});

// Test case for the getGymProgram API endpoint
test("getGymProgram API endpoint returns the correct structure for a valid userID", async (t) => {
  const userID = 23;
  const { body, statusCode } = await t.context.got(`user/${userID}/gymprogram`);
  const program = body;
  t.is(statusCode, 200, "Should return 200 OK for valid userID");
  t.truthy(program.GymProgramDetails);
  for (const exercise of program.GymProgramDetails) {
    t.truthy(exercise.exerciseDescription);
    t.truthy(exercise.explanationVideo);
    t.truthy(exercise.exerciseTitle);
  }
  // Validate the response structure and data types
  t.is(typeof program.GymProgramDetails, "object");
  t.is(typeof program.gymProgramID, "number");
});

// Test case for non-integer userID, expecting a 400 response
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

test("getGymProgram with non-integer userID returns 400", async (t) => {
  for (const userID of userIDfor400) {
    const { body, statusCode } = await t.context.got(
      `user/${userID}/gymprogram`
    );
    t.is(
      statusCode,
      400,
      "Should return 400 Bad Request for non-integer userID"
    );
    t.is(body.message, "request.params.userID should be integer");
    t.deepEqual(body.errors, [
      {
        path: ".params.userID",
        message: "should be integer",
        errorCode: "type.openapi.validation",
      },
    ]);
  }
});

// Test case for empty userID, expecting a 404 response
const userIDfor404 = ["", []];
test("getGymProgram with empty userID returns 404", async (t) => {
  for (const userID of userIDfor404) {
    const { body, statusCode } = await t.context.got(
      `user/${userID}/gymprogram`
    );
    t.is(statusCode, 404, "Should return 404 Not Found for empty userID");
    t.is(body.message, "not found");
    t.deepEqual(body.errors, [
      {
        path: "/user//gymprogram",
        message: "not found",
      },
    ]);
  }
});

// Test for checking response headers
test("getGymProgram returns expected headers", async (t) => {
  const userID = 23;
  const { headers, statusCode } = await t.context.got(
    `user/${userID}/gymprogram`
  );
  t.is(statusCode, 200, "Should return 200 OK for valid userID");
  t.truthy(headers["content-type"], "Response should have content-type header");
});
