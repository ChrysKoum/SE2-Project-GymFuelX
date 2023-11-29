const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");

const { getDietProgram } = require("../service/DietprogramUserService.js");

test("T1.1 Test", (t) => {
  t.pass();
});
const app = require("../index.js");

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.preFixUrl = await listen(t.context.server);
  t.context.got = got.extend({
    preFixUrl: t.context.preFixUrl,
    responseType: "json",
  });
});

test.after.always((t) => {
  t.context.server.close();
});

test("getDietProgram returns a diet program with the correct structure", async (t) => {
  got.get(t.context.got(), {});
  const userID = generateTestUserID(); // A function to generate or provide a test user ID

  // Not sure if is like this
  const { body, statusCode } = await t.context.got(
    `/user/${userID}/dietprogram`
  );

  t.is(statusCode, 200);

  // Assert that the result has the correct structure and data types
  t.true(
    Array.isArray(body.dayDietProgramIDs),
    "dayDietProgramIDs should be an array"
  );
  t.true(
    result.dayDietProgramIDs.every((day) => Array.isArray(day)),
    "Each element in dayDietProgramIDs should be an array"
  );
  t.true(Array.isArray(result.recipeIDs), "recipeIDs should be an array");
  t.true(
    typeof result.dietProgramID === "number",
    "dietProgramID should be a number"
  );
});

function generateTestUserID() {
  // Implement logic to generate or retrieve a test user ID
  return 123; // Example implementation
}
