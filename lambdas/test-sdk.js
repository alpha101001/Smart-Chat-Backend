// lambdas/test-sdk.js
exports.handler = async () => {
    try {
        const AWS = require("aws-sdk");
        return {
            statusCode: 200,
            body: `AWS SDK Version: ${AWS.VERSION || "unknown"}`
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Error: ${error.message}`
        };
    }
};
