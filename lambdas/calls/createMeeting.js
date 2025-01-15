/*****************************************************
 * lambdas/calls/createMeeting.js - Using ChimeClient v3
 *****************************************************/
const { chimeSDKMeetingsClient } = require("../../config/aws");
const { CreateMeetingCommand } = require("@aws-sdk/client-chime-sdk-meetings");
const { protectRoute } = require("../../utils/authUtils");
const { successResponse, errorResponse } = require("../../utils/responseUtils");
require("dotenv").config();
module.exports.createMeeting = async (event) => {
    try {
        // Check JWT if you want the route to be protected
        protectRoute(event.headers);

        const { clientRequestToken, meetingTitle } = JSON.parse(event.body);

        const params = {
            ClientRequestToken: clientRequestToken,
            MediaRegion: process.env.REGION,
            ExternalMeetingId: meetingTitle,
        };

        // v3 call
        const response = await chimeSDKMeetingsClient.send(new CreateMeetingCommand(params));

        return successResponse(
            {
                meeting: response.Meeting,
                message: "Meeting created successfully",
            },
            201
        );
    } catch (error) {
        return errorResponse("Error creating meeting: " + error.message, 500);
    }
};


/** response sample:
 * {
 *   "meeting": {
 *     "ExternalMeetingId": "Test Meeting",
 *     "MediaPlacement": {
 *       "AudioFallbackUrl": "wss://wss.k.m2.ue1.app.chime.aws:443/calls/7ed6f91e-b792-475d-8864-7bd384c42713",
 *       "AudioHostUrl": "f4d6133321282c177e151643f0f8c44f.k.m2.ue1.app.chime.aws:3478",
 *       "EventIngestionUrl": "https://data.svc.ue1.ingest.chime.aws/v1/client-events",
 *       "ScreenDataUrl": "wss://bitpw.m2.ue1.app.chime.aws:443/v2/screen/7ed6f91e-b792-475d-8864-7bd384c42713",
 *       "ScreenSharingUrl": "wss://bitpw.m2.ue1.app.chime.aws:443/v2/screen/7ed6f91e-b792-475d-8864-7bd384c42713",
 *       "ScreenViewingUrl": "wss://bitpw.m2.ue1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=7ed6f91e-b792-475d-8864-7bd384c42713",
 *       "SignalingUrl": "wss://signal.m2.ue1.app.chime.aws/control/7ed6f91e-b792-475d-8864-7bd384c42713",
 *       "TurnControlUrl": "https://2713.cell.us-east-1.meetings.chime.aws/v2/turn_sessions"
 *     },
 *     "MediaRegion": "us-east-1",
 *     "MeetingArn": "arn:aws:chime:us-east-1:539247462080:meeting/7ed6f91e-b792-475d-8864-7bd384c42713",
 *     "MeetingId": "7ed6f91e-b792-475d-8864-7bd384c42713",
 *     "TenantIds": []
 *   },
 *   "message": "Meeting created successfully"
 * }
 */

