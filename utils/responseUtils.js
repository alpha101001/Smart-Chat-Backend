/**
 * Utility to format HTTP responses for API Gateway
 */
exports.successResponse = (data, statusCode = 200) => ({
    statusCode,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // Add other headers if necessary
    },
    body: JSON.stringify(data),
});

exports.errorResponse = (message, statusCode = 500) => ({
    statusCode,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ error: message }),
});
