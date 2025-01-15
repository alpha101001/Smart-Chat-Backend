/*****************************************************
 * lambdas/messaging/createChat.js - DynamoDBDocumentClient
 *****************************************************/
const { dynamoDBClient } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
// Optionally: const { protectRoute } = require("../../utils/authUtils");

module.exports.createChat = async (event) => {
    try {
        // protectRoute(event.headers);
        const { chatName, participants } = JSON.parse(event.body);
        const chatId = `chat-${Date.now()}`;

        const params = {
            TableName: "Chats",
            Item: {
                chatId,
                chatName,
                // If you need a StringSet, you'd do something else with marshalling
                participants,
            },
        };

        await dynamoDBClient.put(params);

        return successResponse(
            { message: "Chat created successfully", chatId },
            201
        );
    } catch (error) {
        return errorResponse("Error creating chat: " + error.message, 500);
    }
};
