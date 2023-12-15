const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');
const app = require('../index');

const { getUserDetails, editUserDetails, addUserDetails } = require('../service/UserUserService');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: "json", throwHttpErrors: false });
});
test.after.always((t) => {
    t.context.server.close();
})

test('GET user returns correct response', async (t) => {
    t.timeout(5000);
    const userID = 123;
    const { body, statusCode } = await t.context.got(`user/${userID}`);
    // Test status code
    t.is(statusCode, 200, "Should return 200 OK for valid userID");

    // Test response body
    t.truthy(body.birthday);
    t.truthy(body.meal);
    t.truthy(body.allergies);
    t.truthy(body.goal);
    t.truthy(body.gender);
    t.truthy(body.level);
    t.truthy(body.weight);
    t.truthy(body.restrictions);
    t.truthy(body.username);
    t.truthy(body.height);

    // Validate the data types and structure
    t.is(typeof body.birthday, "string", "birthday should be a string");
    t.is(typeof body.meal, "string", "meal should be a string");
    t.is(typeof body.allergies, "string", "allergies should be a string");
    t.is(typeof body.goal, "string", "goal should be a string");
    t.is(typeof body.gender, "string", "gender should be a string");
    t.is(typeof body.level, "string", "level should be a string");
    t.is(typeof body.weight, "number", "weight should be a number");
    t.is(typeof body.restrictions, "string", "restrictions should be a string");
    t.is(typeof body.userID, "number", "userID should be a number");
    t.is(typeof body.username, "string", "username should be a string");
    t.is(typeof body.height, "number", "height should be a number");
});

test('getUserDetails returns user details', async (t) => {
    const userID = 123;
    const userDetails = await getUserDetails(userID);

    t.truthy(userDetails.allergies, "Response should have allergies property");
    t.is(userDetails.birthday, '2000-01-23T04:56:07.000+00:00');
    t.is(userDetails.meal, 'meal');
    t.is(userDetails.allergies, 'allergies');

    t.is(typeof userDetails.userID, 'number');
    t.is(typeof userDetails.username, 'string');
    t.is(typeof userDetails.height, 'number');
});

test('GET user with minimum valid user ID returns correct response', async (t) => {
    const { statusCode } = await t.context.got('user/1');
    t.is(statusCode, 200, "Should return 200 OK for valid userID");
});

test('GET user with maximum valid user ID returns correct response', async (t) => {
    const { statusCode } = await t.context.got('user/1000000');
    t.is(statusCode, 200, "Should return 200 OK for valid userID");
});

