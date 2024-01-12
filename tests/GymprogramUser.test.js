// Importing necessary modules
const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../index");
// Importing the getGymProgram function
const { getGymProgram } = require("../service/GymprogramUserService.js");
// Importing test utility functions
const { testForNonNumericUserID, generateTestID } = require("../utils/testUtils.js");

const userID = generateTestID();

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

test("getGymProgram with non-integer userID returns 400", async (t) => {
  await testForNonNumericUserID(["userID"],t,
    async (nonValidID) => {
      return t.context.got.get(`user/${nonValidID}/gymprogram`);
    },400,"Bad Request"
  );
});


// Test case for empty userID, expecting a 404 response
test("getGymProgram with empty userID returns 404", async (t) => {
  await testForNonNumericUserID(["userID"],t,
    async (nonValidID) => {
      return t.context.got.get(`user/${nonValidID}/gymprogram`);
    },404,"Not Found", ["user","gymprogram"]
  );
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
