/*****************************************************
 * dynamodb/messageTable.js - Using AWS SDK v3
 *****************************************************/
const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });

const createMessageTable = async () => {
    const params = {
        TableName: "Messages",
        KeySchema: [{ AttributeName: "messageId", KeyType: "HASH" }],
        AttributeDefinitions: [{ AttributeName: "messageId", AttributeType: "S" }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
    };

    try {
        const command = new CreateTableCommand(params);
        const response = await client.send(command);
        console.log("Message table created successfully:", response);
    } catch (error) {
        console.error("Error creating message table:", error.message);
    }
};

createMessageTable();
