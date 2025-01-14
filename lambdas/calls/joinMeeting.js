// lambdas/calls/joinMeeting.js
const { chime } = require("../../config/aws");
const { successResponse, errorResponse } = require("../../utils/responseUtils");

module.exports.joinMeeting = async (event) => {
    try {
        // protectRoute(event.headers);
        const { meetingId, attendeeName } = JSON.parse(event.body);

        const params = {
            MeetingId: meetingId,
            ExternalUserId: attendeeName,
        };

        const response = await chime.createAttendee(params).promise();

        return successResponse({
            attendee: response.Attendee,
            message: "Attendee added successfully",
        });
    } catch (error) {
        return errorResponse("Error adding attendee: " + error.message, 500);
    }
};
