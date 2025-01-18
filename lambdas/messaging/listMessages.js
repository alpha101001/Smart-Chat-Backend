/*****************************************************
 * lambdas/messaging/listMessages.js
 *****************************************************/
const { dynamoDBClient } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
const { protectRoute } = require("../../utils/authUtils");
const { QueryCommand } = require("@aws-sdk/lib-dynamodb");

module.exports.listMessages = async (event) => {
    try {
        const user = protectRoute(event.headers);
        const userEmail = user.userId;

        if (!userEmail) {
            return errorResponse("Invalid token; userId missing in token payload.", 401);
        }

        // Parse request
        const { chatId, limit = 10, lastEvaluatedKey, startMessageId } = JSON.parse(event.body);

        // Validate
        if (!chatId) {
            return errorResponse("chatId is required", 400);
        }

        // Build query
        const params = {
            TableName: "Messages",
            KeyConditionExpression: "chatId = :chatId",
            ExpressionAttributeValues: {
                ":chatId": chatId,
            },
            Limit: limit,
            ExclusiveStartKey: lastEvaluatedKey || undefined,
        };

        // If we have a startMessageId, begin from there
        if (startMessageId) {
            params.KeyConditionExpression += " AND messageId >= :startMessageId";
            params.ExpressionAttributeValues[":startMessageId"] = startMessageId;
        }

        // Query
        const response = await dynamoDBClient.send(new QueryCommand(params));

        return successResponse({
            messages: response.Items || [],
            lastEvaluatedKey: response.LastEvaluatedKey || null,
        });
    } catch (error) {
        return errorResponse(`Error fetching messages: ${error.message}`, 500);
    }
};

/** response sample:
 * {
 *   "statusCode": 200,
 *   "headers": {
 *     "Content-Type": "application/json",
 *     "Access-Control-Allow-Origin": "*"
 *   },
 *   "body": {
 *     "messages": [
 *       {
 *         "content": "Hello, this is a test message!",
 *         "chatId": "chat-dce78bda-fa3d-4c36-bbc7-29b6a4df222c",
 *         "messageId": "msg-48f61d44-425d-472e-9c5b-ece36fd50272",
 *         "senderId": "test12@example.com",
 *         "timestamp": 1737205305080
 *       }
 *     ],
 *     "lastEvaluatedKey": null
 *   }
 * }
 */