/*****************************************************
 * lambdas/calls/endMeeting.js - Using ChimeClient v3
 *****************************************************/
const { chimeClient } = require("../../config/aws");
const {
    DeleteMeetingCommand
} = require("@aws-sdk/client-chime");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
// Optionally: const { protectRoute } = require("../../utils/authUtils");

module.exports.endMeeting = async (event) => {
    try {
        // protectRoute(event.headers); // if you want auth
        const { meetingId } = JSON.parse(event.body);

        const params = {
            MeetingId: meetingId,
        };

        await chimeClient.send(new DeleteMeetingCommand(params));

        return successResponse({ message: "Meeting ended successfully" });
    } catch (error) {
        return errorResponse("Error ending meeting: " + error.message, 500);
    }
};
