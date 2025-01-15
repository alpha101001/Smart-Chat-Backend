/*****************************************************
 * lambdas/auth/signup.js - Using DynamoDBDocumentClient
 *****************************************************/
const { dynamoDBClient } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
module.exports.signup = async (event) => {
    try {
        // Highlighted Modification: Add JSON parse error handling
        let parsedBody;
        try {
            parsedBody = JSON.parse(event.body);
        } catch (error) {
            return errorResponse("Invalid JSON payload", 400);
        }

        const { email, password } = parsedBody;

        // Highlighted Modification: Validate email and password
        if (!email || !password) {
            return errorResponse("Email and password are required", 400);
        }

        // Highlighted Modification: Define parameters for DynamoDB `put`
        const params = {
            TableName: "Users",
            Item: {
                userId: email,
                password, // In production, hash the password before storing
            },
        };

        // Highlighted Modification: Use `PutCommand` with `send`
        await dynamoDBClient.send(new PutCommand(params)); // Explicitly send PutCommand

        return successResponse({ message: "User registered successfully" }, 201);
    } catch (error) {
        // Highlighted Modification: Return descriptive error message
        return errorResponse("Error registering user: " + error.message, 500);
    }
};
