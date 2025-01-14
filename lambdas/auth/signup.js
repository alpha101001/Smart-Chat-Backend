/*****************************************************
 * lambdas/auth/signup.js - Using DynamoDBDocumentClient
 *****************************************************/
const { dynamoDBClient } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");

module.exports.signup = async (event) => {
    try {
        const { email, password } = JSON.parse(event.body);

        const params = {
            TableName: "Users",
            Item: {
                userId: email,
                password, // In production, store a hashed password
            },
        };

        await dynamoDBClient.put(params);

        return successResponse({ message: "User registered successfully" }, 201);
    } catch (error) {
        return errorResponse("Error registering user: " + error.message, 500);
    }
};
