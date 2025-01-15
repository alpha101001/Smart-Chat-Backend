/*****************************************************
 * lambdas/auth/login.js - Using DynamoDBDocumentClient
 *****************************************************/
const { dynamoDBClient } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
const { signToken } = require("../../config/jwt");

module.exports.login = async (event) => {
    try {
        const { email, password } = JSON.parse(event.body);

        const params = {
            TableName: "Users",
            Key: { userId: email },
        };

        // Using the DocumentClient v3 style
        const data = await dynamoDBClient.get(params);

        if (!data.Item) {
            return errorResponse("User not found", 404);
        }

        // In production, store hashed password & compare hashed versions
        if (data.Item.password !== password) {
            return errorResponse("Invalid credentials", 401);
        }

        // Create and sign a JWT
        const token = signToken({ userId: email });
        return successResponse({ token });
    } catch (error) {
        return errorResponse("Error logging in: " + error.message, 500);
    }
};
