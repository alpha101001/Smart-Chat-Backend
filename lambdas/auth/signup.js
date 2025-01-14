/*****************************************************
 * lambdas/auth/signup.js - Using DynamoDBDocumentClient
 *****************************************************/
const { dynamoDBClient } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");

module.exports.signup = async (event) => {
    try {
        // Highlighted Modification: Add try-catch block for JSON parsing
        let parsedBody;
        try {
            parsedBody = JSON.parse(event.body);
        } catch (error) {
            return errorResponse("Invalid JSON payload", 400);
        }

        // Highlighted Modification: Validate email and password
        const { email, password } = parsedBody;
        if (!email || !password) {
            return errorResponse("Email and password are required", 400);
        }

        // Highlighted Modification: Define DynamoDB put parameters
        const params = {
            TableName: "Users",
            Item: {
                userId: email,
                password, // In production, store a hashed password
            },
        };

        // Highlighted Modification: Use the `put` method from DynamoDBDocumentClient
        await dynamoDBClient.put(params);

        // Highlighted Modification: Return success response on successful user registration
        return successResponse({ message: "User registered successfully" }, 201);
    } catch (error) {
        // Highlighted Modification: Return descriptive error response
        return errorResponse("Error registering user: " + error.message, 500);
    }
};
