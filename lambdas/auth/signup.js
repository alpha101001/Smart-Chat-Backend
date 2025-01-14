// lambdas/auth/signup.js
const { dynamoDBClient } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");

module.exports.signup = async (event) => {
    try {
        const { email, password } = JSON.parse(event.body);

        const params = {
            TableName: "Users",
            Item: {
                userId: email,
                password, // in production, store a hashed password
            },
        };

        await dynamoDBClient.put(params).promise();

        return successResponse({ message: "User registered successfully" }, 201);
    } catch (error) {
        return errorResponse("Error registering user: " + error.message, 500);
    }
};
