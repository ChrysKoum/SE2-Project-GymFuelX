const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const app = require('../index');

const { 
    getGymProgramReports, 
    getGymProgramReport, 
    deleteReport 
} = require('../service/ReportTrainerService');


test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json', throwHttpErrors: false});
});

test.after.always((t) => {
    t.context.server.close();
});

const TrainerID = generateTestTrainerID();
const reportID = generateTestReportID();

//test of the function deleteReport with success
test('Test of the function deleteReport with success', async (t) => {
    
    const Report = await deleteReport(TrainerID, reportID);
    t.is(Report, undefined, 'deleteReport should be a undefined');
});


//Delete Report
test('Test of the Delete Report with success', async (t) => {
    const { body, statusCode } = await t.context.got.delete(
        `Trainer/${TrainerID}/report/${reportID}`
    );

    //status Code should be 200
    t.is(statusCode, 200, "Should return 200 when report is deleted");
});

test('Test of the Delete Report with 400 error code', async (t) => {
    const wrongReportId = '@';
    const TrainerID = generateTestTrainerID(); // Define TrainerID variable

    const { body, statusCode } = await t.context.got.delete(
        `Trainer/${TrainerID}/report/${wrongReportId}`
    );

    t.is(statusCode, 400, "Should return 400 when there is a bad parameter");
    t.like(body.errors,[
        {
            path: '.params.reportID',
            message: 'should be integer',
            errorCode: 'type.openapi.validation'
        }
    ]);
});

test('Test of the Delete Report with 405 error code', async (t) => {
    const nonExistingReportId = '';
    const TrainerID = generateTestTrainerID(); // Define TrainerID variable

    const { statusCode, body } = await t.context.got.delete(
        `Trainer/${TrainerID}/report/${nonExistingReportId}`
    );
    
    t.is(statusCode, 405, "Should return 405 DELETE method not allowed");
});

function generateTestTrainerID() {
    return Math.floor(Math.random() * 100000) + 1;
}

function generateTestReportID() {
    return Math.floor(Math.random() * 100000) + 1;
}
    

test.after.always((t) => {
    t.context.server.close();
})

/** 
 * GET
 * /trainer/{trainerID}/report
 * Get gym program reports
 */

// Endpoint Testing
test('Get gym program reports returns correct response', async (t) => {
    t.timeout(5000);
    const trainerID = 123;
    const { body, statusCode } = await t.context.got(`trainer/${trainerID}/report`);

    // Test status code
    t.is(statusCode, 200, "Should return 200 OK for valid userID");
    t.true(body.length > 0, 'Response should not be empty');

    const expectedProperties = ['ByUser', 'ID', 'isGym-Diet'];
    //loops for whole responseBody array
    body.forEach((el) => {
        // Test response body
        t.is(typeof el, "object");
        t.truthy(el.ByUser);
        t.not(el.ID, undefined);
        t.not(el.ID, null);
        t.truthy(el['isGym-Diet']);

        // Validate the data types and structure
        t.is(typeof el.ByUser, 'number')
        t.is(typeof el.ID, "number")
        t.is(typeof el['isGym-Diet'], "boolean")
        const actualProperties = Object.keys(el);
        t.deepEqual(actualProperties.sort(), expectedProperties.sort());
    });
});

test('GET reports with minimum valid trainer ID returns correct response', async (t) => {
    const { statusCode } = await t.context.got.get(`trainer/1/report`);
    t.is(statusCode, 200, "Should return 200 OK for valid trainerID");
});

test('GET reports with maximum valid trainer ID returns correct response', async (t) => {
    const { statusCode } = await t.context.got(`trainer/10000000/report`);
    t.is(statusCode, 200, "Should return 200 OK for valid trainerID");
});

const trainerIDfor400 = [1.2, 'abc', true, '@special', null, undefined];
// test('GET reports with non-numeric trainer ID returns 400', async (t) => {
//     for (const trainerID of trainerIDfor400) {
//         const { body, statusCode } = await t.context.got(`trainer/${trainerID}/report`);
//         console.log("ABSDBSDFBS",trainerID)
//         // Assertions
//         t.is(statusCode, 400, 'Should return 400 Bad Request for non-numeric userID');
//         t.assert(body.message);
//         t.is(body.message, 'request.params.userID should be integer');
//         t.deepEqual(body.errors, [
//             {
//                 path: '.params.userID',
//                 message: 'should be integer',
//                 errorCode: 'type.openapi.validation'
//             }
//         ]);
//     }
// });

const trainerIDfor404 = ['', []]
test('GET reports with non-numeric trainer ID returns 404', async (t) => {
    for (const trainerID of trainerIDfor404) {
        const { body, statusCode } = await t.context.got(`trainer/${trainerID}/report`);

        // Assertions
        t.is(statusCode, 404, 'Should return 404 User not found.');
        t.assert(body.message);
        t.is(body.message, 'not found');
        t.deepEqual(body.errors, [
            {
                path: '/trainer//report',
                message: 'not found',
            }
        ]);
    }
});

