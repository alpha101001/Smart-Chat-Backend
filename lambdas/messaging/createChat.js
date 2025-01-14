const { docClient } = require("../../config/aws");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
const { protectRoute } = require("../../utils/authUtils");

exports.createChat = async (event) => {
    try {
        // optional: protectRoute(event.headers);
        const { chatName, participants } = JSON.parse(event.body);
        const chatId = `chat-${Date.now()}`;

        const params = {
            TableName: "Chats",
            Item: {
                chatId: chatId,
                chatName: chatName,
                participants: participants, // if you need a Set, be mindful with docClient
            },
        };

        await docClient.send(new PutCommand(params));

        return successResponse(
            { message: "Chat created successfully", chatId },
            201
        );
    } catch (error) {
        return errorResponse("Error creating chat: " + error.message, 500);
    }
};