const userIDfor400 = [1.2, 'abc', true, '@special', null, undefined, '!', '@', '^', '&', '*',];
test('GET user with non-numeric user ID returns 400', async (t) => {
    for (const userID of userIDfor400) {
        const nonNumericUserID = userID;
        const { body, statusCode } = await t.context.got(`user/${nonNumericUserID}`);
        // Assertions
        t.is(statusCode, 400, 'Should return 400 Bad Request for non-numeric userID');
        t.assert(body.message);
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

const userIDfor405 = ['', []]
test('GET user with non-numeric user ID returns 404', async (t) => {
    for (const userID of userIDfor405) {
        const nonNumericUserID = userID;

        const { body, statusCode } = await t.context.got(`user/${nonNumericUserID}`);

        // Assertions
        t.is(statusCode, 405, 'Should return 405 Forbidden.');
        t.assert(body.message);
        t.is(body.message, 'GET method not allowed');
        t.deepEqual(body.errors, [
            {
                path: '/user/',
                message: 'GET method not allowed',
            }
        ]);
    }
});

test('GET user returns expected headers', async (t) => {
    const userID = 123;
    const { headers, statusCode } = await t.context.got(`user/${userID}`);

    t.is(statusCode, 200, "Should return 200 OK for valid userID");
    t.truthy(headers['content-type'], 'Response should have content-type header');
});
const mockRequestBody = {
    userID: 12,
    username: "testName",
    birthday: '2000-01-23T04:56:07.000+00:00',
    gender: 'gender',
    height: 6.027456183070403,
    weight: 1.4658129805029452,
    meal: "testMeal",
    allergies: "testAllergies",
    restrictions: "testRestrictions",
    level: "testLevel",
    goal: "testGoal"
};
test('PUT editUserDetails returns success response with required fields', async (t) => {
    const userID = 0;
    mockRequestBody.userID = userID;

    const { body, statusCode } = await t.context.got.put(`user/${userID}`, {
        json: mockRequestBody,
    });
    // Assertions
    t.is(statusCode, 200, 'Should return 200 OK for successful editUserDetails');
    t.truthy(body.birthday);
    t.truthy(body.gender);
    t.truthy(body.height);
    t.truthy(body.weight);
});

test('PUT editUserDetails with invalid userID returns fail response - 400 ', async (t) => {
    for (const userID of userIDfor400) {
        const nonNumericUserID = userID;
        mockRequestBody.userID = nonNumericUserID;

        const { body, statusCode } = await t.context.got.put(`user/${userID}`, {
            json: mockRequestBody,
        });
        // Assertions
        t.is(statusCode, 400, 'Should return 400 Bad Request for non-numeric userID');
        t.assert(body.message);
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

test('PUT editUserDetails with invalid userID returns fail response 404 ', async (t) => {
    for (const userID of userIDfor405) {
        const nonNumericUserID = userID;
        mockRequestBody.userID = nonNumericUserID;

        const { body, statusCode } = await t.context.got.put(`user/${userID}`, {
            json: mockRequestBody,
        });
        // Assertions
        t.is(statusCode, 405, 'Should return 405 Forbidden.');
        t.assert(body.message);
        t.is(body.message, 'PUT method not allowed');
        t.deepEqual(body.errors, [
            {
                path: '/user/',
                message: 'PUT method not allowed',
            }
        ]);
    }
});

test('editUserDetails successfully edits user details', async (t) => {
    const userID = 123;
    mockRequestBody.userID = 0;
    mockRequestBody.username = "username";
    mockRequestBody.allergies = "allergies";
    mockRequestBody.goal = "goal";
    mockRequestBody.level = "level";
    mockRequestBody.meal = "meal";
    mockRequestBody.restrictions = "restrictions";
    

    const result = await editUserDetails(mockRequestBody, userID);
    // Assertions
    t.deepEqual(result, {
        "birthday": "2000-01-23T04:56:07.000+00:00",
        "meal": "meal",
        "allergies": "allergies",
        "goal": "goal",
        "gender": "gender",
        "level": "level",
        "weight": 1.4658129805029452,
        "restrictions": "restrictions",
        "userID": 0,
        "username": "username",
        "height": 6.027456183070403
    });
});

test('POST  addUserDetails returns success response with required fields', async (t) => {
    const newUserID = 1456;
    mockRequestBody.userID = newUserID;
    const { body, statusCode } = await t.context.got.post(`user/`, {
        json: mockRequestBody,
    });
    // Assertions
    console.log(body);
    t.is(statusCode, 200, 'Should return 200 ');
    
    t.truthy(body.birthday);
    t.truthy(body.username);
    t.truthy(body.height);
    t.truthy(body.weight);
    t.truthy(body.meal);
    t.truthy(body.allergies);
    t.truthy(body.restrictions);
    t.truthy(body.level);
    t.truthy(body.goal);
    t.truthy(body.gender);
});

test("Post addUserDetails function returns user details", async (t) => {
    const newUserID = 123;
    const mockRequestBody = {   
        userID : newUserID,
        username : "string",
        birthday : "2023-12-12T01:10:12.302Z",
        gender : "string",
        height : 0,
        weight : 0,
        meal : "string",
        allergies : "string",
        restrictions : "string",
        level : "string",
        goal : "string"
      };

    const User = await addUserDetails(mockRequestBody);
    t.truthy(User.birthday);
    t.truthy(User.meal);
    t.truthy(User.allergies);
    t.truthy(User.goal);
    t.truthy(User.gender);
    t.truthy(User.level);
    t.truthy(User.weight);
    t.truthy(User.restrictions);
    t.truthy(User.username);
    t.truthy(User.height);
});

test("Post addUserDetails function returns correct headers", async (t) => {
    const newUserID = 1456;
    mockRequestBody.userID = newUserID;
    const { headers, statusCode } = await t.context.got.post(`user/`, {
        json: mockRequestBody,
    });
    // Assertions
    t.is(statusCode, 200, 'Should return 200 ');
    t.truthy(headers['content-type'], 'Response should have content-type header');
});

const invalidMockRequestBody = {
    userID: 12,
    username: "testName",
    birthday: 'sads',
    gender: 'gender',
    height: 6.027456183070403,
    weight: 1.4658129805029452,
    meal: "testMeal",
    allergies: "testAllergies",
    restrictions: "testRestrictions",
    level: "testLevel",
    goal: "testGoal"
};

test('POST addUserDetails with invalid userID returns fail response - 400 ', async (t) => {
    const invalidUserID = 23;
    invalidMockRequestBody.userID = invalidUserID;
    const { body, statusCode } = await t.context.got.post(`user/`, {
        json: invalidMockRequestBody,
    });
    // Assertions
    t.is(statusCode, 400, 'Should return 400 Bad input type for user');
    
});
