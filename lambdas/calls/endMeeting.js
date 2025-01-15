/*****************************************************
 * lambdas/calls/endMeeting.js
 *****************************************************/
const { chimeSDKMeetingsClient } = require("../../config/aws");
const { DeleteMeetingCommand } = require("@aws-sdk/client-chime-sdk-meetings");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
const { protectRoute } = require("../../utils/authUtils");

module.exports.endMeeting = async (event) => {
    try {
        // Protect the route with authentication
        protectRoute(event.headers);

        // Parse the request body
        const { meetingId } = JSON.parse(event.body);

        // Validate meetingId
        if (!meetingId) {
            return errorResponse("meetingId is required", 400);
        }

        // Define the command parameters
        const params = {
            MeetingId: meetingId,
        };

        // Use the Chime SDK Meetings client to delete the meeting
        await chimeSDKMeetingsClient.send(new DeleteMeetingCommand(params));

        // Return success response
        return successResponse({
            message: `Meeting with ID ${meetingId} ended successfully.`,
        });

    } catch (error) {
        return errorResponse("Error ending meeting: " + error.message, 500);
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
 *     "message": "Meeting with ID af38f5f7-9393-4588-ab95-d50b37e02713 ended successfully."
 *   }
 * }
 */