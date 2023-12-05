const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');
const app = require('../index');
const utils = require('../utils/writer.js');



const { getRecipeReport, getRecipeReports } = require('../service/ReportNutritionistService');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: "json", throwHttpErrors: false });
  });
  
  test.after.always((t) => {
    t.context.server.close();
  });
  
  test( "getRecipeReport returns the correct structure for a valid nutritionistID and reportID", async (t) => {
    const nutritionistID = 23;
    const reportID = 23;
    const report = await getRecipeReport(nutritionistID,reportID);
    t.truthy(report.ByUser);
    //t.truthy(report.ID); //because the reportID is 0 in the example
    t.truthy(report["isGym-Diet"]);
    //Validate the response structure and data types
    t.is(typeof report.ByUser, "string");
    t.is(typeof report.ID, "number");
    t.is(typeof report["isGym-Diet"], "boolean");

  });

  test("getRecipeReport API endopoint returns the correct structure for a valid nutritionistID and reportID", async (t) => {
    const nutritionistID = 23;
    const reportID = 23;
    const { body, statusCode } = await t.context.got(`nutritionist/${nutritionistID}/report/${reportID}`);
    t.is(statusCode, 200,"should return a 200 status code for a valid nutritionistID and reportID");
    const report = body;
    t.truthy(report.ByUser);
    //t.truthy(report.ID); //because the reportID is 0 in the example
    t.truthy(report["isGym-Diet"]);
    //Validate the response structure and data types
    t.is(typeof report.ByUser, "string");
    t.is(typeof report.ID, "number");
    t.is(typeof report["isGym-Diet"], "boolean");

  });

test('getRecipeReport with minimum valid nutritionistID and reportID returns correct response', async (t) => {
    const { body, statusCode } = await t.context.got(`nutritionist/1/report/1`);
    t.is(statusCode, 200, "Should return 200 OK for valid nutritionistID and reportID");
});
test('getRecipeReport with maximum valid nutritionistID and reportID returns correct response', async (t) => {
    const { body, statusCode } = await t.context.got(`nutritionist/10000000/report/10000000`);
    t.is(statusCode, 200, "Should return 200 OK for valid nutritionistID and reportID");
});


const nutritionistIDfor400 = [3.4, 'abcs', true, '@special', null, undefined, '!', '@', '^', '&', '*',];
const reportIDfor400 = [3.4, 'abcs', true, '@special', null, undefined, '!', '@', '^', '&', '*',];

nutritionistIDfor400.forEach(async (nutritionistID) => {
    test(`getRecipeReport with invalid nutritionistID ${nutritionistID} returns 400`, async (t) => {
        const { body,statusCode } = await t.context.got(`nutritionist/${nutritionistID}/report/5`);
        t.is(statusCode, 400, "Should return 400 Bad Request for invalid nutritionistID");
        t.is(body.message, 'request.params.NutritionistID should be integer')
        t.assert(body.message);
        t.deepEqual(body.errors,[
            {
                path: '.params.NutritionistID',
                message: 'should be integer',
                errorCode: 'type.openapi.validation'
            }
        ]);
    });
});

reportIDfor400.forEach(async (reportID) => {
    test(`getRecipeReport with invalid reportID ${reportID} returns 400`, async (t) => {
        const { body,statusCode } = await t.context.got(`nutritionist/5/report/${reportID}`);
        t.is(statusCode, 400, "Should return 400 Bad Request for invalid reportID");
        t.is(body.message, 'request.params.reportID should be integer')
        t.assert(body.message);
        t.deepEqual(body.errors,[
            {
                path: '.params.reportID',
                message: 'should be integer',
                errorCode: 'type.openapi.validation'
            }
        ]);
    });
});

const nutritionistIDfor404 = ['', []]
const reportIDfor404 = ['', []]

test('getRecipeReport with empty user ID and valid recipeID returns 404', async (t) => {
    for (const nutritionistID of nutritionistIDfor404) {
        const emptynutritionistID = nutritionistID;

        const { body, statusCode } = await t.context.got(`nutritionist/${emptynutritionistID}/report/23`);

        // Assertions
        t.is(statusCode, 404, 'Should return 404 User not found.');
        t.assert(body.message);
        t.is(body.message, 'not found');
        t.deepEqual(body.errors, [
            {
                path: '/nutritionist//report/23',
                message: 'not found',
            }
        ]);
    }
});

