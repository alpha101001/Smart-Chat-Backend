const { docClient } = require("../../config/aws");
const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const { signToken } = require("../../config/jwt");
const { successResponse, errorResponse } = require("../../utils/responseUtils");

/**
 * Login function
 * Expects event.body to have { email, password }
 */
exports.login = async (event) => {
    try {
        // If you're using API Gateway direct integration, event.body is a JSON string
        const { email, password } = JSON.parse(event.body);

        const params = {
            TableName: "Users",
            Key: { userId: email },
        };

        const data = await docClient.send(new GetCommand(params));

        if (!data.Item) {
            return errorResponse("User not found", 404);
        }

        // Check password (in real usage, compare hashed password)
        if (data.Item.password !== password) {
            return errorResponse("Invalid credentials", 401);
        }

        // Generate JWT token
        const token = signToken({ userId: email });
        return successResponse({ token });
    } catch (error) {
        return errorResponse("Error logging in: " + error.message, 500);
    }
};
