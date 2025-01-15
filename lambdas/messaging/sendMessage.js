/*****************************************************
 * lambdas/messaging/sendMessage.js - DynamoDBDocumentClient
 *****************************************************/
const { dynamoDBClient } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
const { v4: uuidv4 } = require("uuid");
// const { protectRoute } = require("../../utils/authUtils");

module.exports.sendMessage = async (event) => {
    try {
        // protectRoute(event.headers);
        const { chatId, senderId, content } = JSON.parse(event.body);

        const messageId = uuidv4();
        const params = {
            TableName: "Messages",
            Item: {
                messageId,
                chatId,
                senderId,
                content,
                timestamp: Date.now(),
            },
        };

        await dynamoDBClient.put(params);

        return successResponse(
            { message: "Message sent successfully", messageId },
            201
        );
    } catch (error) {
        return errorResponse("Error sending message: " + error.message, 500);
    }
};
