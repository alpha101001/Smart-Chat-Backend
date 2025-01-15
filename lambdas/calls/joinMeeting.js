/*****************************************************
 * lambdas/calls/joinMeeting.js - Using ChimeClient v3
 *****************************************************/
const { chimeClient } = require("../../config/aws");
const {
    CreateAttendeeCommand
} = require("@aws-sdk/client-chime");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
// const { protectRoute } = require("../../utils/authUtils");

module.exports.joinMeeting = async (event) => {
    try {
        // protectRoute(event.headers);
        const { meetingId, attendeeName } = JSON.parse(event.body);

        const params = {
            MeetingId: meetingId,
            ExternalUserId: attendeeName,
        };

        const response = await chimeClient.send(new CreateAttendeeCommand(params));

        return successResponse({
            attendee: response.Attendee,
            message: "Attendee added successfully",
        });
    } catch (error) {
        return errorResponse("Error adding attendee: " + error.message, 500);
    }
};


