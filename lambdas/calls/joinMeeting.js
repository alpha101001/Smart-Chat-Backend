const { chimeClient } = require("../../config/aws");
const { CreateAttendeeCommand } = require("@aws-sdk/client-chime-sdk-meetings");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
// Optionally use protectRoute if you want to require auth
// const { protectRoute } = require("../../utils/authUtils");

exports.joinMeeting = async (event) => {
    try {
        // protectRoute(event.headers);
        const { meetingId, attendeeName } = JSON.parse(event.body);

        const params = {
            MeetingId: meetingId,
            ExternalUserId: attendeeName, // A unique identifier for the attendee
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
