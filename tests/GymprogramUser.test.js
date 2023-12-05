const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');
const app = require('../index');
const utils = require('../utils/writer.js');


const { getGymProgram } = require('../service/GymprogramUserService.js');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: "json", throwHttpErrors: false });
  });
  
  test.after.always((t) => {
    t.context.server.close();
  });
  

  test("getGymProgram returns the correct structure for a valid userID", async (t) => {
    const userID =23;
    const program = await getGymProgram(userID);
    t.truthy(program.GymProgramDetails);
    //t.truthy(program.gymProgramID); because in example it is 0
    for (const exercise of program.GymProgramDetails) {
      t.truthy(exercise.exerciseDescription);
      t.truthy(exercise.explanationVideo);
      //t.truthy(exercise.exerciseID); because in example it is 0
      t.truthy(exercise.exerciseTitle);
    }
    //Validate the response structure and data types
    t.is(typeof program.GymProgramDetails, "object");
    t.is(typeof program.gymProgramID, "number");
   
  });

test("getGymProgram API endpoint returns the correct structure for a valid userID", async (t) => {
    const userID =23;
    const { body, statusCode }  = await t.context.got(`user/${userID}/gymprogram`);
    const program = body;
    t.is(statusCode, 200, "Should return 200 OK for valid userID ");
    t.truthy(program.GymProgramDetails);
    //t.truthy(program.gymProgramID); because in example it is 0
    for (const exercise of program.GymProgramDetails) {
      t.truthy(exercise.exerciseDescription);
      t.truthy(exercise.explanationVideo);
      //t.truthy(exercise.exerciseID); because in example it is 0
      t.truthy(exercise.exerciseTitle);
    }
    //Validate the response structure and data types
    t.is(typeof program.GymProgramDetails, "object");
    t.is(typeof program.gymProgramID, "number");
   
  });

  const userIDfor400 = [1.2, 'abc', true, '@special', null, undefined, '!', '@', '^', '&', '*',];

  test("getGymProgram with non-integer userID returns 400", async (t) => {
    for (const userID of userIDfor400) {
        const nonIntegerUserID = userID;
        const { body, statusCode } = await t.context.got(`user/${nonIntegerUserID}/gymprogram`);
        t.is(statusCode, 400, "Should return 400 Bad Request for non-integer userID");
        t.is(body.message, 'request.params.userID should be integer');
        t.deepEqual(body.errors, [
          {
              path: '.params.userID',
              message: 'should be integer',
              errorCode: 'type.openapi.validation'
          }
      ]);

    }
  });

  const userIDfor404 = ['', []]
  test("getGymProgram with empty userID returns 404", async (t) => {
    for (const userID of userIDfor404) {
        const emptyUserID = userID;
        const { body, statusCode } = await t.context.got(`user/${emptyUserID}/gymprogram`);
        t.is(statusCode, 404, "Should return 404 Not Found for empty userID");
        t.is(body.message, 'not found');
        t.deepEqual(body.errors, [
          {
              path: '/user//gymprogram',
              message: 'not found',
      
          }
      ]);

    }
  });

  test('getGymProgram returns expected headers', async (t) => {
    const userID = 23;
    const { headers, statusCode } = await t.context.got(`user/${userID}/gymprogram`);
    t.is(statusCode, 200, "Should return 200 OK for valid userID and recipeID");
    t.truthy(headers['content-type'], 'Response should have content-type header');
  });