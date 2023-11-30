const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../index.js");
const { getDietProgram } = require("../service/DietprogramUserService");

const userID = generateTestUserID(); // Example of a user ID

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
  });
});

test.after.always((t) => {
  t.context.server.close();
});

test("getDietProgram returns the correct structure for a valid user ID", async (t) => {
  const response = await getDietProgram(userID);

  t.truthy(
    response.dayDietProgramIDs,
    "Response should have dayDietProgramIDs"
  );
  t.truthy(response.recipeIDs, "Response should have recipeIDs");
  t.is(
    typeof response.dietProgramID,
    "number",
    "dietProgramID should be a number"
  );
});

function generateTestUserID() {
  return Math.floor(Math.random() * 100000) + 1;
}