test('getRecipeReport with valid nutritionistID and empty reportID returns 404', async (t) => {
    for (const reportID of reportIDfor404) {
        const emptyreportID = reportID;

        const { body, statusCode } = await t.context.got(`nutritionist/23/report/${emptyreportID}/`);

        // Assertions
        t.is(statusCode, 404, 'Should return 404 User not found.');
        t.assert(body.message);
        t.is(body.message, 'not found');
        t.deepEqual(body.errors, [
            {
                path: '/nutritionist/23/report//',
                message: 'not found',
            }
        ]);
    }
});

test("getRecipeReports returns expected headers", async (t) => {
    const nutritionistID = 23;
    const reportID = 34;
    const { headers, statusCode } = await t.context.got(`nutritionist/${nutritionistID}/report/${reportID}`);

    t.is(statusCode, 200, "Should return 200 OK for valid nutritionistID and reportID");
    t.truthy(headers['content-type'], 'Response should have content-type header');
});


///test for getRecipeReports

test( "getRecipeReports returns the correct structure for a valid nutritionistID", async (t) => {
    const nutritionistID = 54;
    const reports = await getRecipeReports(nutritionistID);
    for(const report of reports){
        t.truthy(report.ByUser);
        //t.truthy(report.ID); //because the reportID is 0 in the example
        t.truthy(report["isGym-Diet"]);
        //Validate the response structure and data types
        t.is(typeof report.ByUser, "string");
        t.is(typeof report.ID, "number");
        t.is(typeof report["isGym-Diet"], "boolean");
    }
  });

test("getRecipeReports API endopoint returns the correct structure for a valid nutritionistID", async (t) => {
    const nutritionistID = 54;
    const { body, statusCode } = await t.context.got(`nutritionist/${nutritionistID}/report`);
    t.is(statusCode, 200,"should return a 200 status code for a valid nutritionistID");
    const reports = body;
    for(const report of reports){
        t.truthy(report.ByUser);
        //t.truthy(report.ID); //because the reportID is 0 in the example
        t.truthy(report["isGym-Diet"]);
        //Validate the response structure and data types
        t.is(typeof report.ByUser, "string");
        t.is(typeof report.ID, "number");
        t.is(typeof report["isGym-Diet"], "boolean");
    }
  });

test("getRecipeReport with non-integer nutritionistID returns 400", async (t) => {
    for (const nutritionistID of nutritionistIDfor400) {
        const nonIntegernutritionistID = nutritionistID;
        const { body, statusCode } = await t.context.got(`nutritionist/${nonIntegernutritionistID}/report`);
        t.is(statusCode, 400, "Should return 400 Bad Request for non-integer nutritionistID");
        t.is(body.message, 'request.params.NutritionistID should be integer');
        t.deepEqual(body.errors, [
            {
                path: '.params.NutritionistID',
                message: 'should be integer',
                errorCode: 'type.openapi.validation'
            }
        ]);

    }
});

test("getRecipeReport with empty nutritionistID returns 404", async (t) => {
    for (const nutritionistID of nutritionistIDfor404) {
        const emptynutritionistID = nutritionistID;
        const { body, statusCode } = await t.context.got(`nutritionist/${emptynutritionistID}/report`);
        t.is(statusCode, 404, "Should return 404 Not Found for empty nutritionistID");
        t.is(body.message, 'not found');
        t.deepEqual(body.errors, [
            {
                path: '/nutritionist//report',
                message: 'not found',

            }
        ]);

    }
});

test('getRecipeReport returns expected headers', async (t) => {
    const nutritionistID = 122;
    const { headers, statusCode } = await t.context.got(`nutritionist/${nutritionistID}/report`);

    t.is(statusCode, 200, "Should return 200 OK for valid nutritionistID");
    t.truthy(headers['content-type'], 'Response should have content-type header');
});