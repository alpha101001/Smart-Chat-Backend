/*****************************************************
 * lambdas/auth/login.js
 *****************************************************/
const { dynamoDBClient } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
const { signToken } = require("../../config/jwt");
const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const bcrypt = require("bcryptjs");

module.exports.login = async (event) => {
    try {
        // Parse the request body
        const { userEmail, password } = JSON.parse(event.body);

        // Validate required fields
        if (!userEmail || !password) {
            return errorResponse("userEmail and password are required", 400);
        }

        // Fetch user by userEmail (used as userId in signup)
        const params = {
            TableName: "Users",
            Key: { userId: userEmail },
        };
        const data = await dynamoDBClient.send(new GetCommand(params));

        if (!data.Item) {
            return errorResponse("User not found", 404);
        }

        // Ensure all required fields exist in the data
        const { name, userName, userEmail: fetchedEmail, dateOfBirth, password: hashedPassword } = data.Item;

        if (!name) {
            return errorResponse("User name is missing. Please contact support.", 500);
        }
        if (!userName) {
            return errorResponse("User username is missing. Please contact support.", 500);
        }
        if (!fetchedEmail) {
            return errorResponse("User email is missing. Please contact support.", 500);
        }
        if (!dateOfBirth) {
            return errorResponse("User date of birth is missing. Please contact support.", 500);
        }
        if (!hashedPassword) {
            return errorResponse("User password is missing. Please contact support.", 500);
        }

        // Compare stored hashed password with incoming password
        const validPassword = await bcrypt.compare(password, hashedPassword);
        if (!validPassword) {
            return errorResponse("Invalid credentials", 401);
        }

        // Create and sign a JWT with user info
        const token = signToken({ userId: userEmail });

        // Return success response with user info
        return successResponse({
            token,
            name,
            userName,
            userEmail: fetchedEmail,
            dateOfBirth,
        });

    } catch (error) {
        return errorResponse("Error logging in: " + error.message, 500);
    }
};
