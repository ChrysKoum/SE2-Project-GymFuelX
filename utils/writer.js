// Constructor for creating a response payload with a code and payload
var ResponsePayload = function (code, payload) {
  this.code = code; // HTTP response code
  this.payload = payload; // The content/data of the response
};

// Function to respond with a specific code and payload
exports.respondWithCode = function (code, payload) {
  return new ResponsePayload(code, payload);
};

// Function to write a JSON response
var writeJson = (exports.writeJson = function (response, arg1, arg2) {
  var code;
  var payload;

  // If the first argument is an instance of ResponsePayload, recursively call writeJson
  if (arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  // Determine the response code from the arguments
  if (arg2 && Number.isInteger(arg2)) {
    code = arg2;
  } else {
    if (arg1 && Number.isInteger(arg1)) {
      code = arg1;
    }
  }
  // Set the payload based on the arguments
  if (code && arg1) {
    payload = arg1;
  } else if (arg1) {
    payload = arg1;
  }

  // Default to code 200 if no code is provided
  if (!code) {
    code = 200;
  }
  // Stringify the payload if it is an object
  if (typeof payload === "object") {
    payload = JSON.stringify(payload, null, 2);
  }
  // Write the HTTP header and end the response with the payload
  response.writeHead(code, { "Content-Type": "application/json" });
  response.end(payload);
});
