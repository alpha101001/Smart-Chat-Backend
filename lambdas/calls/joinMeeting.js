/*****************************************************
 * lambdas/calls/joinMeeting.js
 *****************************************************/
const { chimeSDKMeetingsClient } = require("../../config/aws");
const { CreateAttendeeCommand } = require("@aws-sdk/client-chime-sdk-meetings");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
const { protectRoute } = require("../../utils/authUtils");

module.exports.joinMeeting = async (event) => {
    try {
        // Protect the route with authentication
        protectRoute(event.headers);

        // Parse the request body
        const { meetingId, attendeeName } = JSON.parse(event.body);

        // Validate meetingId and attendeeName
        if (!meetingId || !attendeeName) {
            return errorResponse("Both meetingId and attendeeName are required", 400);
        }

        // Create the attendee in the meeting
        const params = {
            MeetingId: meetingId,
            ExternalUserId: attendeeName, // Attendee name as the external user ID
        };

        const response = await chimeSDKMeetingsClient.send(new CreateAttendeeCommand(params));

        // Return success response with attendee info
        return successResponse({
            attendee: response.Attendee,
            message: `Attendee ${attendeeName} added successfully to meeting ${meetingId}`,
        }, 201);

    } catch (error) {
        return errorResponse("Error adding attendee: " + error.message, 500);
    }
};


/** response sample:
 * {
 *   "statusCode": 201,
 *   "headers": {
 *     "Content-Type": "application/json",
 *     "Access-Control-Allow-Origin": "*"
 *   },
 *   "body": {
 *     "attendee": {
 *       "AttendeeId": "2d082c83-8913-023f-8699-55a1b0ddfa75",
 *       "Capabilities": {
 *         "Audio": "SendReceive",
 *         "Content": "SendReceive",
 *         "Video": "SendReceive"
 *       },
 *       "ExternalUserId": "John Doe",
 *       "JoinToken": "MmQwODJjODMtODkxMy0wMjNmLTg2OTktNTVhMWIwZGRmYTc1OmVjYWEyNjFlLTM3YWEtNDJiMC1hMWQ3LTY0ZGU1NGNhOGZkYg"
 *     },
 *     "message": "Attendee John Doe added successfully to meeting a375cbc8-53ce-4ac0-88dc-b94f0b192713"
 *   }
 * }
 */