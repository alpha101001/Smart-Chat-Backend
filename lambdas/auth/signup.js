const { docClient } = require("../../config/aws");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { successResponse, errorResponse } = require("../../utils/responseUtils");

/**
 * Signup function
 * Expects event.body to have { email, password }
 */
exports.signup = async (event) => {
    try {
        const { email, password } = JSON.parse(event.body);

        const params = {
            TableName: "Users",
            Item: {
                userId: email,
                password: password,  // In production, store hashed password
            },
        };

        await docClient.send(new PutCommand(params));

        return successResponse({ message: "User registered successfully" }, 201);
    } catch (error) {
        return errorResponse("Error registering user: " + error.message, 500);
    }
};
