/*****************************************************
 * dynamodb/userTable.js - Using AWS SDK v3
 *****************************************************/
const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });

const createUserTable = async () => {
    const params = {
        TableName: "Users",
        KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
        AttributeDefinitions: [{ AttributeName: "userId", AttributeType: "S" }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
    };

    try {
        const command = new CreateTableCommand(params);
        const response = await client.send(command);
        console.log("User table created successfully:", response);
    } catch (error) {
        console.error("Error creating user table:", error.message);
    }
};

createUserTable();