test('GET reports returns expected headers', async (t) => {
    const trainerID = 123;
    const { headers, statusCode } = await t.context.got(`trainer/${trainerID}/report`);

    t.is(statusCode, 200, "Should return 200 OK for valid userID");
    t.truthy(headers['content-type'], 'Response should have content-type header');
});

// Unit Testing
test('getGymProgramReports - should return a list of gym program reports when given a valid trainer ID', async (t) => {
    const trainerID = 123;
    const expectedReports = [
        {
            ByUser: 6,
            ID: 0,
            'isGym-Diet': true
        },
        {
            ByUser: 6,
            ID: 0,
            'isGym-Diet': true
        }
    ];

    const reports = await getGymProgramReports(trainerID);
    t.deepEqual(reports, expectedReports);
});

test('getGymProgramReports - should return the correct number of gym program reports for the given trainer ID', async (t) => {
    const trainerID = 123;
    const expectedReportCount = 2;

    const reports = await getGymProgramReports(trainerID);
    t.is(reports.length, expectedReportCount);
});


/** 
 * GET
 * /trainer/{trainerID}/report/{reportID}
 * Get gym program report
 */

// Endpoint Testing
test('Get gym program report returns correct response', async (t) => {
    t.timeout(5000);
    const trainerID = 123;
    const reportID = 123;
    const { body, statusCode } = await t.context.got(`trainer/${trainerID}/report/${reportID}`);

    // Test status code
    t.is(statusCode, 200, "Should return 200 OK for valid userID");

    const expectedProperties = ['ByUser', 'ID', 'isGym-Diet'];
    // Test response body
    t.is(typeof body, "object");
    t.truthy(body.ByUser);
    t.not(body.ID, undefined);
    t.not(body.ID, null);
    t.truthy(body['isGym-Diet']);

    // Validate the data types and structure
    t.is(typeof body.ByUser, 'number')
    t.is(typeof body.ID, "number")
    t.is(typeof body['isGym-Diet'], "boolean")
    const actualProperties = Object.keys(body);
    t.deepEqual(actualProperties.sort(), expectedProperties.sort());
});

test('GET report with minimum valid trainer ID returns correct response', async (t) => {
    const { statusCode } = await t.context.got(`trainer/1/report/1`);
    t.is(statusCode, 200, "Should return 200 OK for valid trainerID");
});

test('GET report with maximum valid trainer ID returns correct response', async (t) => {
    const { statusCode } = await t.context.got(`trainer/10000000/report/10000000`);
    t.is(statusCode, 200, "Should return 200 OK for valid trainerID");
});

const reportIDfor400 = [1.2, 'abc', true, '@special', null, undefined, '!', '@', '^', '&', '*',];
test('GET report with non-numeric trainer ID returns 400', async (t) => {
    for (const trainerID of trainerIDfor400) {
        for (const reportID of reportIDfor400) {
            const { body, statusCode } = await t.context.got(`trainer/${trainerID}/report/${reportID}`);

            // Assertions
            t.is(statusCode, 400, 'Should return 400 Bad Request for non-numeric userID');
            t.assert(body.message);
            t.is(body.message, 'request.params.trainerID should be integer, request.params.reportID should be integer');
            t.deepEqual(body.errors, [
                {
                    path: '.params.trainerID',
                    message: 'should be integer',
                    errorCode: 'type.openapi.validation'
                },
                {
                    path: '.params.reportID',
                    message: 'should be integer',
                    errorCode: 'type.openapi.validation'
                }
            ]);
        }
    }
});

const reportIDfor404 = ['', []]
test('GET report with non-numeric trainer ID returns 404', async (t) => {
    for (const trainerID of trainerIDfor404) {
        for (const reportID of reportIDfor404) {
            const { body, statusCode } = await t.context.got(`trainer/${trainerID}/report/${reportID}`);

            // Assertions
            t.is(statusCode, 404, 'Should return 404 User not found.');
            t.assert(body.message);
            t.is(body.message, 'not found');
            t.deepEqual(body.errors, [
                {
                    path: '/trainer//report/',
                    message: 'not found',
                }
            ]);
        }
    }
});

test('GET report returns expected headers', async (t) => {
    const trainerID = 123;
    const reportID = 123;
    const { headers, statusCode } = await t.context.got(`trainer/${trainerID}/report/${reportID}`);

    t.is(statusCode, 200, "Should return 200 OK for valid userID");
    t.truthy(headers['content-type'], 'Response should have content-type header');
});

// Unit Testing
test('getGymProgramReports - should return a list of gym program report when given a valid trainerID and reportID', async (t) => {
    const trainerID = 123;
    const reportID = 123
    const expectedReport = {
        ByUser: 6,
        ID: 0,
        'isGym-Diet': true
    }
    const reports = await getGymProgramReport(trainerID, reportID);
    t.deepEqual(reports, expectedReport);
});
