# Smart Chat Endpoints:

> **Tech Stack**  
> **JavaScript** | **Serverless** | **DynamoDB**

## Available Endpoints
### GET
- **Test SDK** ```https://xd830acofg.execute-api.us-east-1.amazonaws.com/dev/test-sdk``` \


### POST
- **Sign Up** ```https://xd830acofg.execute-api.us-east-1.amazonaws.com/dev/auth/signup``` \
- **Log In**  ```https://xd830acofg.execute-api.us-east-1.amazonaws.com/dev/auth/login``` \
- **Create Chat**   ```https://xd830acofg.execute-api.us-east-1.amazonaws.com/dev/messaging/createChat``` \
- **Send Message**   ```https://xd830acofg.execute-api.us-east-1.amazonaws.com/dev/messaging/sendMessage``` \
- **List Messages**   ```https://xd830acofg.execute-api.us-east-1.amazonaws.com/dev/messaging/listMessages``` \
- **Create Meeting**   ```https://xd830acofg.execute-api.us-east-1.amazonaws.com/dev/calls/createMeeting``` \
- **Join Meeting**   ```https://xd830acofg.execute-api.us-east-1.amazonaws.com/dev/calls/joinMeeting``` \
- **End Meeting**   ```https://xd830acofg.execute-api.us-east-1.amazonaws.com/dev/calls/endMeeting``` \

## Sample API Responses

Below are example responses returned by each endpoint in JSON format.

---

### Login

```json
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  "body": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "name": "Test User",
    "userName": "tester123",
    "userEmail": "test@example.com",
    "dateOfBirth": "1990-01-01"
  }
}
```
### SignUp
```json

{
  "statusCode": 201,
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  "body": {
    "message": "User registered successfully",
    "verificationCode": "ABCD12"
  }
}
```


### Create Meeting

```json
{
  "meeting": {
    "ExternalMeetingId": "Test Meeting",
    "MediaPlacement": {
      "AudioFallbackUrl": "wss://wss.k.m2.ue1.app.chime.aws:443/calls/7ed6f91e...",
      "AudioHostUrl": "f4d6133321282c177e151643f0f8c44f.k.m2.ue1.app.chime.aws:3478",
      "EventIngestionUrl": "https://data.svc.ue1.ingest.chime.aws/v1/client-events",
      "ScreenDataUrl": "wss://bitpw.m2.ue1.app.chime.aws:443/v2/screen/7ed6f91e...",
      "ScreenSharingUrl": "wss://bitpw.m2.ue1.app.chime.aws:443/v2/screen/7ed6f91e...",
      "ScreenViewingUrl": "wss://bitpw.m2.ue1.app.chime.aws:443/ws/connect?passcode=null...",
      "SignalingUrl": "wss://signal.m2.ue1.app.chime.aws/control/7ed6f91e...",
      "TurnControlUrl": "https://2713.cell.us-east-1.meetings.chime.aws/v2/turn_sessions"
    },
    "MediaRegion": "us-east-1",
    "MeetingArn": "arn:aws:chime:us-east-1:539247462080:meeting/7ed6f91e-b792...",
    "MeetingId": "7ed6f91e-b792-475d-8864-7bd384c42713",
    "TenantIds": []
  },
  "message": "Meeting created successfully"
}

```

### End Meeting

```json

{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  "body": {
    "message": "Meeting with ID af38f5f7-9393-4588-ab95-d50b37e02713 ended successfully."
  }
}

```

### Join Meeting
```json
{
  "statusCode": 201,
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  "body": {
    "attendee": {
      "AttendeeId": "2d082c83-8913-023f-8699-55a1b0ddfa75",
      "Capabilities": {
        "Audio": "SendReceive",
        "Content": "SendReceive",
        "Video": "SendReceive"
      },
      "ExternalUserId": "John Doe",
      "JoinToken": "MmQwODJjODMtODkxMy0wMjNmLTg2OTktNTVhMWIwZGRmYTc1OmVjYWEyNjFlLTM3YWEtNDJiMC..."
    },
    "message": "Attendee John Doe added successfully to meeting a375cbc8-53ce-4ac0-88dc-b94f0b192713"
  }
}

```

### Create Chat
```json
{
  "statusCode": 201,
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  "body": {
    "message": "Chat created successfully",
    "chatId": "chat-dce78bda-fa3d-4c36-bbc7-29b6a4df222c",
    "chatName": "Project Discussion",
    "participants": [
      "user1@example.com",
      "user2@example.com",
      "test12@example.com"
    ]
  }
}

```

### List Messages
```json
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  "body": {
    "messages": [
      {
        "content": "Hello, this is a test message!",
        "chatId": "chat-dce78bda-fa3d-4c36-bbc7-29b6a4df222c",
        "messageId": "msg-48f61d44-425d-472e-9c5b-ece36fd50272",
        "senderId": "test12@example.com",
        "timestamp": 1737205305080
      }
    ],
    "lastEvaluatedKey": null
  }
}

```

### Send Message
```json
{
  "statusCode": 201,
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  "body": {
    "message": "Message sent successfully",
    "messageId": "msg-48f61d44-425d-472e-9c5b-ece36fd50272",
    "chatId": "chat-dce78bda-fa3d-4c36-bbc7-29b6a4df222c",
    "senderId": "test12@example.com",
    "content": "Hello, this is a test message!",
    "timestamp": 1737205305080
  }
}

```

